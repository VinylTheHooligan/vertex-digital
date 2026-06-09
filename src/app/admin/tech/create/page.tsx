"use client";

import { createTechnology } from "@/actions/technology";
import FormField from "@/components/form/FormField";
import Header from "@/components/Header";
import Link from "next/link";
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

    return (
        <>
            <Header />
            <main className="flex flex-col items-center">
                <div className="grid grid-cols-1 gap-2 pt-10 sm:w-150">
                    <h2>Créer une technologie</h2>
                    <form className="form-style" action={action}>
                        <FormField label="Nom" id="name" name="name" type="text" error={errors?.name}/>
                        <FormField label="Logo" id="logo" name="logo" type="file" accept=".svg"/>
                    
                        {serverError && <span className="text-red-800">{serverError}</span>}
                        {success && <span className="font-bold">La technologie à été créer avec succès !</span>}
                        <button type="submit" className="form-button">Créer</button>
                    </form>
                    <Link href='/admin/tech' className="form-button mx-5 my-10">Retourner à la liste</Link>
                </div>
            </main>
        </>
    );
}