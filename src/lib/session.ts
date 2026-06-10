import { SessionOptions } from 'iron-session';

export const sessionsOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'admin_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
    }
};

export type SessionData = {
    isLoggedIn: boolean,
}