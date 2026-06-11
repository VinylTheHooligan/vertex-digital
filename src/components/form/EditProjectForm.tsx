"use client";

import { ProjectFieldErrors, updateProject } from "@/app/actions/project";
import { useReducer } from "react";
import FormField from "@/components/form/FormField";
import { formReducer, FormState } from "@/types/forms";

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

const initialState: FormState<ProjectFieldErrors> = { status: 'idle' };

export default function EditProjectForm({ project, technologies }: { project: Project, technologies: Technology[] }) {
    const [state, dispatch] = useReducer(formReducer<ProjectFieldErrors>, initialState);

    async function action(formData: FormData) {
        if (state.status === 'submitting') return;
        dispatch({ type: 'SUBMIT' });

        const res = await updateProject(project.id, formData);

        if (res?.success) dispatch({ type: 'SUCCESS' });
        else dispatch({ type: 'ERROR', fieldErrors: res?.fieldErrors, serverError: res?.serverError });
    }

    return (
        <form action={action} className="form-style">
            <FormField label="Nom" id="name" name="name"
                error={state.status === 'error' ? state.fieldErrors?.name : undefined}
                defaultValue={project.name}/>
            <FormField label="Description" id="description" name="description" rows={3} 
                error={state.status === 'error' ? state.fieldErrors?.description : undefined}
                defaultValue={project.description}/>
            <FormField label="Image" id="image" name="image" type="file" accept="image/*" required={false}/>
            <FormField label="Date de début" id="startedAt" name="startedAt" type="date" 
                error={state.status === 'error' ? state.fieldErrors?.startedAt : undefined}
                defaultValue={project.startedAt.toISOString().split('T')[0]}/>
            <FormField label="Date de fin" id="endedAt" name="endedAt" type="date" 
                error={state.status === 'error' ? state.fieldErrors?.endedAt : undefined} 
                defaultValue={project.endedAt?.toISOString().split('T')[0]} required={false}/>
            <FormField label="Github" id="github" name="github" type="url" 
                defaultValue={project.github ?? ''} required={false}/>
            <FormField label="Site web" id="web" name="web" type="url" 
                defaultValue={project.web ?? ''} required={false}/>

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

            {state.status === 'error' && state.serverError &&
                <span className="text-red-800">{state.serverError}</span>}
            {state.status === 'success' &&
                <span className="font-bold">Le projet a bien été modifié !</span>}

            <button type="submit" className="form-button" disabled={state.status === 'submitting'}>
                {state.status === 'submitting' ? 'Modification...' : 'Modifier'}
            </button>
        </form>
    );
}