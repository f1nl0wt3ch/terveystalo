import mysql from "mysql2";
import {DatabaseConfig} from "../config/DatabaseConfig";

export const db = mysql.createConnection({
    host: DatabaseConfig.HOST,
    user: DatabaseConfig.USER,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.DATABASE
})
