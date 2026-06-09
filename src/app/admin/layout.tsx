import { SessionData, sessionsOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const session = await getIronSession<SessionData>(await cookies(), sessionsOptions);

    if (!session.isLoggedIn) {
        redirect('/admin/login');
    }

    return (
        <>
            {children}
        </>
    );
}