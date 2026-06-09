import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login } from '@/app/actions/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';
import { prisma } from '@/lib/prisma';

describe('Server Action login', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        process.env.ADMIN_USERNAME = 'testuser';
        process.env.ADMIN_PASSWORD_HASH = '$2b$12$hashedpassword';
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });
    });

    it('retourne une erreur avec un username incorrect', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        const formData = new FormData();
        formData.append('username', 'pasbon');
        formData.append('password', 'correctpassword');
        formData.append('token', 'valid-token');

        const res = await login(formData);
        expect(res?.error).toBe("Identifiants incorrects. L'administrateur a été prévenu.");
    });

    it('retourne une erreur avec un mot de passe incorrect', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'correctpassword');
        formData.append('token', 'valid-token');

        const res = await login(formData);
        expect(res?.error).toBe("Identifiants incorrects. L'administrateur a été prévenu.");
    });

    it('redirige vers /admin avec les bons identifiants', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'correctpassword');
        formData.append('token', 'valid-token');

        await login(formData);

        expect(vi.mocked(redirect)).toHaveBeenCalledWith('/admin');
    });

    it('crée une session avec isLoggedIn à true', async () => {
        const mockSave = vi.fn();
        const mockSession = { isLoggedIn: false, save: mockSave };
        vi.mocked(getIronSession).mockResolvedValue(mockSession as never);
        vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'correctpassword');
        formData.append('token', 'valid-token');

        await login(formData);
        expect(mockSession.isLoggedIn).toBe(true);
        expect(mockSave).toHaveBeenCalled();
    });
});

describe('Rate limiting login', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        process.env.ADMIN_USERNAME = 'testuser';
        process.env.ADMIN_PASSWORD_HASH = '$2b$12$hashedpassword';
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });
    });

    it('bloque à la 6ème tentative', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        vi.mocked(prisma.loginAttempt.count).mockResolvedValue(5);

        const formData = new FormData();
        formData.append('username', 'wronguser');
        formData.append('password', 'wrongpassword');
        formData.append('token', 'valid-token');

        const res = await login(formData);
        expect(res?.error).toBe("Identifiants incorrects. L'administrateur a été prévenu.");
    });

    it('enregistre une tentative échouée dans prisma', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        vi.mocked(prisma.loginAttempt.count).mockResolvedValue(0);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'wrongpassword');
        formData.append('token', 'valid-token');

        await login(formData);
        expect(vi.mocked(prisma.loginAttempt.create)).toHaveBeenCalledWith({
            data: { ip: 'unknown' }
        });
    });

    it('supprime les tentatives anciennes à chaque appel', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        vi.mocked(prisma.loginAttempt.count).mockResolvedValue(0);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'wrongpassword');
        formData.append('token', 'valid-token');

        await login(formData);
        expect(vi.mocked(prisma.loginAttempt.deleteMany)).toHaveBeenCalledWith({
            where: {
                ip: 'unknown',
                createdAt: { lt: expect.any(Date) }
            }
        });
    });

    it('autorise la connexion sous le seuil de 5 tentatives', async () => {
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        vi.mocked(prisma.loginAttempt.count).mockResolvedValue(4);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'wrongpassword');
        formData.append('token', 'valid-token');

        const res = await login(formData);
        expect(res?.error).toBe("Identifiants incorrects. L'administrateur a été prévenu.");
    });
});