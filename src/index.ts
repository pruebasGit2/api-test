import express from "express";
import { limits } from "./limitsMiddle";

const app = express();

app.use(limits);

app.get("*", (_, res) => res.send("ok"));

app.listen(3000);