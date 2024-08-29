import moment from "moment";
import { isDate } from "lodash";
import { IMovement } from "../types/definitions";

export function MovementPlainToClass(movement: IMovement): IMovement {
    const _d1 = isDate(movement.dateStart) ? movement.dateStart : moment((movement.dateStart as string).substring(0, 10), 'YYYY-MM-DD').toDate()
    const _d2 = movement.dateEnd ? isDate(movement.dateEnd) ? movement.dateEnd : moment((movement.dateEnd as string).toString().substring(0, 10), 'YYYY-MM-DD').toDate() : null

    return {
        ...movement,
        dateStart: _d1,
        dateEnd: _d2
    }
}