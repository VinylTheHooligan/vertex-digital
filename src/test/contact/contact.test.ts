import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleSubmit } from '@/src/app/actions/contact';
import { prisma } from '@/src/lib/prisma';

describe('Server Action handleSubmit contact', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('retourne une erreur si le token Turnstile est invalide', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: false })
        });

        const formData = new FormData();
        formData.append('token', 'invalid-token');
        formData.append('email', 'test@test.com');
        formData.append('subject', 'Sujet test');
        formData.append('message', 'Message test valide');

        const res = await handleSubmit(formData);
        expect(res?.serverError).toBe("Vérification échouée, réessayez.");
    });

    it('retourne des erreurs de validation si les champs sont invalides', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });

        const formData = new FormData();
        formData.append('token', 'valid-token');
        formData.append('email', 'pasunemail');
        formData.append('subject', 'ab');
        formData.append('message', 'ok');

        const res = await handleSubmit(formData);
        expect(res?.fieldErrors?.email).toBeDefined();
    });

    it('détecte le honeypot et retourne un succès silencieux', async () => {
        const formData = new FormData();
        formData.append('website', 'spam');

        const res = await handleSubmit(formData);
        expect(res?.success).toBe(true);
    });

    it('retourne une erreur si rate limiting déclenché', async () => {
        vi.mocked(prisma.contact.findFirst).mockResolvedValue({ id: 1 } as never);
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });

        const formData = new FormData();
        formData.append('token', 'valid-token');
        formData.append('email', 'test@test.com');
        formData.append('subject', 'Sujet test valide');
        formData.append('message', 'Message test valide');

        const res = await handleSubmit(formData);
        expect(res?.serverError).toBe("Une erreur est survenue.");
    });
});

describe('Validation des champs contact', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });
        vi.mocked(prisma.contact.findFirst).mockResolvedValue(null);
    });

    const validBase = {
        token: 'valid-token',
        email: 'test@test.com',
        subject: 'Sujet valide',
        message: 'Message valide et suffisant',
    };

    it('retourne une erreur pour un email invalide', async () => {
        const formData = new FormData();
        Object.entries({ ...validBase, email: 'pasunemail' }).forEach(([k, v]) => formData.append(k, v));

        const res = await handleSubmit(formData);
        expect(res?.fieldErrors?.email?.[0]).toBe('Email invalide');
    });

    it('retourne une erreur si le sujet est trop court', async () => {
        const formData = new FormData();
        Object.entries({ ...validBase, subject: 'ab' }).forEach(([k, v]) => formData.append(k, v));

        const res = await handleSubmit(formData);
        expect(res?.fieldErrors?.subject?.[0]).toBe('Sujet trop court');
    });

    it('retourne une erreur si le sujet est trop long', async () => {
        const formData = new FormData();
        Object.entries({ ...validBase, subject: 'a'.repeat(101) }).forEach(([k, v]) => formData.append(k, v));

        const res = await handleSubmit(formData);
        expect(res?.fieldErrors?.subject?.[0]).toBe('Sujet trop long');
    });

    it('retourne une erreur si le message est trop court', async () => {
        const formData = new FormData();
        Object.entries({ ...validBase, message: 'ok' }).forEach(([k, v]) => formData.append(k, v));

        const res = await handleSubmit(formData);
        expect(res?.fieldErrors?.message?.[0]).toBe('Message trop court');
    });

    it('retourne une erreur si le message est trop long', async () => {
        const formData = new FormData();
        Object.entries({ ...validBase, message: 'a'.repeat(501) }).forEach(([k, v]) => formData.append(k, v));

        const res = await handleSubmit(formData);
        expect(res?.fieldErrors?.message?.[0]).toBe('Message trop long');
    });
});

describe('Turnstile et honeypot', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('retourne une erreur si le token Turnstile est invalide', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: false })
        });

        const formData = new FormData();
        formData.append('token', 'invalid-token');
        formData.append('email', 'test@test.com');
        formData.append('subject', 'Sujet valide');
        formData.append('message', 'Message valide et suffisant');

        const res = await handleSubmit(formData);
        expect(res?.serverError).toBe('Vérification échouée, réessayez.');
    });

    it('honeypot rempli retourne un succès silencieux sans créer en base', async () => {
        const formData = new FormData();
        formData.append('website', 'spam');
        formData.append('email', 'test@test.com');
        formData.append('subject', 'Sujet valide');
        formData.append('message', 'Message valide et suffisant');

        const res = await handleSubmit(formData);

        expect(res?.success).toBe(true);
        expect(vi.mocked(prisma.contact.create)).not.toHaveBeenCalled();
    });
});

describe('Anti-flood IP contact', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });
    });

    const validFormData = () => {
        const formData = new FormData();
        formData.append('token', 'valid-token');
        formData.append('email', 'test@test.com');
        formData.append('subject', 'Sujet valide');
        formData.append('message', 'Message valide et suffisant');
        return formData;
    };

    it('accepte un premier message valide', async () => {
        vi.mocked(prisma.contact.findFirst).mockResolvedValue(null);
        vi.mocked(prisma.contact.create).mockResolvedValue({} as never);

        const res = await handleSubmit(validFormData());
        expect(res?.success).toBe(true);
    });

    it('bloque un second message depuis la même IP dans la minute', async () => {
        vi.mocked(prisma.contact.findFirst).mockResolvedValue({ id: 1 } as never);

        const res = await handleSubmit(validFormData());
        expect(res?.serverError).toBe('Une erreur est survenue.');
    });

    it('accepte un nouveau message après expiration du délai', async () => {
        vi.mocked(prisma.contact.findFirst).mockResolvedValue(null);
        vi.mocked(prisma.contact.create).mockResolvedValue({} as never);

        const res = await handleSubmit(validFormData());
        expect(res?.success).toBe(true);
        expect(vi.mocked(prisma.contact.deleteMany)).toHaveBeenCalled();
    });
});

describe('Stockage contact', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true })
        });
        vi.mocked(prisma.contact.findFirst).mockResolvedValue(null);
        vi.mocked(prisma.contact.create).mockResolvedValue({} as never);
    });

    it('crée une entrée avec les bons champs', async () => {
        const formData = new FormData();
        formData.append('token', 'valid-token');
        formData.append('email', 'william@test.com');
        formData.append('subject', 'Sujet de test');
        formData.append('message', 'Message de test valide');

        await handleSubmit(formData);

        expect(vi.mocked(prisma.contact.create)).toHaveBeenCalledWith({
            data: expect.objectContaining({
                from: 'william@test.com',
                subject: 'Sujet de test',
                content: 'Message de test valide',
                ip: expect.any(String),
            })
        });
    });
});