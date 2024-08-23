import { Button } from "@nextui-org/react"

type FormActionConfirmationProps = {
    onCancel: () => void,
    onSelect: (value: 'single' | 'multiple') => void,
}

export default function FormActionConfirmation({ onCancel, onSelect }: FormActionConfirmationProps) {
    return (
        <div className="flex justify-center flex-col gap-4">
            <Button onClick={() => { onSelect('single') }}>Sólo esta ocurrencia</Button>
            <Button onClick={() => { onSelect('multiple') }}>Todas las ocurrencias</Button>
            <Button onClick={onCancel} variant="bordered">Cancelar</Button>
        </div>
    )
}