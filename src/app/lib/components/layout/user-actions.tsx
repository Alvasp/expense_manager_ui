'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarContent, NavbarItem } from "@nextui-org/react"
import { Session } from "next-auth"
import { logout } from "../../features/login/actions/actions"
import Icon from '@mui/material/Icon';

export default function UserActions({ session }: { session: Session | null }) {

    const _logout = async () => {
        await logout();
    }

    if (session?.user) {
        return (
            <NavbarContent as="div" justify="end">
                <Dropdown>
                    <DropdownTrigger className="cursor-pointer">
                        <Button endContent={<Icon>arrow_drop_down</Icon>} variant="light" style={{ color: 'white' }} >{session.user.name}</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new" className="text-center" onClick={_logout}>
                            Logout
                        </DropdownItem>

                    </DropdownMenu>
                </Dropdown>
                {/* <NavbarItem>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}>
                        <button type="submit">{session.user.name}</button>
                    </form>
                </NavbarItem> */}
            </NavbarContent>
        )
    }

    return (
        <NavbarContent justify="end">
            <NavbarItem>

            </NavbarItem>
        </NavbarContent>
    )
}