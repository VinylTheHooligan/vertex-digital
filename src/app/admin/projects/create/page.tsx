import CreateProjectForm from "@/src/components/form/CreateProjectForm";
import Header from "@/src/components/Header";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function AdminProjectCreate() {

    const technologies = await prisma.technology.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <>
            <Header />
            <main className="flex flex-col justify-center mx-3">
                <h2>Créer un projet</h2>
                <CreateProjectForm technologies={technologies} />
                <Link href="/admin/projects" className="form-button mt-5 px-5">Retourner à la liste</Link>
            </main>
        </>
    );
}