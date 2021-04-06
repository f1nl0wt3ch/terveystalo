import express, {Request, Response} from "express";
import {CommonConfig} from "../config/CommonConfig";
import {UnitModel} from "../model/UnitModel";
import {findAllUnits} from "../service/UnitService";

const unitRouter = express.Router();
unitRouter.get(CommonConfig.BASE_URL+"/units", (req: Request, res: Response) => {
    findAllUnits((err: Error, unitArr: Array<UnitModel>) => {
        if(err) {
            return res.status(500).json({
                msg: err.message
            });
        }
        res.status(200).json(unitArr);
    })
})

export {unitRouter}
