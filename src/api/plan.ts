import { NextFunction, Request, Response, Router } from "express";
import { Op, where, col, fn } from "sequelize";
import { StatusCodes } from "http-status-codes";

import DB from "models/index";
import { ErrorCode, ErrorMessage } from "constants/errorCode";
import { TPlan, TPlanWriteRequest } from "types/plan";

const planRouter = Router();

/**
 * @description 할 일 조회
 */
planRouter.get(
  "/:member_id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { member_id } = req.params;
    const { year, month } = req.query;

    if (!member_id) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      const historyList = await DB.plan.findAll({
        where: {
          [Op.and]: [
            where(fn("year", col("register_date")), year),
            where(fn("month", col("register_date")), month),
            { member_id },
          ],
        },
      });

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: historyList,
      });
    } catch (error) {
      next({ status: ErrorCode.INTERNAL_SERVER_ERROR, data: error });
    }
  }
);

/**
 * @description 할 일 생성
 */
planRouter.post(
  "/write",
  async (req: Request, res: Response, next: NextFunction) => {
    const { content, member_id, register_date, repository } =
      req.body as TPlanWriteRequest;

    if (!content || !member_id || !register_date || !repository) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      await DB.plan.create({
        content,
        repository,
        register_date,
        status: 0,
        member_id,
      });

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: { result: true },
      });
    } catch (error) {
      next({ status: ErrorCode.ERR_INSERT_DATA_FAIL, data: error });
    }
  }
);

/**
 * @description 할 일 업데이트
 */
planRouter.post(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, content, member_id, register_date, status, repository } =
      req.body as TPlan;

    if (
      !id ||
      !content ||
      !member_id ||
      !register_date ||
      status === undefined ||
      !repository
    ) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      await DB.plan.update(
        {
          content,
          repository,
          register_date,
          status,
        },
        { where: { id, member_id } }
      );

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: { result: true },
      });
    } catch (error) {
      next({ status: ErrorCode.ERR_UPDATE_DATA_FAIL, data: error });
    }
  }
);

/**
 * @description 할 일 삭제
 */
planRouter.post(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      await DB.plan.destroy({ where: { id } });

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: { result: true },
      });
    } catch (error) {
      next({ status: ErrorCode.ERR_DELETE_DATA_FAIL, data: error });
    }
  }
);

/**
 * @description 할 일 개수 카운팅
 */
planRouter.get(
  "/count/:member_id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { member_id } = req.params;

    if (!member_id) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      const all = await DB.plan.count({ where: { member_id } });
      const upcoming = await DB.plan.count({
        where: { register_date: { [Op.gt]: new Date() } },
      });
      const progressing = await DB.plan.count({
        where: { member_id, status: 0 },
      });
      const completed = await DB.plan.count({
        where: { member_id, status: 1 },
      });

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: { all, upcoming, progressing, completed },
      });
    } catch (error) {
      next({ status: ErrorCode.INTERNAL_SERVER_ERROR, data: error });
    }
  }
);

export default planRouter;
