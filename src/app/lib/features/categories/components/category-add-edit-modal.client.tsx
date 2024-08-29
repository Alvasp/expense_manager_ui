'use client'

import IconPicker from "@/app/lib/components/iconPicker/iconPicker";
import { IMovementCategory } from "@/app/lib/types/definitions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { createCategory, editCategory, deleteCategory } from "../actions/actions";
import { toast } from "react-toastify";
import { z } from "zod";
import React from "react";

export type CategoryAddEditModalProps = {
    launcher: ReactElement,
    defaultValues: IMovementCategory
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


export default function CategoryAddEditModal({ launcher, defaultValues }: CategoryAddEditModalProps) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [values, setValues] = useState<IMovementCategory>(defaultValues)
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

    const _saveCategory = async () => {
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
            await createCategory(values)
            toast.success(`Categoría Guardada exitósamente`)
        } else {
            await editCategory(values)
            toast.success(`Categoría Modificada exitósamente`)
        }
        onClose()
    }

    const _deleteCategory = async () => {
        await deleteCategory(values.id)
        toast.success(`Categoría Eliminada exitósamente`)
        onClose()
    }

    return (
        <Fragment>
            <div onClick={onOpen}>
                {React.cloneElement(launcher as ReactElement, { onClick: onOpen })}
            </div>

            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}  >
                <ModalContent className="p-3">
                    <ModalHeader className="flex flex-col gap-1">Category Form</ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col gap-4 min-h-[300px]">
                            <Input type="text"
                                name="name"
                                defaultValue={values.name}
                                value={values.name}
                                onChange={(event) => setValues({ ...values, name: event.target.value })}
                                isInvalid={errors.has('name')}
                                errorMessage={errors.get('name')}
                                variant={'underlined'}
                                label="Nombre" />

                            <label className="z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_3.5px)] pe-2 max-w-full text-ellipsis overflow-hidden">Icon</label>

                            <IconPicker
                                value={values.icon}
                                onChange={(icon) => { setValues({ ...values, icon }) }} />

                            <div className="flex flex-row justify-end gap-4 mt-5">

                                {defaultValues.id > 0
                                    && <Button
                                        className="max-w-10"
                                        color="danger"
                                        type="button"
                                        onClick={_deleteCategory} >
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
                                    onClick={_saveCategory} >
                                    Save
                                </Button>
                            </div>
                        </form >
                    </ModalBody>
                </ModalContent>
            </Modal >
        </Fragment>
    )
}