'use server'

import { fetchAccountsWithBalance, deleteAccount as _deleteAccount, updateAccount, saveAccount } from "@/app/lib/database/movements-repository"
import { IAccount } from "@/app/lib/types/definitions"
import { Constants } from "@/app/lib/utils/constants"
import { revalidateTag, unstable_cache } from "next/cache"

export const getAccounts = unstable_cache(fetchAccountsWithBalance, ['accounts'], {
    tags: [Constants.CACHE.ACCOUNTS],
    revalidate: 3600
})

export async function createAccount(account: IAccount) {
    const _account = await saveAccount(account);
    await revalidate()
    return _account
}

export async function deleteAccount(id: number) {
    await _deleteAccount(id)
    await revalidate()
}

export async function editAccount(account: IAccount) {
    await updateAccount(account)
    await revalidate()

}

async function revalidate() {
    revalidateTag(Constants.CACHE.MOVEMENTS)
    revalidateTag(Constants.CACHE.ACCOUNTS)
}