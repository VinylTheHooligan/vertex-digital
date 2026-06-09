import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { SessionData, sessionsOptions } from "@/lib/session";

export async function proxy(request: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getIronSession<SessionData>(request.cookies as any, sessionsOptions);

    if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/((?!login).)*'
};