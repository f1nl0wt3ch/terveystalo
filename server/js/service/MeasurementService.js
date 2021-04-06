"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementService = void 0;
var MeasurementDao_1 = require("../dao/MeasurementDao");
var MeasurementService = /** @class */ (function () {
    function MeasurementService() {
    }
    MeasurementService.prototype.findAllMeasurements = function (cb) {
        var queryStr = "SELECT m.id AS id,\n                             i.id AS index_id,\n                             i.name AS index_name,\n                             u.id AS unit_id,\n                             u.name AS unit_name,\n                             m.over  AS over,\n                             m.under AS under\n                      FROM measurement_tb AS m\n                               INNER JOIN index_tb AS i ON m.fk_index_id = i.id\n                               INNER JOIN unit_tb AS u ON m.fk_unit_id = u.id \n                               ORDER BY id ASC";
        MeasurementDao_1.db.query(queryStr, function (err, rs) {
            if (err)
                cb(err);
            try {
                var rows = rs;
                var measurements_1 = [];
                rows.forEach(function (row) {
                    var measurement = {
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
                    };
                    measurements_1.push(measurement);
                });
                cb(null, measurements_1);
            }
            catch (e) {
                cb(null, null);
            }
        });
    };
    MeasurementService.prototype.findMeasurementById = function (id, cb) {
        var queryStr = "SELECT i.name  AS index_name,\n                             i.id AS index_id,\n                             u.name  AS unit_name,\n                             u.id AS unit_id,\n                             m.over  AS over,\n                             m.under AS under\n                      FROM measurement_tb AS m\n                               INNER JOIN index_tb AS i ON m.fk_index_id = i.id\n                               INNER JOIN unit_tb AS u ON m.fk_unit_id = u.id\n                      WHERE m.id = ?\n                      LIMIT 1";
        MeasurementDao_1.db.query(queryStr, id, function (err, rs) {
            if (err)
                cb(err);
            try {
                var row = rs[0];
                var measurement = {
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
                };
                cb(null, measurement);
            }
            catch (e) {
                cb(null, null);
            }
        });
    };
    MeasurementService.prototype.deleteMeasurementById = function (idArr, cb) {
        var queryStr = "DELETE FROM measurement_tb WHERE id IN (?)";
        MeasurementDao_1.db.query(queryStr, [idArr], function (err, rs) {
            if (err)
                cb(err);
            var affectedRows = rs.affectedRows;
            cb(null, affectedRows);
        });
    };
    MeasurementService.prototype.insertMeasurement = function (measurement, cb) {
        var queryStr = "INSERT INTO measurement_tb (fk_index_id, fk_unit_id, over, under) VALUES (?,?,?,?) ";
        MeasurementDao_1.db.query(queryStr, [measurement.index.id, measurement.unit.id, measurement.over, measurement.under], function (err, rs) {
            if (err)
                cb(err);
            var insertId = rs.insertId;
            cb(null, insertId);
        });
    };
    MeasurementService.prototype.updateMeasurementById = function (measurement, cb) {
        var queryStr = "UPDATE measurement_tb SET fk_index_id = ?, fk_unit_id = ?, under = ?, over = ? WHERE id = ?";
        MeasurementDao_1.db.query(queryStr, [measurement.index.id, measurement.unit.id, measurement.under, measurement.over, measurement.id], function (err, rs) {
            if (err)
                cb(err);
            var changedRows = rs.changedRows;
            cb(null, changedRows);
        });
    };
    return MeasurementService;
}());
exports.MeasurementService = MeasurementService;
