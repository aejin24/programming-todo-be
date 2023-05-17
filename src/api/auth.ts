import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import fetch from "node-fetch";

import { ErrorCode, ErrorMessage } from "constants/errorCode";
import { TGithubRequest, TGithubResponse } from "types/auth";

const authRouter = Router();

authRouter.post(
  "/github",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body as TGithubRequest;

    if (!code || code === "") {
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
            access_token,
            token_type,
          },
        });
      })
      .catch((error) =>
        next({ status: ErrorCode.INTERNAL_SERVER_ERROR, data: error })
      );
  }
);

export default authRouter;
