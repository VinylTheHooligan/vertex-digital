import { describe, it, expect } from 'vitest';
import { sessionsOptions } from '@/src/lib/session';

describe('Variables d\'environnement', () => {
    it('ADMIN_USERNAME est défini', () => {
        process.env.ADMIN_USERNAME = 'testuser';
        expect(process.env.ADMIN_USERNAME).toBeDefined();
        expect(process.env.ADMIN_USERNAME.length).toBeGreaterThan(0);
    });

    it('ADMIN_PASSWORD_HASH est défini', () => {
        process.env.ADMIN_PASSWORD_HASH = '$2b$12$test';
        expect(process.env.ADMIN_PASSWORD_HASH).toBeDefined();
        expect(process.env.ADMIN_PASSWORD_HASH).toMatch(/^\$2b\$/);
    });

    it('SESSION_SECRET est défini et fait au moins 32 caractères', () => {
        process.env.SESSION_SECRET = 'a'.repeat(32);
        expect(process.env.SESSION_SECRET).toBeDefined();
        expect(process.env.SESSION_SECRET.length).toBeGreaterThanOrEqual(32);
    });
});

describe('Configuration du cookie de session', () => {
    it('le cookie est httpOnly', () => {
        expect(sessionsOptions.cookieOptions?.httpOnly).toBe(true);
    });

    it('le cookie est secure défini par NODE_ENV', () => {
        const isSecure = sessionsOptions.cookieOptions?.secure;
        const expectedSecure = process.env.NODE_ENV === 'production';
        expect(isSecure).toBe(expectedSecure);
    });
});