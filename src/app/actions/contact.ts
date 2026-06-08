"use server";

import { prisma } from "@/lib/prisma";
import { verifyTurnstile } from "@/lib/turnstile";
import { headers } from "next/headers";
import { z } from "zod";

const contactSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    subject: z.string().min(3, { message: "Sujet trop court" }).max(100, { message: "Sujet trop long" }),
    message: z.string().min(5, { message: "Message trop court" }).max(500, { message: "Message trop long" })
});


export async function handleSubmit(formData: FormData) {
    // honeypot
    if (formData.get("website")) {
        return { success: true }; // bot détecté
    }

    // cloudflare verif
    const token = formData.get('token') as string;
    if (!await verifyTurnstile(token)) {
        return { serverError: "Vérification échouée, réessayez." };
    }

    const data = {
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors };
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() 
                ?? headersList.get('x-real-ip') 
                ?? 'unknown';

    try {
        await prisma.contact.create({
            data: {
                from: parsed.data.email,
                subject: parsed.data.subject,
                content: parsed.data.message,
                ip: ip
            }
        });
    } catch (error) {
        console.error("Prisma error:", error);
        return { serverError: "Une erreur est survenue, réessayez plus tard." };
    }

    return { success: true };
}