"use server";

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function uploadCv(formData: FormData) {
    const file = formData.get('cv') as File;

    if (!file || file.size === 0) {
        return { serverError: "Fichier requis." };
    }

    if (file.type !== 'application/pdf') {
        return { serverError: "Seuls les fichiers PDF sont acceptés." };
    }

    try {
        const outputPath = path.join(process.cwd(), 'public', 'documents', 'cv.pdf');
        await fs.mkdir(path.join(process.cwd(), 'public', 'documents'), { recursive: true });
        await fs.writeFile(outputPath, Buffer.from(await file.arrayBuffer()));
        revalidatePath('/');
    } catch (error) {
        console.error(error);
        return { serverError: "Une erreur est survenue." };
    }

    return { success: true };
}