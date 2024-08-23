import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        signIn(params) {
            const success = params.account?.provider === "google" && params.profile?.email_verified === true && params.profile?.email === 'alexis.vasquez01@gmail.com'

            if (!success) {
                return "/login?not-enrolled";
            }

            return true;
        },
    }
})