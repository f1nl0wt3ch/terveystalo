"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexService = void 0;
var MeasurementDao_1 = require("../dao/MeasurementDao");
var IndexService = /** @class */ (function () {
    function IndexService() {
    }
    IndexService.prototype.findAllIndexes = function (cb) {
        var queryStr = "SELECT * FROM index_tb";
        MeasurementDao_1.db.query(queryStr, function (err, rs) {
            if (err)
                cb(err);
            var rows = rs;
            var indexArr = [];
            rows.forEach(function (row) {
                var indexObj = {
                    id: row.id,
                    name: row.name,
                };
                indexArr.push(indexObj);
            });
            cb(null, indexArr);
        });
    };
    return IndexService;
}());
exports.IndexService = IndexService;
