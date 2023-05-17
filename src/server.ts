import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "jet-logger";
import { TMiddleWareError } from "types/common";

import { authRouter } from "./api";

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

/***********************************************************************************
 *                                     Routes
 **********************************************************************************/
server.use("/api/auth", authRouter);

/***********************************************************************************
 *                                  Error handling
 **********************************************************************************/
server.use(
  (err: TMiddleWareError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err.data, true);

    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
);

export default server;
