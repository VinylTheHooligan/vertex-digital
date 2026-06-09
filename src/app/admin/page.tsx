import Header from "@/components/Header";
import Link from "next/link";

export default function Admin() {

    return (
        <>
            <Header />
            <main className="flex flex-col gap-4 mx-3 mt-8 items-center">
                <div className="sm:w-150">
                    <h2>Administration</h2>
                    <div className="grid grid-cols-1 gap-3 mt-4">
                        <Link href="/admin/contacts" className="form-button text-center">
                            Contacts
                        </Link>
                        <Link href="/admin/projects" className="form-button text-center">
                            Projets
                        </Link>
                        <Link href="/admin/tech" className="form-button text-center">
                            Technologies
                        </Link>
                        <Link href="/admin/bans" className="form-button text-center">
                            Bans
                        </Link>
                        <Link href="/admin/cv" className="form-button text-center">
                            CV
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}