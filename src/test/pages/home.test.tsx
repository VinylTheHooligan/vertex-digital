import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/src/lib/prisma', () => ({
    prisma: {
        project: {
            findMany: vi.fn().mockResolvedValue([
                {
                    id: 1,
                    name: 'Projet Test',
                    description: 'Description test',
                    image: '/images/projects/test.webp',
                    startedAt: new Date('2024-01-01'),
                    endedAt: null,
                    github: null,
                    web: null,
                    technologies: [
                        { id: 1, name: 'Next.js', logo: '/images/technologies/nextjs.svg' }
                    ]
                }
            ])
        }
    }
}));

import ProjectCard from '@/components/project/ProjectCard';

describe('Page accueil', () => {
    const mockProject = {
        id: 1,
        name: 'Projet Test',
        description: 'Description test',
        image: '/images/projects/test.webp',
        startedAt: new Date('2024-01-01'),
        endedAt: null,
        github: null,
        web: null,
        technologies: [
            { id: 1, name: 'Next.js', logo: '/images/technologies/nextjs.svg' }
        ]
    };

    it('affiche le nom du projet', () => {
        render(<ProjectCard {...mockProject} />);
        expect(screen.getByText('Projet Test')).toBeInTheDocument();
    });

    it('affiche la description du projet', () => {
        render(<ProjectCard {...mockProject} />);
        expect(screen.getByText('Description test')).toBeInTheDocument();
    });

    it('affiche l\'image du projet', () => {
        render(<ProjectCard {...mockProject} />);
        expect(screen.getByRole('img', { name: 'Projet Test' })).toBeInTheDocument();
    });

    it('affiche les technologies', () => {
        render(<ProjectCard {...mockProject} />);
        expect(screen.getByText('Next.js')).toBeInTheDocument();
    });
});