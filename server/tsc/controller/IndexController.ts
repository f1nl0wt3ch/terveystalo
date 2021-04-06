import express, {Request, Response} from "express";
import {CommonConfig} from "../config/CommonConfig";
import {findAllIndexes} from "../service/IndexService"
import {IndexModel} from "../model/IndexModel";

const indexRouter = express.Router();
indexRouter.get(CommonConfig.BASE_URL+"/indexes", (req: Request, res: Response) => {
    findAllIndexes((err: Error, indexArr: Array<IndexModel>) => {
        if(err) {
            return res.status(500).json({
                msg: err.message
            });
        }
        res.status(200).json(indexArr);
    })
})

export {indexRouter}
