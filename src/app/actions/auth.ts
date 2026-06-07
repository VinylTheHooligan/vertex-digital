"use server";

import { SessionData, sessionsOptions } from "@/src/lib/session";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
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

    console.log("username saisi:", userData.username);
    console.log("username env:", process.env.ADMIN_USERNAME);
    console.log("hash env:", process.env.ADMIN_PASSWORD_HASH);

    const validUsername = userData.username === process.env.ADMIN_USERNAME;
    const validPassword = await bcrypt.compare(userData.password, process.env.ADMIN_PASSWORD_HASH!);

    console.log("validUsername:", validUsername);
    console.log("validPassword:", validPassword);

    if (!validUsername || !validPassword) {
        return { error: "Identifiants incorrects. L'administrateur a été prévenu." }
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionsOptions);
    session.isLoggedIn = true;
    await session.save();

    redirect('/admin');
}