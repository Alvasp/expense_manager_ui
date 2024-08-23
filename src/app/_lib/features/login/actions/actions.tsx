'use server'

import { signOut } from "@/app/_lib/auth"
import { redirect } from "next/navigation"

export async function logout() {
    await signOut()
}