import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteTechnology } from '@/src/app/actions/technology';
import { deleteProject } from '@/src/app/actions/project';
import { prisma } from '@/src/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

vi.mock('fs/promises', () => ({
    default: {
        unlink: vi.fn().mockResolvedValue(undefined),
    }
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

describe('Suppression des fichiers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('supprime le fichier SVG lors de la suppression d\'une technologie', async () => {
        vi.mocked(prisma.technology.findUnique).mockResolvedValue({
            id: 1,
            name: 'Next.js',
            logo: '/images/technologies/nextjs.svg',
        } as never);
        vi.mocked(prisma.technology.delete).mockResolvedValue({} as never);

        await deleteTechnology(1);

        expect(vi.mocked(fs.unlink)).toHaveBeenCalledWith(
            path.join(process.cwd(), 'public', '/images/technologies/nextjs.svg')
        );
    });

    it('supprime le fichier image lors de la suppression d\'un projet', async () => {
        vi.mocked(prisma.project.findUnique).mockResolvedValue({
            id: 1,
            name: 'Projet Test',
            image: '/images/projects/projet-test.webp',
        } as never);
        vi.mocked(prisma.project.delete).mockResolvedValue({} as never);

        await deleteProject(1);

        expect(vi.mocked(fs.unlink)).toHaveBeenCalledWith(
            path.join(process.cwd(), 'public', '/images/projects/projet-test.webp')
        );
    });
});