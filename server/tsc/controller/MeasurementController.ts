import express, {Request, Response} from "express";
import {CommonConfig} from "../config/CommonConfig";
import {
    MeasurementService, MeasurementServiceInterface
} from "../service/MeasurementService"
import {MeasurementModel} from "../model/MeasurementModel";

const measurementRouter = express.Router();
const measureServiceInterface: MeasurementServiceInterface = new MeasurementService()

measurementRouter.get(CommonConfig.BASE_URL + "/measurements", async (req: Request, res: Response) => {
    measureServiceInterface.findAllMeasurements((err: Error, measurementArr: Array<MeasurementModel>) => {
        if (err) {
            return res.status(500).json({
                msg: err.message
            });
        } else if (measurementArr == null) {
            res.status(401).json({
                msg: "Not found!"
            })
        } else res.status(200).json(measurementArr);
    })
})

measurementRouter.get(CommonConfig.BASE_URL + "/measurement/:id", async (req: Request, res: Response) => {
    if (isNaN(Number(req.params.id))) {
        res.status(401).json({
            msg: "Bad request!"
        })
    } else {
        const id: number = Number(req.params.id)
        measureServiceInterface.findMeasurementById(id, (err: Error, measurement: MeasurementModel) => {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                });
            } else if (!measurement) {
                res.status(404).json({
                    msg: "Not found!"
                })
            } else res.status(200).json(measurement);
        })
    }
})

measurementRouter.post(CommonConfig.BASE_URL + "/measurement", async (req: Request, res: Response) => {
    const insertedMeasurement = req.body.data as MeasurementModel
    measureServiceInterface.insertMeasurement(insertedMeasurement, (err: Error, insertedId: number) => {
        if (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
        res.status(200).json({msg: insertedId + " was inserted to database!"});
    })
})

measurementRouter.put(CommonConfig.BASE_URL + "/measurement", async (req: Request, res: Response) => {
    const updatedMeasurement = req.body.data as MeasurementModel
    measureServiceInterface.updateMeasurementById(updatedMeasurement, (err: Error, changedRows: number) => {
        if (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
        res.status(200).json(changedRows + " row was updated!");
    })
})

measurementRouter.delete(CommonConfig.BASE_URL + "/measurement", async (req: Request, res: Response) => {
    const deleteIdArr = req.body.data as Array<number>
    measureServiceInterface.deleteMeasurementById(deleteIdArr, (err: Error, affectedRows: number) => {
        if (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
        res.status(200).json(affectedRows + " row was deleted!");
    })
})

export {measurementRouter};

