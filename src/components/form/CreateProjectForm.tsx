"use client";

import { createProject } from "@/app/actions/project";
import { useReducer, useRef } from "react";
import FormField from "@/components/form/FormField";

import type { ProjectFieldErrors } from "@/app/actions/project";
import { formReducer, FormState } from "@/types/forms";

type Technology = {
    id: number,
    name: string,
}

const initialState: FormState<ProjectFieldErrors> = { status: 'idle' };

export default function CreateProjectForm({ technologies }: { technologies: Technology[] }) {
    const [state, dispatch] = useReducer(formReducer<ProjectFieldErrors>, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await action(formData);
    }

    async function action(formData: FormData) {
        if (state.status === 'submitting') return;
        dispatch({ type: 'SUBMIT' });

        const res = await createProject(formData);

        if (res?.success) {
            dispatch({ type: 'SUCCESS' });
            formRef.current?.reset();
        } else {
            dispatch({ 
                type: 'ERROR', 
                fieldErrors: res?.fieldErrors, 
                serverError: res?.serverError 
            });
        }
    }

    return (
        <form ref={formRef} onSubmit={handleFormSubmit} className="form-style">
            <FormField label="Nom" id="name" name="name" 
                error={state.status === 'error' ? state.fieldErrors?.name : undefined}/>
            <FormField label="Description" id="description" name="description" rows={3} 
                error={state.status === 'error' ? state.fieldErrors?.description : undefined}/>
            <FormField label="Image" id="image" name="image" type="file" accept="image/*" />
            <FormField label="Date de début" id="startedAt" name="startedAt" type="date" 
                error={state.status === 'error' ? state.fieldErrors?.startedAt : undefined}/>
            <FormField label="Date de fin" id="endedAt" name="endedAt" type="date" 
                error={state.status === 'error' ? state.fieldErrors?.endedAt : undefined}/>
            <FormField label="Github" id="github" name="github" type="url" required={false}/>
            <FormField label="Site web" id="web" name="web" type="url"required={false}/>

            <div className="flex flex-col gap-2">
                <label className="font-bold">Technologies :</label>
                <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                        <label key={tech.id} className="flex items-center gap-1 cursor-pointer">
                            <input type="checkbox" name="technologies" value={tech.id} />
                            {tech.name}
                        </label>
                    ))}
                </div>
            </div>

            {state.status === 'error' && state.serverError &&
                <span className="text-red-800">{state.serverError}</span>}
            {state.status === 'success' &&
                <span className="font-bold">Le projet a bien été créé !</span>}

            <button type="submit" className="form-button" disabled={state.status === 'submitting'}>
                {state.status === 'submitting' ? 'Création...' : 'Créer'}
            </button>
        </form>
    );
}