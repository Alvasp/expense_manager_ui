import { signIn } from "../../_lib/auth"
import Image from 'next/image'
import MySvgImg from "/public/images/google-icon.svg";

export default async function Page() {
    return (
        <div>
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md flex justify-center">
                <form
                    action=
                    {async () => {
                        "use server"
                        await signIn("google", { redirectTo: '/dashboard' })
                    }} >
                    <h1 className="text-2xl font-semibold mb-6 text-center">Welcome</h1>
                    <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                        <Image
                            height={24}
                            width={24}
                            src={MySvgImg}
                            alt="google logo" />
                        <span>Login with Google</span>
                    </button>

                </form >
            </div >
        </div>
    )
}