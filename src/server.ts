import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "jet-logger";
import { TMiddleWareError } from "types/common";

import { authRouter, planRouter } from "./api";

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

/***********************************************************************************
 *                                     Routes
 **********************************************************************************/
server.use("/api/auth", authRouter);
server.use("/api/plan", planRouter);

/***********************************************************************************
 *                                  Error handling
 **********************************************************************************/
server.use(
  (err: TMiddleWareError, _: Request, res: Response, __: NextFunction) => {
    logger.err(new Error(err.data), true);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
);

export default server;
