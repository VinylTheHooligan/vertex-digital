import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@marsidev/react-turnstile', () => ({
    Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
        <button onClick={() => onSuccess('test-token')}>Mock Turnstile</button>
    )
}))

vi.mock('@/src/lib/prisma', () => ({
    prisma: {
        loginAttempt: {
            deleteMany: vi.fn(),
            count: vi.fn().mockResolvedValue(0),
            create: vi.fn(),
        },
        contact: {
            deleteMany: vi.fn(),
            findFirst: vi.fn().mockResolvedValue(null),
            findMany: vi.fn().mockResolvedValue([]),
            create: vi.fn(),
        },
        technology: {
            findUnique: vi.fn(),
            findMany: vi.fn().mockResolvedValue([]),
            create: vi.fn(),
            delete: vi.fn(),
        },
        project: {
            findUnique: vi.fn(),
            findMany: vi.fn().mockResolvedValue([]),
            create: vi.fn(),
            delete: vi.fn(),
            update: vi.fn(),
        }
    }
}));

vi.mock('bcryptjs', () => ({
    default: {
        compare: vi.fn(),
    }
}));

vi.mock('iron-session', () => ({
    getIronSession: vi.fn().mockResolvedValue({
        isLoggedIn: false,
        save: vi.fn(),
    })
}));

vi.mock('next/headers', () => ({
    cookies: vi.fn().mockResolvedValue({}),
    headers: vi.fn().mockResolvedValue({
        get: vi.fn().mockReturnValue(null),
    }),
}));

vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
}));

vi.mock('@/components/providers/ThemeProvider', () => ({
    useTheme: () => ({ isDark: false, toggle: vi.fn() })
}));