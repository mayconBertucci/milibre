import express from "express";
import cors from "cors";

import './database';
import 'reflect-metadata';
import 'dotenv/config';

import { routes } from './routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(Number(process.env.PORT), process.env.HOST, () => console.log(`Server is running on port ${process.env.PORT}`));