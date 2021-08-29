import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

import registerRoutes from "./routes";
registerRoutes(app);

import { routeNotFound, errorHandler } from "./middlewares";
app.use(routeNotFound);
app.use(errorHandler);

import "./database";

export default app;
