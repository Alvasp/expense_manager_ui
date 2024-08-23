import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import "../globals.css";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className={`${inter.className} antialiased`} >

                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center  mx-auto md:h-screen lg:py-0">
                        {children}
                    </div>

                </section>
            </body>
        </html>
    )
}