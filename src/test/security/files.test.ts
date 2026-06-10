import { saveImage, saveSvg } from '@/lib/image';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import sharp from 'sharp';

vi.mock('fs/promises', () => ({
    default: {
        writeFile: vi.fn().mockResolvedValue(undefined),
        mkdir: vi.fn().mockResolvedValue(undefined),
        unlink: vi.fn().mockResolvedValue(undefined),
    }
}));

vi.mock('sharp', () => ({
    default: vi.fn().mockReturnValue({
        resize: vi.fn().mockReturnThis(),
        webp: vi.fn().mockReturnThis(),
        toFile: vi.fn().mockResolvedValue(undefined),
    })
}));

describe('Sanitisation des noms de fichiers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('slugifie un nom avec des espaces', async () => {
        const file = new File([''], 'test.svg', { type: 'image/svg+xml' });
        const result = await saveSvg(file, 'technologies', 'Mon Logo');
        expect(result).toBe('/uploads/technologies/mon-logo.svg');
    });

    it('slugifie un nom avec des caractères spéciaux', async () => {
        const file = new File([''], 'test.svg', { type: 'image/svg+xml' });
        const result = await saveSvg(file, 'technologies', '../malicious');
        expect(result).not.toContain('..');
    });

    it('slugifie un nom avec des accents', async () => {
        const file = new File([''], 'test.svg', { type: 'image/svg+xml' });
        const result = await saveSvg(file, 'technologies', 'editeur');
        expect(result).toBe('/uploads/technologies/editeur.svg');
    });

    it('slugifie un nom pour saveImage', async () => {
        const file = new File([''], 'test.png', { type: 'image/png' });
        const result = await saveImage(file, 'projects', 'Mon Projet', 1280, 720);
        expect(result).toBe('/uploads/projects/mon-projet.webp');
    });
});