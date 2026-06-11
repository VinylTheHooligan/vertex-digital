'use client';

import { login } from "@/app/actions/auth";
import FormField from "@/components/form/FormField";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";

export default function LoginForm() {

    const [errors, setErrors] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const turnstileRef = useRef<TurnstileInstance>(null);

    async function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await action(formData);
    }

    async function action(formData: FormData) {
        if (!token || submitting) return;
        formData.append('token', token);
        setSubmitting(true);

        const res = await login(formData);

        turnstileRef.current?.reset();
        setToken(null);
        setSubmitting(false);
        if (res?.error) setErrors(res.error);
    }

    return (
       <form className="form-style" onSubmit={handleFormSubmit}>
            <FormField label="Utilisateur" id="username" name="username" type="text" />
            <FormField label="Mot de passe" id="password" name="password" type="password" />
            {errors && <span className="text-red-800">{errors}</span>}
            <Turnstile
                ref={turnstileRef}
                className="mt-3"
                siteKey={process.env.NODE_ENV === 'development'
                    ? '1x00000000000000000000AB'
                    : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setToken(token)}
            />
            <button type="submit" className="form-button" disabled={!token || submitting}>
                {submitting ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    );
}