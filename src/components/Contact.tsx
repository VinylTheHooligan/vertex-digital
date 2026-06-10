'use client'

import { Turnstile } from '@marsidev/react-turnstile';
import { handleSubmit } from "@/app/actions/contact";
import { useState } from "react";
import FormField from '@/components/form/FormField';

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
        <section id="contact-me" className="flex flex-col items-center">
            <div className="grid grid-cols-1 mt-15 gap-2 pt-10 sm:w-150">
                <h2>Me contacter</h2>
                <span className="inline-block text-center">Ce formulaire est réservé aux sollicitations professionnelles.</span>
                
                <form className="form-style" action={action}>
                    <FormField label="Email" id="email" name="email" type="email" error={errors?.email} />
                    <FormField label="Sujet" id="subject" name="subject" type="text" error={errors?.subject} />
                    <FormField label="Message" id="message" name="message" rows={4} error={errors?.message} />
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                    <Turnstile
                        className="mt-3"
                        siteKey={process.env.NODE_ENV === 'development'
                            ? '1x00000000000000000000AA'
                            : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={(token) => setToken(token)}
                    />
                    { serverError && <span className="text-red-800">{serverError}</span> }
                    { success && <span className="text-lg">Votre message a bien été envoyé, merci !</span> }
                    <button type="submit" className="form-button" disabled={!token}>Envoyer</button>
                </form>
            </div>
        </section>
    );
}