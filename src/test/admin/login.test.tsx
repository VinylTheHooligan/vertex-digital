import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/src/app/admin/login/page';

describe('Page de login admin', () => {
    it('affiche le champ username', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/utilisateur/i)).toBeInTheDocument();
    });

    it('affiche le champ password', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    });

    it('le bouton connexion est désactivé sans le token Turnstile', () => {
        render(<LoginPage />);
        expect(screen.getByRole('button', { name: /connexion/i })).toBeDisabled();
    });
});