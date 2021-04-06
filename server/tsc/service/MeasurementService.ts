import {MeasurementModel} from "../model/MeasurementModel";
import {db} from "../dao/MeasurementDao";
import {OkPacket, RowDataPacket} from "mysql2";

export interface MeasurementServiceInterface {

    findAllMeasurements(cb: Function): void
    findMeasurementById(id: number, cb: Function): void
    insertMeasurement(measurement: MeasurementModel, cb: Function): void
    updateMeasurementById(measurement: MeasurementModel, cb: Function): void
    deleteMeasurementById(idArr: Array<number>, cb: Function): void

}

export class MeasurementService implements MeasurementServiceInterface {

    findAllMeasurements(cb: Function): void {
        const queryStr = `SELECT m.id AS id,
                             i.id AS index_id,
                             i.name AS index_name,
                             u.id AS unit_id,
                             u.name AS unit_name,
                             m.over  AS over,
                             m.under AS under
                      FROM measurement_tb AS m
                               INNER JOIN index_tb AS i ON m.fk_index_id = i.id
                               INNER JOIN unit_tb AS u ON m.fk_unit_id = u.id 
                               ORDER BY id ASC`
        db.query(queryStr, (err, rs) => {
            if (err) cb(err)
            try {
                const rows = <RowDataPacket[]>rs;
                const measurements: Array<MeasurementModel> = [];
                rows.forEach(row => {
                    const measurement: MeasurementModel = {
                        id: row.id,
                        index: {
                            id: row.index_id,
                            name: row.index_name
                        },
                        unit: {
                            id: row.unit_id,
                            name: row.unit_name
                        },
                        over: row.over,
                        under: row.under
                    }
                    measurements.push(measurement)
                })
                cb(null, measurements)
            } catch (e) {
                cb(null, null)
            }
        })
    }

    findMeasurementById(id: number, cb: Function): void {
        const queryStr = `SELECT i.name  AS index_name,
                             i.id AS index_id,
                             u.name  AS unit_name,
                             u.id AS unit_id,
                             m.over  AS over,
                             m.under AS under
                      FROM measurement_tb AS m
                               INNER JOIN index_tb AS i ON m.fk_index_id = i.id
                               INNER JOIN unit_tb AS u ON m.fk_unit_id = u.id
                      WHERE m.id = ?
                      LIMIT 1`
        db.query(queryStr, id, (err, rs) => {
            if (err) cb(err)
            try {
                const row = (<RowDataPacket[]>rs) [0];
                const measurement = {
                    id: id,
                    index: {
                        id: row.index_id,
                        name: row.index_name
                    },
                    unit: {
                        id: row.unit_id,
                        name: row.unit_name
                    },
                    over: row.over,
                    under: row.under
                }
                cb(null, measurement)
            } catch (e) {
                cb(null, null)
            }
        })
    }

    deleteMeasurementById(idArr: Array<number>, cb: Function): void {
        const queryStr = `DELETE FROM measurement_tb WHERE id IN (?)`
        db.query(queryStr, [idArr], (err, rs) => {
            if (err) cb(err)
            const affectedRows = (<OkPacket> rs).affectedRows;
            cb(null, affectedRows);
        })
    }

    insertMeasurement(measurement: MeasurementModel, cb: Function): void {
        const queryStr = `INSERT INTO measurement_tb (fk_index_id, fk_unit_id, over, under) VALUES (?,?,?,?) `
        db.query(queryStr, [measurement.index.id, measurement.unit.id, measurement.over, measurement.under], (err, rs) => {
            if (err) cb(err)
            const insertId = (<OkPacket> rs).insertId;
            cb(null, insertId);
        })
    }

    updateMeasurementById(measurement: MeasurementModel, cb: Function): void {
        const queryStr = `UPDATE measurement_tb SET fk_index_id = ?, fk_unit_id = ?, under = ?, over = ? WHERE id = ?`
        db.query(queryStr, [measurement.index.id, measurement.unit.id, measurement.under, measurement.over, measurement.id], (err, rs) => {
            if (err) cb(err)
            const changedRows = (<OkPacket> rs).changedRows;
            cb(null, changedRows);
        })
    }

}


