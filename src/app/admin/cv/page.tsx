"use client";

import { useState } from "react";
import { uploadCv } from "@/actions/cv";
import Header from "@/src/components/Header";
import FormField from "@/components/form/FormField";

export default function AdminCv() {

    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function action(formData: FormData) {
        const res = await uploadCv(formData);
        if (res?.serverError) setServerError(res.serverError);
        if (res?.success) setSuccess(true);
    }

    return (
        <>
            <Header />
            <main className="flex flex-col items-center">
                <div className="grid grid-cols-1 gap-2 pt-10 sm:w-150">
                    <h2>CV</h2>
                    <form action={action} className="form-style">
                        <FormField label="Fichier PDF" id="cv" name="cv" type="file" accept=".pdf" />
                        {serverError && <span className="text-red-800">{serverError}</span>}
                        {success && <span className="font-bold">CV mis à jour avec succès !</span>}
                        <button type="submit" className="form-button">Uploader</button>
                    </form>
                </div>
            </main>
        </>
    );
}