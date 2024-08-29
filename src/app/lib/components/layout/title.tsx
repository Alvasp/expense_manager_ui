import Icon from '@mui/material/Icon';

export type PageTitleProps = {
    title: string,
    icon: string,
}
export default function PageTitle({ title, icon }: PageTitleProps) {
    return (
        <div className="flex mb-3 align-center border-primary border-l-[5px] pl-5">
            <div className='flex justify-center items-center mr-3'>
                <Icon style={{ fontSize: 30 }} >{icon}</Icon>
            </div>
            <h1 className="text-3xl font-extrabold dark:text-white">{title}</h1>

        </div>
    )
}