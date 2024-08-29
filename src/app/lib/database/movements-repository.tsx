import { accounts, categories, movement_types, movements } from "@prisma/client";
import moment from "moment";
import { CategoryIconEnum, IAccount, IAccountBalance, IMovement, IMovementCategory, IMovementType } from "../types/definitions";
import prisma from "./client";

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

    const start = _moment.startOf('month').toDate();
    const end = _moment.endOf('month').toDate();

    console.log('fetching movements from db', { year, month }, { start: start, end: end })

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
                    },
                    date_end:{
                        lte: end
                    }
                },
                {
                    recurrent: true,
                    date_start: {
                        lte: end
                    },
                    OR: [
                        {
                            date_end: {
                                equals: null
                            }
                        },
                        {
                            date_end: { gte: start }
                        }
                    ],
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
            },
            accounts: true
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
    const { amount, category, dateEnd, dateStart, recurrent, title, account } = movement

    const insert = await prisma.movements.create({
        data: {
            amount,
            date_start: dateStart,
            date_end: dateEnd,
            recurrent: recurrent,
            category: category.id,
            name: title,
            account_id: account.id
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
    const { amount, category, dateEnd, dateStart, recurrent, title, account } = movement

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
            name: title,
            account_id: account.id
        }
    })
}

export async function fetchCategories(): Promise<IMovementCategory[]> {
    const categories = await prisma.categories.findMany({
        where: {
            //  system: false
        },
        include: {
            movement_types: true
        }
    })

    return categories.map(el => mapCategory(el))
}

export async function saveCategory(category: IMovementCategory): Promise<IMovementCategory> {
    const { id, icon, name, type } = category

    const result = await prisma.categories.create({
        data: {
            icon,
            name,
            type: type.id,
            system: false
        }
    })

    return { ...category, id: result.id }
}

export async function updateCategory(category: IMovementCategory): Promise<void> {
    const { id, icon, name, type } = category

    await prisma.categories.update({
        where: {
            id
        },
        data: {
            icon,
            name,
            type: type.id
        }
    })
}

export async function deleteCategory(id: number): Promise<void> {
    const cat = await prisma.categories.findFirst({ where: { id } })

    const unAssigned = await prisma.categories.findFirstOrThrow({
        where: {
            AND: {
                system: true,
                type: cat?.type
            }
        }
    })

    await prisma.$transaction([
        prisma.movements.updateMany({
            where: {
                category: id
            },
            data: {
                category: unAssigned.id
            }
        }),
        prisma.categories.delete({
            where: {
                id
            }
        })
    ])
}

export async function saveAccount(account: IAccount): Promise<IAccount> {
    const { name } = account

    const result = await prisma.accounts.create({
        data: {
            name,
            system: false
        }
    })

    return { ...account, id: result.id }
}

export async function updateAccount(account: IAccount): Promise<void> {
    const { id, name } = account

    await prisma.accounts.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}

export async function deleteAccount(id: number): Promise<void> {
    const defaultAccount = await prisma.accounts.findFirstOrThrow({ where: { system: true } })

    await prisma.$transaction([
        prisma.movements.updateMany({
            where: {
                account_id: id
            },
            data: {
                category: defaultAccount.id
            }
        }),

        prisma.accounts.delete({
            where: {
                id
            }
        })
    ])
}

export async function fetchMovementTypes(): Promise<IMovementType[]> {
    const types = await prisma.movement_types.findMany()
    return types.map(el => mapMovementType(el))
}

export async function fetchAccountsWithBalance(): Promise<IAccountBalance[]> {
    const categories = await prisma.categories.findMany();

    const aggregateSumAmount = async (typeId: number): Promise<Map<number, number>> => {
        const data = await prisma.movements
            .groupBy(
                {
                    by: ['account_id'],
                    _sum: { amount: true },
                    where: {
                        category:
                            { in: categories.filter(el => el.type === typeId).map(el => el.id) }
                    }
                });

        const out = new Map<number, number>();
        data.forEach(el => out.set(el.account_id, el._sum.amount || 0))
        return out;
    }

    const incomesMap = await aggregateSumAmount(1);
    const expensesMap = await aggregateSumAmount(2);

    const accounts = await prisma.accounts.findMany({ where: { system: false }, })

    return accounts.map(el => {
        const income = incomesMap.get(el.id) ?? 0
        const expenses = expensesMap.get(el.id) ?? 0;

        return {
            account: mapAccount(el),
            balance: income - expenses
        }
    });
}

function mapMovementType(prismaMovementType: movement_types): IMovementType {
    const { id, name } = prismaMovementType

    return {
        id,
        name
    }
}

type AccountType = accounts
function mapAccount(prismaAccount: AccountType): IAccount {
    const { id, name } = prismaAccount

    return {
        id,
        name: name!
    }
}

type CategoryWithMovementType = categories & { movement_types: movement_types }
function mapCategory(prismaCategory: CategoryWithMovementType): IMovementCategory {
    const { id, name, icon, movement_types, system } = prismaCategory

    return {
        id: id,
        name: name,
        icon: icon as CategoryIconEnum,
        type: mapMovementType(movement_types),
        system
    }
}

type MovementWithCategoryAndMovementType = movements & { categories: CategoryWithMovementType } & { accounts: AccountType }
export function mapMovement(prismaMovement: MovementWithCategoryAndMovementType): IMovement {
    const { id, amount, name, date_start, date_end, recurrent, categories, accounts } = prismaMovement

    return {
        id: id,
        amount: amount,
        title: name,
        dateStart: date_start,
        dateEnd: date_end,
        recurrent: recurrent,
        account: mapAccount(accounts),
        category: mapCategory(categories)
    }
}