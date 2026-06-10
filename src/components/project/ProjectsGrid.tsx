"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import ProjectCard from "@/components/project/ProjectCard";

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: {
        duration: 0.4, ease: 'easeOut'
    }}
}

type Technology = {
    id: number;
    name: string;
    logo: string;
}

type Project = {
    id: number;
    name: string;
    description: string;
    image: string;
    startedAt: Date;
    endedAt: Date | null;
    github: string | null;
    web: string | null;
    technologies: Technology[];
}

export default function ProjectsGrid({ projects }: { projects: Project[]}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mx-20 xl:grid-cols-4 items-stretch"
        >
            {projects.map(project => (
                <motion.div key={project.id} variants={item} className="h-full">
                    <ProjectCard {...project} />
                </motion.div>
            ))}
        </motion.div>
    )
}