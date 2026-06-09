console.log('proxy test loaded');

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { proxy } from '@/proxy';
import { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';

describe('Protection des routes admin', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const protectedRoutes = ['/admin', '/admin/projects', '/admin/contacts', '/admin/tech'];

    protectedRoutes.forEach(route => {
        it(`redirige vers /admin/login sans session pour ${route}`, async () => {
            vi.mocked(getIronSession).mockResolvedValue({ isLoggedIn: false } as never);

            const req = new NextRequest(`http://localhost:3000${route}`);
            const res = await proxy(req);

            expect(res.status).toBe(307);
            expect(res.headers.get('location')).toContain('/admin/login');
        });
    });

    it('laisse passer avec une session active', async () => {
        vi.mocked(getIronSession).mockResolvedValue({ isLoggedIn: true } as never);

        const req = new NextRequest('http://localhost:3000/admin');
        const res = await proxy(req);

        expect(res.status).not.toBe(307);
        expect(res.headers.get('location')).toBeNull();
    });

    it('/admin/login est accessible sans session', async () => {
        vi.mocked(getIronSession).mockResolvedValue({ isLoggedIn: false } as never);

        const req = new NextRequest('http://localhost:3000/admin/login');
        const res = await proxy(req);

        expect(res.status).toBe(307);
        expect(res.headers.get('location')).toContain('/admin/login');
    });
});