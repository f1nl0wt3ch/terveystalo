"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
var express_1 = __importDefault(require("express"));
var CommonConfig_1 = require("../config/CommonConfig");
var IndexService_1 = require("../service/IndexService");
var indexRouter = express_1.default.Router();
exports.indexRouter = indexRouter;
var indexService = new IndexService_1.IndexService();
indexRouter.get(CommonConfig_1.CommonConfig.BASE_URL + "/indexes", function (req, res) {
    indexService.findAllIndexes(function (err, indexArr) {
        if (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
        res.status(200).json(indexArr);
    });
});
