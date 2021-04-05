import {UnitModel} from "./UnitModel";
import {IndexModel} from "./IndexModel";

export interface MeasurementModel {
     id: number
     index: IndexModel
     unit: UnitModel
     under: number
     over: number
}
