'use client'

import { z } from "zod";
import { useEffect, useState } from "react";
import { Button, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { CategoryIconEnum, IMovement, IMovementType, IMovementCategory, IAccount } from "@/app/lib/types/definitions";

const recurrentOptions = [{ label: 'yes', value: true }, { label: 'no', value: false }]

const requiredAndTypeError = {
    required_error: 'El campo es requerido',
    invalid_type_error: 'El tipo de dato ingresado es inválido'
}

const schemaValidation = z.object({
    title: z.string(requiredAndTypeError).min(3, {
        message: 'Debe ingresar un nombre de largo al menos 3 caracteres'
    }),
    amount: z.number(requiredAndTypeError).gt(0, {
        message: 'Debe seleccionar un monto mayor a 0'
    }),
    category: z.object({
        id: z.number(requiredAndTypeError).gt(0, {
            message: 'Debe seleccionar una categoría'
        }),
        type: z.object({
            id: z.number(requiredAndTypeError).gt(0, {
                message: 'Debe seleccionar un tipo movimiento'
            })
        })
    }),
    account: z.object({
        id: z.number(requiredAndTypeError).gt(0, {
            message: 'Debe seleccionar una cuenta'
        })
    }),
    recurrent: z.boolean(requiredAndTypeError),
    dateStart: z.coerce.date(requiredAndTypeError),
    dateEnd: z.coerce.date(requiredAndTypeError).nullable(),
});

type IconDefinition = {
    icon: CategoryIconEnum,
    color: string
}

type FormErrors = Map<string, string>;

export type FormActions = {
    onSave: (movement: IMovement) => Promise<void>,
    onDelete: (movement: IMovement) => Promise<void>,
    onCancel: () => void
}

export type CreateMovementProps = {
    movementTypes: IMovementType[],
    categories: IMovementCategory[],
    accounts: IAccount[],
    actions: FormActions,
    defaultValues: IMovement
}

export default function MovementForm({ movementTypes, categories, accounts, actions, defaultValues }: CreateMovementProps) {
    const [errors, setErrors] = useState<FormErrors>(new Map<string, string>());
    const [values, setValues] = useState<IMovement>(defaultValues);

    useEffect(() => {
        setErrors(new Map())
        setValues(defaultValues)
    }, [
        JSON.stringify(defaultValues)
    ])

    const handleSave = async () => {
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

        await actions.onSave(values)
    }

    const handleDelete = async () => {
        await actions.onDelete(values)
    }

    const defaultStart = values.dateStart ? parseAbsoluteToLocal(new Date(values.dateStart).toISOString()) : null;
    const defaultEnd = values.dateEnd ? parseAbsoluteToLocal(new Date(values.dateEnd).toISOString()) : null

    return (
        <form className="flex flex-col justify-center gap-4 min-h-[300px]">
            <Input type="text"
                name="title"
                value={values.title}
                onChange={(event) => setValues({ ...values, title: event.target.value })}
                isInvalid={errors.has('title')}
                errorMessage={errors.get('title')}
                variant={'underlined'}
                label="Nombre" />

            <Input type="number"
                name="amount"
                value={values.amount.toString()}
                onChange={(event) => setValues({ ...values, amount: +event.target.value })}
                variant={'underlined'}
                label="Amount"
                isInvalid={errors.has('amount')}
                errorMessage={errors.get('amount')} />

            <Select
                name="type"
                disallowEmptySelection
                value={values.category.type.id.toString()}
                defaultSelectedKeys={[values.category.type.id.toString()]}
                onChange={(event) => {
                    const nextValue = event.target.value;
                    if (nextValue) {
                        const cat = categories.find(el => el.type.id === +nextValue)!
                        setValues({ ...values, category: cat })
                    }
                }}
                variant="underlined"
                label="Type"
                isInvalid={errors.has('movementType')}
                errorMessage={errors.get('movementType')}>
                {movementTypes.map(el => <SelectItem key={el.id.toString()}>
                    {el.name}
                </SelectItem>)}
            </Select>

            <Select
                key={`category_select_${values.category.id}`}
                disallowEmptySelection
                name="category"
                variant="underlined"
                label="Category"
                isInvalid={errors.has('category')}
                errorMessage={errors.get('category')}
                value={values.category.id}
                defaultSelectedKeys={[values.category.id.toString()]}
                onChange={(event) => {
                    const cat = categories.find(el => el.id === +event.target.value)!
                    setValues({ ...values, category: { ...cat } })
                }} >
                {categories.filter(el => el.type.id === values.category.type.id).map(el => <SelectItem key={el.id.toString()}>
                    {el.name}
                </SelectItem>)}
            </Select>

            <Select
                key={`account_select_${values.account.id}`}
                disallowEmptySelection
                name="account"
                variant="underlined"
                label="Account"
                isInvalid={errors.has('account')}
                errorMessage={errors.get('account')}
                value={values.account.id}
                defaultSelectedKeys={[values.account.id.toString()]}
                onChange={(event) => {
                    const cat = accounts.find(el => el.id === +event.target.value)!
                    setValues({ ...values, account: { ...cat } })
                }} >
                {accounts.map(el => <SelectItem key={el.id.toString()}>
                    {el.name}
                </SelectItem>)}
            </Select>

            <Select
                name="recurrent"
                variant="underlined"
                label="Recurrente"
                disallowEmptySelection
                defaultSelectedKeys={[values.recurrent + '']}
                value={values.recurrent + ''}
                onChange={(event) => {
                    const isTrue = event.target.value === 'true';
                    setValues({ ...values, recurrent: isTrue, dateEnd: isTrue ? values.dateEnd : values.dateStart })
                }}
                isInvalid={errors.has('recurrent')}
                errorMessage={errors.get('recurrent')}>
                {recurrentOptions.map(el => <SelectItem key={el.value + ''}>
                    {el.label}
                </SelectItem>
                )}
            </Select>
            <DatePicker
                showMonthAndYearPickers
                name="dateStart"
                defaultValue={defaultStart}
                value={defaultStart ? parseAbsoluteToLocal(defaultStart.toDate().toISOString()) : null}
                onChange={(val) => {
                    setValues({ ...values, dateStart: val.toDate(), dateEnd: values.recurrent ? values.dateEnd : val.toDate() })
                }}
                granularity={'day'}
                label={"Date Start"}
                variant={'underlined'}

                isInvalid={errors.has('dateStart')}
                errorMessage={errors.get('dateStart')} />
            {
                values.recurrent &&
                <DatePicker
                    showMonthAndYearPickers
                    name="defaultEnd"
                    defaultValue={defaultEnd}
                    value={defaultEnd ? parseAbsoluteToLocal(defaultEnd.toDate().toISOString()) : null}
                    onChange={(val) => {
                        setValues({ ...values, dateEnd: val.toDate() })
                    }}
                    granularity={'day'}
                    label={"Date End"}
                    variant={'underlined'}
                    isInvalid={errors.has('dateEnd')}
                    errorMessage={errors.get('dateEnd')} />
            }

            <div className="flex flex-row justify-end gap-4 mt-5">

                <Button className="max-w-10" color="secondary" onClick={actions.onCancel}>
                    Cancel
                </Button>
                {
                    defaultValues.id > 0 &&
                    <Button className="max-w-10" color="danger" type="button" onClick={handleDelete}>
                        Delete
                    </Button>
                }

                <Button className="max-w-10" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </form >
    )
}

