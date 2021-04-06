import {db} from "../dao/MeasurementDao";
import {RowDataPacket} from "mysql2";
import {IndexModel} from "../model/IndexModel";

export interface IndexServiceInterface {
    findAllIndexes(cb:Function): void
}

export class IndexService implements IndexServiceInterface {
    findAllIndexes(cb: Function): void {
        const queryStr = `SELECT * FROM index_tb`
        db.query(queryStr, (err, rs) => {
            if (err) cb(err)
            const rows = <RowDataPacket[]> rs;
            const indexArr: Array<IndexModel> = [];
            rows.forEach(row => {
                const indexObj: IndexModel = {
                    id: row.id,
                    name: row.name,
                }
                indexArr.push(indexObj)
            })
            cb(null, indexArr)
        })
    }

}

