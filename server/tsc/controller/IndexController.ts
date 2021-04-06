import express, {Request, Response} from "express";
import {CommonConfig} from "../config/CommonConfig";
import {IndexModel} from "../model/IndexModel";
import {IndexService, IndexServiceInterface} from "../service/IndexService";

const indexRouter = express.Router();
const indexService: IndexServiceInterface = new IndexService()
indexRouter.get(CommonConfig.BASE_URL+"/indexes", (req: Request, res: Response) => {
    indexService.findAllIndexes((err: Error, indexArr: Array<IndexModel>) => {
        if(err) {
            return res.status(500).json({
                msg: err.message
            });
        }
        res.status(200).json(indexArr);
    })
})

export {indexRouter}
