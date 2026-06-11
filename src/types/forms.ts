export type FormState<T> =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; fieldErrors?: T; serverError?: string }
  | { status: 'success' }

export type FormAction<T> =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; fieldErrors?: T; serverError?: string }

export function formReducer<T>(_state: FormState<T>, action: FormAction<T>): FormState<T> {
    switch (action.type) {
        case 'SUBMIT': return { status: 'submitting' }
        case 'SUCCESS': return { status: 'success' }
        case 'ERROR': return { status: 'error', fieldErrors: action.fieldErrors, serverError: action.serverError }
    }
}