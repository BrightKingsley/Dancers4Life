export function customErrorResponse(error: any) {
  return error.code && error.code === 11000
    ? `duplicate key error ${Object.keys(error.keyValue)[0]}:${
        Object.values(error.keyValue)[0]
      }`
    : "An error occured on the server";
}
