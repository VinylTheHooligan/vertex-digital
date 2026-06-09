"use client";

import { updateProject } from "@/app/actions/project";
import { useState } from "react";
import FormField from "@/components/form/FormField";

type Technology = {
    id: number,
    name: string,
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

type FieldErrors = {
    name?: string[];
    description?: string[],
    startedAt?: string[],
    endedAt?: string[],
}

export default function EditProjectForm({ project, technologies }: { project: Project, technologies: Technology[] }) {
    const [errors, setErrors] = useState<FieldErrors | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function action(formData: FormData) {
        const res = await updateProject(project.id, formData);

        if (res?.fieldErrors) setErrors(res.fieldErrors);
        if (res?.serverError) setServerError(res.serverError);
        if (res?.success) setSuccess(true);
    }

    return (
        <form action={action} className="form-style">
            <FormField label="Nom" id="name" name="name" error={errors?.name} defaultValue={project.name}/>
            <FormField label="Description" id="description" name="description" rows={3} error={errors?.description} defaultValue={project.description}/>
            <FormField label="Image" id="image" name="image" type="file" accept="image/*" required={false}/>
            <FormField label="Date de début" id="startedAt" name="startedAt" type="date" error={errors?.startedAt} defaultValue={project.startedAt.toISOString().split('T')[0]}/>
            <FormField label="Date de fin" id="endedAt" name="endedAt" type="date" error={errors?.endedAt} defaultValue={project.endedAt?.toISOString().split('T')[0]} required={false}/>
            <FormField label="Github" id="github" name="github" type="url" defaultValue={project.github ?? ''} required={false}/>
            <FormField label="Site web" id="web" name="web" type="url" defaultValue={project.web ?? ''} required={false}/>

            <div className="flex flex-col gap-2">
                <label className="font-bold">Technologies :</label>
                <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                        <label key={tech.id} className="flex items-center gap-1 cursor-pointer">
                            <input type="checkbox" name="technologies" value={tech.id} defaultChecked={project.technologies.some(t => t.id === tech.id)} />
                            {tech.name}
                        </label>
                    ))}
                </div>
            </div>

            {serverError && <span className="text-red-800">{serverError}</span>}
            {success && <span className="font-bold">Le projet à bien été modifié !</span>}

            <button type="submit" className="form-button">Modifier</button>
        </form>
    );
}