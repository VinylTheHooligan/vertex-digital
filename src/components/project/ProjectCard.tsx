
type Technology = {
    id: number;
    name: string;
    logo: string;
}

type ProjectCardProps = {
    name: string;
    description: string;
    image: string;
    startedAt: Date;
    endedAt: Date | null;
    technologies: Technology[];
    github: string | null;
    web: string | null;
}

export default function ProjectCard({
    name,
    description,
    image,
    startedAt,
    endedAt,
    technologies,
    github,
    web,
}: ProjectCardProps) {

    return (
        <div className="flex flex-col rounded-xl border border-foreground/30 overflow-hidden bg-foreground/5">
            <img src={image} alt={name} className="w-full h-44 object-cover" />
            <div className="flex flex-col p-4 gap-3">
                <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                        <span className="text-xl font-semibold">{name}</span>
                        <span className="text-xs text-foreground/70">
                            {startedAt.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric'})} - {endedAt ? endedAt.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric'}) : 'En cours' }
                        </span>
                    </div>
                    <p className="text-md leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map(tech => (
                            <span key={tech.id} className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-foreground/30">
                                <img src={tech.logo} alt={tech.name} className="w-3.5 h-3.5" style={{ filter: 'var(--logo-filter)' }} />
                                {tech.name}
                            </span>
                        ))}
                    </div>
                    {(github || web) && (
                        <div className="flex gap-4 border-t border-foreground/20 pt-3">
                            {github && (
                                <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground/85">
                                    <img src="/images/github.svg" className="w-4 h-4" style={{ filter: 'var(--logo-filter)' }} />
                                    Github
                                </a>
                            )}
                            {web && (
                                <a href={web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground/85">
                                    <img src="/images/link.svg" className="w-4 h-4" style={{ filter: 'var(--logo-filter)' }} />
                                    Site web
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}