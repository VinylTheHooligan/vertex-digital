"use client";

import { createTechnology } from "@/src/app/actions/technology";
import FormField from "@/src/components/form/FormField";
import Header from "@/src/components/Header";
import { useState } from "react";

type FieldErrors = {
    name?: string[],
}

export default function AdminTechCreate() {

    const [errors, setErrors] = useState<FieldErrors | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function action(formData: FormData) {
        const res = await createTechnology(formData);
        
        if (res?.fieldErrors) setErrors(res.fieldErrors);
        if (res?.serverError) setServerError(res.serverError);
        if (res?.success) setSuccess(true);
    }

    if (success) {
        return <p className="text-center mt-10">Technologie créée avec succès !</p>
    }

    return (
        <>
            <Header />
            <h2>Créer une technologie</h2>
            <form action={action}>
                <FormField label="Nom" id="name" name="name" type="text" error={errors?.name}/>
                <FormField label="Logo" id="logo" name="logo" type="file" accept="image/*"/>
                
                {serverError && <span className="text-red-800">{serverError}</span>}

                <button type="submit" className="form-button">Créer</button>
            </form>
        </>
    );
}