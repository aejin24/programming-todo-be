import { NextFunction, Request, Response, Router } from "express";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";

import DB from "models/index";
import { ErrorCode, ErrorMessage } from "constants/errorCode";

const dashboardRouter = Router();

/**
 * @description 할 일 개수 카운팅
 */
dashboardRouter.get(
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

export default dashboardRouter;
