"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUnits = void 0;
var MeasurementDao_1 = require("../dao/MeasurementDao");
var findAllUnits = function (cb) {
    var queryStr = "SELECT *\n                      FROM unit_tb";
    MeasurementDao_1.db.query(queryStr, function (err, rs) {
        if (err)
            cb(err);
        var rows = rs;
        var unitArr = [];
        rows.forEach(function (row) {
            var unitObj = {
                id: row.id,
                name: row.name,
            };
            unitArr.push(unitObj);
        });
        cb(null, unitArr);
    });
};
exports.findAllUnits = findAllUnits;
