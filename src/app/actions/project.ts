"use server";

import { saveImage } from "@/lib/image";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "node:path";
import { z } from "zod";
import fs from 'fs/promises';

const projectSchema = z.object({
    name: z.string()
        .min(1, {
            message: "Nom de projet requis.",
        }).max(200, {
            message: "Nom de projet trop long."
        }),
    description: z.string()
        .min(1, {
          message: "Description requise"
        })
        .max(200, {
            message: "Description trop longue."
        }),
    startedAt: z.string()
        .min(1, {
            message: "Date de début requise.",
        }),
    endedAt: z.string().optional(),
    technologies: z.array(z.number()).optional(),
    github: z.string()
        .url({
            message: "URL invalide"
        })
        .optional()
        .or(z.literal('')),
    web: z.string()
        .url({
            message: "URL invalide"
        })
        .optional()
        .or(z.literal('')),
});

export async function createProject(formData: FormData) {
    const parsed = projectSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        startedAt: formData.get('startedAt'),
        endedAt: formData.get('endedAt') || undefined,
        technologies: formData.getAll('technologies').map(Number),
        github: formData.get('github') || undefined,
        web: formData.get('web') || undefined,
    });

    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors };
    }

    const file = formData.get('image') as File;
    if (!file || file.size === 0) {
        return { serverError: "Image requise." };
    }

    try {
        const imagePath = await saveImage(
            file,
            'projects',
            parsed.data.name.toLowerCase().replace(/\s+/g, '-'),
            1280,
            720
        );

        await prisma.project.create({
            data: {
                name: parsed.data.name,
                description: parsed.data.description,
                image: imagePath,
                startedAt: new Date(parsed.data.startedAt),
                endedAt: parsed.data.endedAt ? new Date(parsed.data.endedAt) : null,
                technologies: {
                    connect: parsed.data.technologies?.map(id => ({ id })) ?? [],
                },
                github: parsed.data.github || null,
                web: parsed.data.web || null,
            }
        });

        revalidatePath('/admin/projects');
    } catch (error) {
        console.error(error);
        return { serverError: "Une erreur est survenue." };
    }

    return { success: true };
}

export async function updateProject(id: number, formData: FormData) {
    const parsed = projectSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        startedAt: formData.get('startedAt'),
        endedAt: formData.get('endedAt') || undefined,
        technologies: formData.getAll('technologies').map(Number),
        github: formData.get('github') || undefined,
        web: formData.get('web') || undefined,
    });

    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors };
    }

    const file = formData.get('image') as File;

    try {
        const project = await prisma.project.findUnique({ where: { id }});
        if (!project) return { serverError: "Projet introuvable." };

        let imagePath = project.image;

        if (file && file.size > 0) {
            const oldFilePath = path.join(process.cwd(), 'public', project.image);
            await fs.unlink(oldFilePath).catch(() => {});
            imagePath = await saveImage(file, 'projects', parsed.data.name.toLowerCase().replace(/\s+/g, '-'), 1280, 720);
        }

        await prisma.project.update({
            where: { id },
            data: {
                name: parsed.data.name,
                description: parsed.data.description,
                image: imagePath,
                startedAt: new Date(parsed.data.startedAt),
                endedAt: parsed.data.endedAt ? new Date(parsed.data.endedAt) : null,    
                github: parsed.data.github || null,
                web: parsed.data.web || null,
                technologies: {
                    set: parsed.data.technologies?.map(id => ({ id })) ?? [],
                }
            }
        });

        revalidatePath('/admin/projects');
    } catch (error) {
        console.error(error);
        return { serverError: "Une erreur est survenue." }; 
    }

    return { success: true };
}

export async function deleteProject(id: number) {
    try {
        const project = await prisma.project.findUnique({ where: { id }});
        if (!project) return { serverError: "Projet introuvable." };

        const filePath = path.join(process.cwd(), 'public', project.image);
        await fs.unlink(filePath).catch(() => {});

        await prisma.project.delete({ where: { id }});
        revalidatePath('/admin/projects');
    } catch (error) {
        console.error(error);
        return { serverError: "Une erreur est survenue." };
    }

    return { success: true };
}