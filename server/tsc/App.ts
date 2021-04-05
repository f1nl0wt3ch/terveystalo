import express from "express";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();


app.get("/", (req, res) => {
    res.send("Hello from express and typescript");

})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listen on PORT ${port}`));
