'use client'

import IconPicker from "@/app/_lib/components/iconPicker/iconPicker";
import { IMovementCategory } from "@/app/_lib/types/definitions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Fragment, ReactNode, useEffect, useState } from "react";

export type CategoryAddEditModalProps = {
    launcher: ReactNode,
    defaultValues: IMovementCategory
}
type FormErrors = Map<string, string>;

export default function CategoryAddEditModal({ launcher, defaultValues }: CategoryAddEditModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    return (
        <Fragment>
            <div onClick={onOpen}>
                {launcher}
            </div>

            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}  >
                <ModalContent className="p-3">
                    <ModalHeader className="flex flex-col gap-1">Categoría</ModalHeader>
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
                                    && <Button className="max-w-10" color="danger" type="button" >
                                        Delete
                                    </Button>}
                                <Button className="max-w-10" color="secondary" type="button" >
                                    Cancel
                                </Button>
                                <Button className="max-w-10" color="primary" type="button" >
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