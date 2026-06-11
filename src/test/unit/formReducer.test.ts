import { describe, it, expect } from 'vitest';
import { formReducer } from '@/types/forms';

describe('formReducer', () => {
    it('SUBMIT passe en submitting', () => {
        const state = formReducer({ status: 'idle' }, { type: 'SUBMIT' });
        expect(state).toEqual({ status: 'submitting' });
    });

    it('SUCCESS passe en success', () => {
        const state = formReducer({ status: 'submitting' }, { type: 'SUCCESS' });
        expect(state).toEqual({ status: 'success' });
    });

    it('ERROR passe en error avec les détails', () => {
        const state = formReducer({ status: 'submitting' }, {
            type: 'ERROR',
            serverError: 'Erreur serveur',
            fieldErrors: { email: ['Email invalide'] }
        });
        expect(state).toEqual({
            status: 'error',
            serverError: 'Erreur serveur',
            fieldErrors: { email: ['Email invalide'] }
        });
    });
});