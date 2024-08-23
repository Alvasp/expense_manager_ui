'use client'

import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Fragment, ReactNode, useMemo, useState } from "react";
import { IMovement } from "@/app/_lib/types/definitions";
import MovementForm from "./movement-form.client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addMovement, updateRecurrentMovement, updateSingleMovement, deleteRecurrentMovement, deleteSingleMovement } from "../../actions/actions";
import FormActionConfirmation from "./movement-confirmation.client";
import { useDashboardStore } from "../../store/storeProvider";

type RecurrencyType = 'single' | 'multiple'

type MovementAddEditConfirmation = {
    show: boolean,
    actionCallback?: (recurrency: RecurrencyType) => Promise<void>
}

export type AddEditMovementModalProps = {
    launcher: ReactNode,
    movement?: IMovement
}

export default function AddEditMovementModal({ launcher, movement }: AddEditMovementModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { categories, movementTypes, criteria } = useDashboardStore((state) => state)

    const router = useRouter();

    const [confirmation, setConfirmation] = useState<MovementAddEditConfirmation>({ show: false })

    const blankMovement = useMemo((): IMovement => {
        return {
            id: 0,
            title: '',
            dateEnd: null,
            dateStart: new Date(),
            recurrent: false,
            amount: 0,
            category: categories.at(0)!
        }
    }, [categories])

    const handleSave = async (movement: IMovement) => {
        const _action = movement?.id ? _edit : _save;

        if (movement?.recurrent) {
            setConfirmation({
                show: true,
                actionCallback: recurrency => _action(recurrency, movement)
            });

            return;
        }

        await _action('multiple', movement)
    }

    const handleDelete = async (movement: IMovement) => {

        if (movement?.recurrent) {
            setConfirmation({
                show: true,
                actionCallback: recurrency => _delete(recurrency, movement)
            });

            return;
        }

        await _delete('multiple', movement)

    }

    const _save = async (_: RecurrencyType, values: IMovement) => {
        try {
            await addMovement(values);
            toast.success(`Movimiento Guardado exitósamente`)
            router.refresh()
        } catch (error) {
            toast.error(`Error Guardando movimiento`)
            throw error;
        }
    }

    const _edit = async (recurrency: RecurrencyType, values: IMovement) => {
        const _action = movement?.recurrent ? updateRecurrentMovement : updateSingleMovement

        try {
            await _action(values, { type: recurrency, forDate: new Date(criteria!.year, criteria!.month - 1, 1) });
            toast.success(`Movimiento Editado exitósamente`)
            router.refresh()
        } catch (error) {
            toast.error(`Error Editando exitósamente`)
            throw error;
        }

    }

    const _delete = async (recurrency: RecurrencyType, values: IMovement) => {
        const _action = movement?.recurrent ? deleteRecurrentMovement : deleteSingleMovement

        try {
            await _action(values.id, { type: recurrency, forDate: new Date(criteria!.year, criteria!.month - 1, 1) });
            router.refresh()
            toast.success(`Movimiento Eliminado exitósamente`)
        } catch (error) {
            toast.error(`Error Eliminado exitósamente`)
            throw error;
        }
    }

    if (confirmation.show) {
        return (
            <FormActionConfirmation
                onCancel={() => {
                    setConfirmation({ show: false })
                }}
                onSelect={recurrency => confirmation.actionCallback!(recurrency)
                } />
        )
    }

    return (
        <Fragment>
            <div onClick={onOpen}>
                {launcher}
            </div>

            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}  >
                <ModalContent className="p-3">
                    <ModalHeader className="flex flex-col gap-1">Movimiento</ModalHeader>
                    <ModalBody>
                        <MovementForm
                            categories={categories}
                            movementTypes={movementTypes}
                            defaultValues={movement || blankMovement}
                            actions={
                                {
                                    onSave: handleSave,
                                    onDelete: handleDelete,
                                    onCancel: onOpenChange
                                }
                            } />
                    </ModalBody>
                </ModalContent>
            </Modal >
        </Fragment>
    )
    return null
}
