import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function saveImage(file: File, folder: string, filename: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    const outputDir = path.join(process.cwd(), 'public', 'images', folder);
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${filename}.webp`);

    await sharp(buffer)
        .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

    return `/images/${folder}/${filename}.webp`;
}