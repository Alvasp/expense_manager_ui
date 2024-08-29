'use client'

import classNames from "classnames";
import { Fragment, useState } from "react";
import styles from './styles.module.css'
import { Tooltip } from "@nextui-org/react";
import AddEditMovementModal from "../addEditMovement/movement-add-edit-modal.client";
import { useRouter } from "next/navigation";
import Icon from '@mui/material/Icon';

export type FabProps = {
}

export default function Fab({ }: FabProps) {
    const router = useRouter()

    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <Tooltip content="Options">
                <div className={`fixed bottom-4 right-5 z-10 justify-center`}>
                    <button onClick={() => { setOpen(!open) }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg flex justify-center">
                        <Icon style={{ color: 'white' }}  >
                            more_horiz
                        </Icon>
                    </button>
                </div>
            </Tooltip>

            <Tooltip content="Add Movement">
                <div className={classNames('fixed bottom-20 right-5', { [styles.open]: open, [styles.closed]: !open })}>
                    <AddEditMovementModal
                        launcher={<button onClick={() => { setOpen(!open); }}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg flex justify-center">
                            <Icon style={{ color: 'white' }}>
                                add_charts
                            </Icon>
                        </button>} />

                </div>
            </Tooltip>

            <Tooltip content="Categories">
                <div className={classNames('fixed bottom-36 right-5', { [styles.open]: open, [styles.closed]: !open })}>
                    <button
                        onClick={() => { router.replace('/categories') }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg flex justify-center">
                        <Icon style={{ color: 'white' }}  >
                            category
                        </Icon>
                    </button>
                </div>
            </Tooltip>

            <Tooltip content="Accounts">
                <div className={classNames('fixed bottom-52 right-5', { [styles.open]: open, [styles.closed]: !open })}>
                    <button
                        onClick={() => { router.replace('/accounts') }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg flex justify-center">
                        <Icon style={{ color: 'white' }}  >
                            payments
                        </Icon>
                    </button>
                </div>
            </Tooltip>


        </Fragment >
    )
}