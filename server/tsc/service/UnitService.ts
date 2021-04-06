import {db} from "../dao/MeasurementDao";
import {RowDataPacket} from "mysql2";
import {UnitModel} from "../model/UnitModel";

export const findAllUnits = (cb: Function) => {
    const queryStr = `SELECT *
                      FROM unit_tb`
    db.query(queryStr, (err, rs) => {
        if (err) cb(err)
        const rows = <RowDataPacket[]> rs;
        const unitArr: Array<UnitModel> = [];
        rows.forEach(row => {
            const unitObj: UnitModel = {
                id: row.id,
                name: row.name,
            }
            unitArr.push(unitObj)
        })
        cb(null, unitArr)
    })
}

