import { CategoryIconEnum, IMovement, IMovementCategory, IMovementType } from "../types/definitions";
import moment from "moment";
import prisma from "./client";
import { categories, movement_types, movements } from "@prisma/client";

export type fetchMovementsArgs = {
    year: number,
    month: number
}

export type fetchMovementResp = {
    incomes: IMovement[],
    expenses: IMovement[]
}

export async function fetchMovements(year: number, month: number): Promise<fetchMovementResp> {
    const _moment = moment(`${year}-${month}`, 'YYYY-MM')

    const end = _moment.endOf('month').toDate();
    const start = _moment.startOf('month').toDate();

    const exceptions = await prisma.movement_exceptions.findMany({
        where: {
            date_start: {
                gte: start,
                lte: end
            },
        },
        select: {
            movement_id: true
        }
    })

    const movements = await prisma.movements.findMany({
        where: {
            OR: [
                {
                    recurrent: false,
                    date_start: {
                        gte: start
                    }
                },
                {
                    recurrent: true,
                    date_start: {
                        lte: start
                    },
                    date_end: {
                        equals: null,
                        gte: start
                    },
                    id: {
                        notIn: exceptions.map(el => el.movement_id)
                    }
                }
            ]
        },
        include: {
            categories: {
                include: {
                    movement_types: true
                }
            }
        }
    })

    let incomes: IMovement[] = [], expenses: IMovement[] = [];

    movements.forEach(el => {
        const _mov = mapMovement(el)
        if (_mov.category.type.id === 1) {
            incomes.push(_mov);
        } else {
            expenses.push(_mov)
        }
    });

    return { expenses, incomes }
}

export async function addMovement(movement: IMovement): Promise<IMovement> {
    const { amount, category, dateEnd, dateStart, recurrent, title } = movement

    const insert = await prisma.movements.create({
        data: {
            amount,
            date_start: dateStart,
            date_end: dateEnd,
            recurrent: recurrent,
            category: category.id,
            name: title
        }
    })

    return { ...movement, id: insert.id }
}


export async function addMovementException(movementId: number, forDate: Date): Promise<void> {
    await prisma.movement_exceptions.create({
        data: {
            movement_id: movementId,
            date_start: forDate
        }
    })
}

export async function deleteMovement(id: number): Promise<void> {
    await prisma.movements.delete({ where: { id } })
}

export async function updateMovement(movement: IMovement): Promise<void> {
    const { amount, category, dateEnd, dateStart, recurrent, title } = movement

    await prisma.movements.update({
        where: {
            id: movement.id
        },
        data: {
            amount,
            date_start: dateStart,
            date_end: dateEnd,
            recurrent: recurrent,
            category: category.id,
            name: title
        }
    })
}

export async function fetchCategories(): Promise<IMovementCategory[]> {
    const categories = await prisma.categories.findMany({
        include: {
            movement_types: true
        }
    })

    return categories.map(el => mapCategory(el))
}

export async function fetchMovementTypes(): Promise<IMovementType[]> {
    const types = await prisma.movement_types.findMany()
    return types.map(el => mapMovementType(el))
}

function mapMovementType(prismaMovementType: movement_types): IMovementType {
    const { id, name } = prismaMovementType

    return {
        id,
        name
    }
}

type CategoryWithMovementType = categories & { movement_types: movement_types }
function mapCategory(prismaCategory: CategoryWithMovementType): IMovementCategory {
    const { id, name, icon, movement_types } = prismaCategory

    return {
        id: id,
        name: name,
        icon: icon as CategoryIconEnum,
        type: mapMovementType(movement_types)
    }
}

type MovementWithCategoryAndMovementType = movements & { categories: CategoryWithMovementType }
export function mapMovement(prismaMovement: MovementWithCategoryAndMovementType): IMovement {
    const { id, amount, name, date_start, date_end, recurrent, categories } = prismaMovement

    return {
        id: id,
        amount: amount,
        title: name,
        dateStart: date_start,
        dateEnd: date_end,
        recurrent: recurrent,
        category: mapCategory(categories)
    }
}