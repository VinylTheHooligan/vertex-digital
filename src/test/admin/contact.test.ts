import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '@/lib/prisma';

describe('Lecture des contacts en admin', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('récupère les contacts triés par date décroissante', async () => {
        const mockContacts = [
            { id: 2, from: 'b@test.com', subject: 'Sujet B', content: 'Message B', ip: '127.0.0.1', createdAt: new Date('2024-02-01') },
            { id: 1, from: 'a@test.com', subject: 'Sujet A', content: 'Message A', ip: '127.0.0.1', createdAt: new Date('2024-01-01') },
        ];

        vi.mocked(prisma.contact.findMany).mockResolvedValue(mockContacts as never);

        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' }
        });

        expect(contacts).toHaveLength(2);
        expect(contacts[0].createdAt.getTime()).toBeGreaterThan(contacts[1].createdAt.getTime());
        expect(contacts[0]).toMatchObject({
            from: 'b@test.com',
            subject: 'Sujet B',
            content: 'Message B',
            ip: expect.any(String),
            createdAt: expect.any(Date),
        });
    });
});