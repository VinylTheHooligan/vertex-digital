import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import slugify from 'slugify';

// for logos
export async function saveSvg(
    file: File, 
    folder: string, 
    filename: string
): Promise<string> {
    const safe = slugify(filename, { lower: true, strict: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const outputDir = path.join(process.cwd(), 'public', 'images', folder);

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, `${safe}.svg`), buffer);

    return `/images/${folder}/${filename}.svg`;
}

// for project images
export async function saveImage(
    file: File, 
    folder: string, 
    filename: string, 
    width?: number, 
    height?: number
): Promise<string> {
    const safe = slugify(filename, { lower: true, strict: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const outputDir = path.join(process.cwd(), 'public', 'images', folder);

    await fs.mkdir(outputDir, { recursive: true });

    await sharp(buffer)
        .resize(width, height, { fit: 'fill', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(path.join(outputDir, `${safe}.webp`));
    return `/images/${folder}/${safe}.webp`;
}