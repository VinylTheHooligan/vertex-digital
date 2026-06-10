import { prisma } from "@/lib/prisma";
import ProjectsGrid from "@/components/project/ProjectsGrid";

export default async function Project() {

    const projects = await prisma.project.findMany({
        orderBy: { startedAt: 'desc' },
        include: { technologies: true },
    });

    return (
        <section id="project-section" className="flex flex-col gap-4 mx-3 my-20 pt-10">
            <h2 className="mb-5">Projets</h2>
            <ProjectsGrid projects={projects} />
        </section>
    );
}