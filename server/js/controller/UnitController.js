"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitRouter = void 0;
var express_1 = __importDefault(require("express"));
var CommonConfig_1 = require("../config/CommonConfig");
var UnitService_1 = require("../service/UnitService");
var unitRouter = express_1.default.Router();
exports.unitRouter = unitRouter;
unitRouter.get(CommonConfig_1.CommonConfig.BASE_URL + "/units", function (req, res) {
    UnitService_1.findAllUnits(function (err, unitArr) {
        if (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
        res.status(200).json(unitArr);
    });
});
