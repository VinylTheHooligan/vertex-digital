import Header from "@/src/components/Header";
import Link from "next/link";

export default function Admin() {

    return (
        <>
            <Header />
            <div className="flex flex-col gap-4 mx-3 mt-8">
            <h1 className="text-3xl font-bold text-center">Administration</h1>
            <div className="grid grid-cols-1 gap-3 mt-4">
                <Link href="/admin/contacts" className="ring-2 ring-foreground rounded-sm py-3 px-4 text-center">
                    Contacts
                </Link>
                <Link href="/admin/projects" className="ring-2 ring-foreground rounded-sm py-3 px-4 text-center">
                    Projets
                </Link>
                <Link href="/admin/bans" className="ring-2 ring-foreground rounded-sm py-3 px-4 text-center">
                    Bans
                </Link>
            </div>
        </div>
        </>
    );
}