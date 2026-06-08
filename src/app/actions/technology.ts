"use server";

import { saveSvg } from "@/lib/image";
import { prisma } from "@/lib/prisma";
import path from "node:path";
import { z } from "zod";
import fs from 'fs/promises';
import { revalidatePath } from "next/cache";

const technologySchema = z.object({
    name: z.string().min(1, { message: "Nom requis" }).max(50, { message: "Nom trop long" }),
});

export async function createTechnology(formData: FormData) {
    const parsed = technologySchema.safeParse({
        name: formData.get('name'),
    });

    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors };
    }

    const file = formData.get('logo') as File;
    if (!file || file.size === 0) {
        return { serverError: "Logo requis."}
    }

    try {
        const logoPath = await saveSvg(
            file, 
            'technologies', 
            parsed.data.name.toLowerCase().replace(/\s+/g, '-')
        );

        await prisma.technology.create({
            data: {
                name: parsed.data.name,
                logo: logoPath,
            }
        });
    } catch (error) {
        console.error(error);
        return { serverError: "Une erreur est survenue." };
    }

    return { success: true }
}

export async function deleteTechnology(id: number) {
    try {
        const tech = await prisma.technology.findUnique({ where: { id }});
        if (!tech) return { serverError: "Technologie introuvable." };

        //delete svg file
        const filePath = path.join(process.cwd(), 'public', tech.logo);
        await fs.unlink(filePath).catch(() => {});

        await prisma.technology.delete({ where: { id } });
        revalidatePath('/admin/tech');
    } catch (error) {
        console.error(error);
        return { serverError: "Une erreur est survenue." };
    }

    return { success: true };
}