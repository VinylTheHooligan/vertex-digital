"use client";

import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { handleSubmit } from "@/app/actions/contact";
import { useReducer, useRef, useState } from "react";
import FormField from '@/components/form/FormField';

import type { ContactFieldErrors } from "@/app/actions/contact";
import { formReducer, type FormState } from "@/types/forms";

const initialState: FormState<ContactFieldErrors> = { status: 'idle' };

export default function ContactForm() {
    const [state, dispatch] = useReducer(formReducer<ContactFieldErrors>, initialState);
    const [token, setToken] = useState<string | null>(null);
    const turnstileRef = useRef<TurnstileInstance>(null);

    async function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await action(formData);
    }

    async function action(formData: FormData) {
        if (!token || state.status === 'submitting') return;
        formData.append('token', token);
        dispatch({ type: 'SUBMIT' });

        const res = await handleSubmit(formData);
        turnstileRef.current?.reset();
        setToken(null);

        if (res?.success) dispatch({ type: 'SUCCESS' });
        else dispatch({ 
            type: 'ERROR', 
            fieldErrors: res?.fieldErrors,
            serverError: res?.serverError
        });
    }

    return (
       <form className="form-style" onSubmit={handleFormSubmit} >
            <FormField label="Email" id="email" name="email" type="email" 
                error={state.status === 'error' ? state.fieldErrors?.email : undefined} />
            <FormField label="Sujet" id="subject" name="subject" type="text" 
                error={state.status === 'error' ? state.fieldErrors?.subject : undefined} />
            <FormField label="Message" id="message" name="message" rows={4} 
                error={state.status === 'error' ? state.fieldErrors?.message : undefined} />
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <Turnstile
                ref={turnstileRef}
                className="mt-3"
                siteKey={process.env.NODE_ENV === 'development'
                    ? '1x00000000000000000000AA'
                    : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setToken(token)}
            />
            {state.status === 'error' && state.serverError &&
                <span className="text-red-800">{state.serverError}</span>}
            {state.status === 'success' &&
                <span className="text-lg">Votre message a bien été envoyé, merci !</span>}
            <button type="submit" className="form-button" disabled={!token || state.status === 'submitting'}>
                {state.status === 'submitting' ? 'Envoi...' : 'Envoyer'}
            </button>
        </form>
    );
}