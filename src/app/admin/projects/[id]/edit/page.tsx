import EditProjectForm from "@/src/components/form/EditProjectForm";
import Header from "@/src/components/Header";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }>}) {

    const { id } = await params;

    const [project, technologies] = await Promise.all([
        prisma.project.findUnique({
            where: { id: Number(id) },
            include: { technologies: true },
        }),
        prisma.technology.findMany({ orderBy: { name: 'asc' } }),
    ]);

    if (!project) notFound();

    return (
        <>
            <Header />
            <div className="mx-3">
                <h2>Modifier le projet</h2>
                <EditProjectForm project={project} technologies={technologies} />
            </div>
            <Link href='/admin/projects' className="form-button mx-5 my-10">Retourner à la liste</Link>
        </>
    );
}