'use client'

import { Turnstile } from '@marsidev/react-turnstile';
import { handleSubmit } from "@/src/app/actions/contact";
import { useState } from "react";

type FieldErrors = {
    email?: string[],
    subject?: string[],
    message?: string[],
}

export default function Contact() {

    const [errors, setErrors] = useState<FieldErrors | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function action(formData: FormData) {
        if (!token) return;
        formData.append('token', token);

        const res = await handleSubmit(formData);

        if (res?.fieldErrors) setErrors(res.fieldErrors);
        if (res?.serverError) setServerError(res.serverError);
        if (res?.success) setSuccess(true);
    }

    return (
        <div className="grid grid-cols-1 gap-2">
            <h2 className="text-3xl text-center">Me contacter</h2>
            <span className="inline-block text-center">Ce formulaire est réservé aux sollicitations professionnelles.</span>
            
            <form action={action} className="flex flex-col mt-4 mx-3 gap-4 ring-2 ring-foreground rounded-sm py-3 px-4">
                <div className="flex flex-col gap-1">
                    <label className="font-bold" htmlFor="email">Email :</label>
                    <div className="input-wrapper">
                        <input type="email" id="email" name="email" required/>
                    </div>
                    { errors?.email && <span className="text-red-800">{errors.email[0]}</span> }
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="font-bold" htmlFor="subject">Sujet :</label>
                    <div className="input-wrapper">
                        <input id="subject" name="subject" type="text" required />
                    </div>
                    { errors?.subject && <span className="text-red-800">{errors.subject[0]}</span> }
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="font-bold" htmlFor="message">Message :</label>
                    <textarea id="message" name="message" rows={6} required />
                    { errors?.message && <span className="text-red-800">{errors.message[0]}</span> }
                </div>

                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <Turnstile 
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setToken(token)}
                />

                { serverError && <span className="text-red-800">{serverError}</span> }
                { success && <span className="text-lg">Votre message a bien été envoyé, merci !</span> }

                <button type="submit" disabled={!token}>Envoyer</button>
            </form>
        </div>
    );
}