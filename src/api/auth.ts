import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import fetch from "node-fetch";

import { ErrorCode, ErrorMessage } from "constants/errorCode";
import { TMember, TGithubRequest, TGithubResponse } from "types/auth";
import DB from "models/index";

const authRouter = Router();

authRouter.post(
  "/github",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body as TGithubRequest;

    if (!code) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code,
        client_id: process.env.GITHUB_CLIENT_ID || "",
        client_secret: process.env.GITHUB_CLIENT_SECRET_KEY || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const {
          error,
          error_description,
          access_token,
          token_type,
        }: TGithubResponse = data;

        if (error && error_description) {
          next({
            status:
              ErrorCode[`ERR_${error.toUpperCase()}` as keyof typeof ErrorCode],
            data: ErrorMessage[
              ErrorCode[`ERR_${error.toUpperCase()}` as keyof typeof ErrorCode]
            ],
          });

          return;
        }

        return res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          data: {
            token: access_token,
            tokenType: token_type,
          },
        });
      })
      .catch((error) =>
        next({ status: ErrorCode.INTERNAL_SERVER_ERROR, data: error })
      );
  }
);

authRouter.post(
  "/history",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, email, name, repository } = req.body as TMember;

    if (!id || !email || !name || !repository) {
      next({
        status: ErrorCode.INVALID_ARGUMENT,
        data: ErrorMessage[ErrorCode.INVALID_ARGUMENT],
      });
    }

    try {
      const chkId = await DB.member.findOne({ where: { id } });
      // 아이디가 없다면 멤버 테이블에 정보 넣기
      if (chkId === null) {
        await DB.member.create({
          id,
          email,
          name,
          repository,
        });
      }

      // TO-BE: 정보 조회

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: {
          list: ["something"],
        },
      });
    } catch (error) {
      next({ status: ErrorCode.INTERNAL_SERVER_ERROR, data: error });
    }
  }
);

export default authRouter;
