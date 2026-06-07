'use client';

import { useState } from "react";
import { login } from "@/src/app/actions/auth";
import Header from "@/src/components/Header";
import FormFieldProps from "@/src/components/form/FormField";
import { Turnstile } from "@marsidev/react-turnstile";

export default function LoginPage() {

    const [errors, setErrors] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    async function action(formData: FormData) {
        const res = await login(formData);
        if (res?.error) setErrors(res.error);
    }

    return (
        <>
            <Header />
            <div className="grid grid-cols-1 gap-2 mx-3">
                <h2 className="text-3xl text-center">Accès administrateur</h2>
                <span className="inline-block text-center">Toute tentative malicieuse désactivera l'accès jusqu'à l'intervention d'un administrateur.</span>
                <form action={action} className="flex flex-col mt-4 mx-3 gap-4 ring-2 ring-foreground rounded-sm py-3 px-4">
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

                    <button type="submit" disabled={!token}>Connexion</button>
                </form>
            </div>
        </>
    );
}