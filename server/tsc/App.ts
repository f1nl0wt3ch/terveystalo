import express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import {measurementRouter} from "./controller/MeasurementController";
import {indexRouter} from "./controller/IndexController";
import {unitRouter} from "./controller/UnitController";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(measurementRouter, indexRouter, unitRouter);

app.get("/", (req, res) => {
    res.send("Hello from express and typescript");

})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listen on PORT ${port}`));
