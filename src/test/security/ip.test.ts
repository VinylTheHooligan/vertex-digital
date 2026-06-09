import { describe, it, expect, vi } from 'vitest';
import { headers } from 'next/headers';
import { getIp } from '@/lib/ip';

describe('getIp', () => {
    it('retourne l\'IP depuis x-forwarded-for', async () => {
        vi.mocked(headers).mockResolvedValue({
            get: (key: string) => key === 'x-forwarded-for' ? '192.168.1.1, 10.0.0.1' : null
        } as never);

        const ip = await getIp();
        expect(ip).toBe('192.168.1.1');
    });

    it('retourne l\'IP depuis x-real-ip si x-forwarded-for absent', async () => {
        vi.mocked(headers).mockResolvedValue({
            get: (key: string) => key === 'x-real-ip' ? '10.0.0.1' : null
        } as never);

        const ip = await getIp();
        expect(ip).toBe('10.0.0.1');
    });

    it('retourne unknown si aucun header IP', async () => {
        vi.mocked(headers).mockResolvedValue({
            get: () => null
        } as never);

        const ip = await getIp();
        expect(ip).toBe('unknown');
    });
});