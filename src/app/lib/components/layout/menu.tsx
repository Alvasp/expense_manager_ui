'use client'

import { NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu() {
    const pathname = usePathname()

    return (
        <NavbarContent className="hidden sm:flex gap-8" justify="center">

            <NavbarItem isActive={pathname.includes('/dashboard')}>
                <Link href="/dashboard" >
                    Dashboard
                </Link>
            </NavbarItem>
            <NavbarItem isActive={pathname.includes('/categories')}>
                <Link href="/categories" aria-current="page">
                    Categories
                </Link>
            </NavbarItem>
            <NavbarItem isActive={pathname.includes('/accounts')}>
                <Link href="/accounts" aria-current="page">
                    Accounts
                </Link>
            </NavbarItem>
        </NavbarContent>
    )
}