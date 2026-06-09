"use server";

import { SessionData, sessionsOptions } from "@/lib/session";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

type FormUser = {
    username: string,
    password: string,
}

export async function login(formData: FormData) {
    const userData: FormUser = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim()
            ?? headersList.get('x-real-ip')
            ?? 'unknown';
        
    await prisma.loginAttempt.deleteMany({
        where: {
            ip,
            createdAt: { lt: new Date(Date.now() - 5 * 60 * 1000) }
        }
    })

    const recentAttempts = await prisma.loginAttempt.count({
        where: {
            ip,
            createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000)}
        }
    })

    if (recentAttempts >= 5) {
        return { error: "Identifiants incorrects. L'administrateur a été prévenu." };
    }

    const validUsername = userData.username === process.env.ADMIN_USERNAME;
    const validPassword = await bcrypt.compare(userData.password, process.env.ADMIN_PASSWORD_HASH!);

    if (!validUsername || !validPassword) {
        await prisma.loginAttempt.create({ data: { ip }});
        return { error: "Identifiants incorrects. L'administrateur a été prévenu." };
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionsOptions);
    session.isLoggedIn = true;
    await session.save();

    redirect('/admin');
}