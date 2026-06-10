import { SessionOptions } from 'iron-session';

export const sessionsOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'admin_session',
    cookieOptions: {
        secure: false,
        httpOnly: true,
        sameSite: 'strict',
    }
};

export type SessionData = {
    isLoggedIn: boolean,
}