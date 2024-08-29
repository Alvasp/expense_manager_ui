'use client'

import Image from 'next/image'
import { DashboardColors, IAccountBalance } from "@/app/lib/types/definitions";
import { formatCurrency } from "@/app/lib/utils/format-utils";
import AccountAddEditModal from "./account-add-edit-modal.client";

export function AccountItem({ item }: { item: IAccountBalance }) {
    return (
        <AccountAddEditModal launcher={
            <div className="w-96 h-56 m-auto rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105"
                style={{ backgroundColor: DashboardColors.at(item.account.id) || 'blue' }}>
                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between mb-7">
                        <div className="">
                            <p className="font-light">
                                Name
                            </p>
                            <p className="font-medium tracking-widest">
                                {item.account.name}
                            </p>
                        </div>
                        <Image
                            height={14}
                            width={54}
                            src={`/images/${item.account.name.toLowerCase().includes('visa') ? 'visa' : 'mastercard'}.png`}
                            alt="logo" />
                    </div>

                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Balance
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {formatCurrency(item.balance)}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>} defaultValues={item.account} />
    )
}