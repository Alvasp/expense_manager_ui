import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from "@nextui-org/react";
import { Fragment } from "react";



export default function AggregatedDataSkeleton() {

    return (
        <Fragment>
            <div className="mb-3 flex justify-end">
                <Skeleton className="rounded-lg w-[180px]" />
            </div>
            <div className="mb-3 flex justify-end">
                <Skeleton className="rounded-lg w-[180px]">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" >
                                .
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu >
                            <DropdownItem />
                        </DropdownMenu>
                    </Dropdown>
                </Skeleton>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="rounded-lg min-h-[280px]" />
                    <Skeleton className="rounded-lg min-h-[280px]" />
                </div>
            </div>
        </Fragment>

    )
}
