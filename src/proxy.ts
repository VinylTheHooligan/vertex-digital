import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { SessionData, sessionsOptions } from "@/src/lib/session";

export async function proxy(request: NextRequest) {
    console.log("middleware called", request.nextUrl.pathname);
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request.cookies as any, sessionsOptions);
    console.log("isLoggedIn", session.isLoggedIn);

    if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/((?!login).)*'
};