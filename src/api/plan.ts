import { NextFunction, Request, Response, Router } from "express";
import { Op, where, col, fn } from "sequelize";
import { StatusCodes } from "http-status-codes";

import DB from "models/index";
import { ErrorCode, ErrorMessage } from "constants/errorCode";
import { TPlanWriteRequest } from "types/plan";

const planRouter = Router();

/**
 * @description 할 일 조회
 */
planRouter.get(
  "/:memberId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId } = req.params;
    const { year, month } = req.query;

    if (!memberId) {
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
            { member_id: memberId },
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

export default planRouter;
