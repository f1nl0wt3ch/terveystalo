"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllIndexes = void 0;
var MeasurementDao_1 = require("../dao/MeasurementDao");
var findAllIndexes = function (cb) {
    var queryStr = "SELECT *\n                      FROM index_tb";
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
exports.findAllIndexes = findAllIndexes;
