import { ErrorCode, ErrorMessage } from "constants/errorCode";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import DB from "models/index";

const planRouter = Router();

/**
 * @description 일정 조회
 */
planRouter.post(
  "/history",
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId } = req.body as { memberId: number };

    if (!memberId) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      const historyList = await DB.plan.findAll({
        where: { member_id: memberId },
      });

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: {
          list: historyList,
        },
      });
    } catch (error) {
      next({ status: ErrorCode.INTERNAL_SERVER_ERROR, data: error });
    }
  }
);
export default planRouter;
