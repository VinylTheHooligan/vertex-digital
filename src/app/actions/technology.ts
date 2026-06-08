"use server";

import { saveImage } from "@/src/lib/image";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

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
        const logoPath = await saveImage(file, 'technologies', parsed.data.name.toLowerCase().replace(/\s+/g, '-'));

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