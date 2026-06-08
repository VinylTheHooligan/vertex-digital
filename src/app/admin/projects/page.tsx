import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject } from "@/actions/project";

export default async function AdminProject() {

    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        include: { technologies: true },
    });

    return (
        <>
            <Header />
            <main className="flex flex-col">
                <h2>Projets</h2>
                <div className="flex flex-col mt-5 gap-6">
                    <div className="flex justify-end">
                        <Link href='/admin/projects/create' className="form-button w-fit px-4">Créer</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {projects.map(project => (
                            <div key={project.id} className="flex flex-col ring-2 ring-foreground mx-3 rounded-xl w-fit">
                                <img src={project.image} className="rounded-xl w-full"/>
                                <div className="px-4 py-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-2xl">{project.name}</span>
                                        <form action={async () => {
                                            "use server";
                                            await deleteProject(project.id);
                                        }}>
                                            <button type="submit" className="form-button mt-0 w-12">X</button>
                                        </form>
                                        <Link href={`/admin/projects/${project.id}/edit`} className="form-button mt-0 px-3">
                                            Modifier
                                        </Link>
                                    </div>
                                    <p className="my-6">{project.description}</p>
                                    <div className="flex gap-3 my-2 mt-5 flex-wrap">
                                        {project.technologies.map(tech => (
                                            <div key={tech.id} className="flex gap-2 ring-2 ring-foreground py-1 px-2 rounded-sm">
                                                <img src={tech.logo} className="w-5" style={{ filter: 'var(--logo-filter)' }} alt={`Logo ${tech.name}`} />
                                                <span className="font-semibold text-sm">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm mt-2">
                                        {project.startedAt.toLocaleDateString('fr-FR')} - {project.endedAt?.toLocaleDateString('fr-FR') ?? 'En cours'}
                                    </span>
                                    <div className="flex gap-3 mt-2">
                                        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm underline">GitHub</a>}
                                        {project.web && <a href={project.web} target="_blank" rel="noopener noreferrer" className="text-sm underline">Site web</a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Link href="/admin" className="form-button mt-5 mx-5">Retour au menu</Link>
            </main>
        </>
    );
}