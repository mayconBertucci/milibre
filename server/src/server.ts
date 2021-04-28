import express from "express";
import cors from "cors";

import './database';
import 'reflect-metadata';

import { routes } from './routes'

const PORT = 3333;
const HOST = '0.0.0.0'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(PORT, HOST, () => console.log(`Server is running on port ${PORT}`));