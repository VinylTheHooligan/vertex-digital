import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LegalPage from '@/app/legal/page';
import PrivacyPage from '@/app/privacy/page';

describe('Pages légales', () => {
    it('affiche la page mentions légales', () => {
        render(<LegalPage />);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('affiche la page politique de confidentialité', () => {
        render(<PrivacyPage />);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
});