'use client'

import { IAccount } from "@/app/lib/types/definitions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { cloneElement, Fragment, ReactElement, useEffect, useState } from "react";
import { z } from "zod";
import { createAccount, deleteAccount, editAccount } from "../actions/actions";
import { toast } from "react-toastify";

export type AccountAddEditModalProps = {
    launcher: ReactElement,
    defaultValues: IAccount
}

type FormErrors = Map<string, string>;

const requiredAndTypeError = {
    required_error: 'El campo es requerido',
    invalid_type_error: 'El tipo de dato ingresado es inválido'
}

const schemaValidation = z.object({
    name: z.string(requiredAndTypeError).min(3, {
        message: 'Debe ingresar un nombre de largo al menos 3 caracteres'
    })
});

export default function AccountAddEditModal({ launcher, defaultValues }: AccountAddEditModalProps) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [values, setValues] = useState<IAccount>(defaultValues)
    const [errors, setErrors] = useState<FormErrors>(new Map<string, string>())

    useEffect(() => {
        _reset()
    }, [defaultValues])

    useEffect(() => {
        if (isOpen) {
            _reset()
        }
    }, [isOpen])

    const _reset = () => {
        setValues(defaultValues)
        setErrors(new Map())
    }

    const _save = async () => {
        const res = schemaValidation.safeParse(values);

        if (!res.success) {
            setErrors(
                new Map(res.error.issues.map(issue => {
                    const path = issue.path.join('.');
                    return [path, issue.message];
                }))
            )
            return
        }

        setErrors(
            new Map()
        )

        if (!defaultValues.id) {
            await createAccount(values)
            toast.success(`Account saved successfully`)
        } else {
            await editAccount(values)
            toast.success(`Changes applied successfully`)
        }
        onClose()
    }

    const _delete = async () => {
        await deleteAccount(values.id)
        toast.success(`Account deleted!`)
        onClose()
    }

    return (
        <Fragment>
            <div onClick={onOpen}>
                {cloneElement(launcher as ReactElement, { onClick: onOpen })}
            </div>

            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}  >
                <ModalContent className="p-3">
                    <ModalHeader className="flex flex-col gap-1">Account Form</ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col gap-4 min-h-[100px]">
                            <Input type="text"
                                name="name"
                                defaultValue={values.name}
                                value={values.name}
                                onChange={(event) => setValues({ ...values, name: event.target.value })}
                                isInvalid={errors.has('name')}
                                errorMessage={errors.get('name')}
                                variant={'underlined'}
                                label="Nombre" />
                        </form >
                        <div className="flex flex-row justify-end gap-4 mt-5">

                            {defaultValues.id > 0
                                && <Button
                                    className="max-w-10"
                                    color="danger"
                                    type="button"
                                    onClick={_delete} >
                                    Delete
                                </Button>}
                            <Button
                                className="max-w-10"
                                color="secondary"
                                type="button"
                                onClick={onClose} >
                                Cancel
                            </Button>

                            <Button
                                className="max-w-10"
                                color="primary"
                                type="button"
                                onClick={_save} >
                                Save
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </Fragment>

    )
}