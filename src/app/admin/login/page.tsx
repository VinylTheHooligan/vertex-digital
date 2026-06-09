'use client';

import { useState } from "react";
import { login } from "@/actions/auth";
import Header from "@/components/Header";
import FormFieldProps from "@/components/form/FormField";
import { Turnstile } from "@marsidev/react-turnstile";

export default function LoginPage() {

    const [errors, setErrors] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    async function action(formData: FormData) {
        if (!token) return;
        formData.append('token', token);

        const res = await login(formData);
        if (res?.error) setErrors(res.error);
    }

    return (
        <>
            <Header />
            <div className="grid grid-cols-1 gap-2 mx-3">
                <h2>Accès administrateur</h2>
                <span className="inline-block text-center">Toute tentative malicieuse désactivera l&apos;accès jusqu&apos;à l&apos;intervention d&apos;un administrateur.</span>
                <form className="form-style" action={action}>
                    <FormFieldProps label="Utilisateur" id="username" name="username" type="text" />
                    <FormFieldProps label="Mot de passe" id="password" name="password" type="password" />

                    {errors && <span className="text-red-800">{errors}</span>}
                    
                    <Turnstile
                        className="mt-3" 
                        siteKey={process.env.NODE_ENV === 'development' 
                            ? '1x00000000000000000000AA' 
                            : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={(token) => setToken(token)}
                    />

                    <button type="submit" className="form-button" disabled={!token}>Connexion</button>
                </form>
            </div>
        </>
    );
}