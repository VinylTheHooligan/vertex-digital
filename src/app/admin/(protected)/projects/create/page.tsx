import CreateProjectForm from "@/components/form/CreateProjectForm";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProjectCreate() {

    const technologies = await prisma.technology.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <>
            <Header />
            <main className="flex flex-col items-center mx-3">
                <div className="grid grid-cols-1 gap-2 pt-10 sm:w-150">
                    <h2>Créer un projet</h2>
                    <CreateProjectForm technologies={technologies} />
                    <Link href="/admin/projects" className="form-button mt-5 px-5">Retourner à la liste</Link>
                </div>
            </main>
        </>
    );
}