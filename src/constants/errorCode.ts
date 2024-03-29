enum ErrorCode {
  // common
  INVALID_ARGUMENT = 400,
  UNAUTHORIZED = 401,
  RESOURCE_NOT_FOUND = 404,
  UNSUPPORTED_HTTPVERB = 405,
  INTERNAL_SERVER_ERROR = 500,

  // github
  ERR_BAD_VERIFICATION_CODE = 1000,

  // mysql
  ERR_INSERT_DATA_FAIL = 2000,
  ERR_UPDATE_DATA_FAIL = 2001,
  ERR_DELETE_DATA_FAIL = 2002,
}

const ErrorMessage: Record<number, string> = {
  // common
  [ErrorCode.INVALID_ARGUMENT]: "유효하지 않은 요청입니다.",
  [ErrorCode.UNAUTHORIZED]: "접근 권한이 없습니다.",
  [ErrorCode.RESOURCE_NOT_FOUND]: "유효하지 않는 경로입니다.",
  [ErrorCode.UNSUPPORTED_HTTPVERB]: "지원하지 않는 요청입니다.",
  [ErrorCode.INTERNAL_SERVER_ERROR]: "서버에 문제가 발생했습니다.",

  // github
  [ErrorCode.ERR_BAD_VERIFICATION_CODE]: "code 정보가 유효하지 않습니다.",

  // mysql
  [ErrorCode.ERR_INSERT_DATA_FAIL]: "신규 데이터 삽입 실패",
  [ErrorCode.ERR_UPDATE_DATA_FAIL]: "데이터 업데이트 실패",
  [ErrorCode.ERR_DELETE_DATA_FAIL]: "데이터 삭제 실패",
};

export { ErrorCode, ErrorMessage };
