import { describe, it, expect, vi, beforeEach } from 'vitest';
import { uploadCv } from '@/actions/cv';

vi.mock('fs/promises', () => ({
    default: {
        writeFile: vi.fn().mockResolvedValue(undefined),
        mkdir: vi.fn().mockResolvedValue(undefined),
    }
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

describe('Upload CV', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('retourne une erreur si aucun fichier', async () => {
        const formData = new FormData();
        const res = await uploadCv(formData);
        expect(res?.serverError).toBe('Fichier requis.');
    });

    it('retourne une erreur si le fichier n\'est pas un PDF', async () => {
        const file = new File(['content'], 'cv.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('cv', file);

        const res = await uploadCv(formData);
        expect(res?.serverError).toBe('Seuls les fichiers PDF sont acceptés.');
    });

    it('upload un PDF valide avec succès', async () => {
        const file = new File(['content'], 'cv.pdf', { type: 'application/pdf' });
        const formData = new FormData();
        formData.append('cv', file);

        const res = await uploadCv(formData);
        expect(res?.success).toBe(true);
    });
});