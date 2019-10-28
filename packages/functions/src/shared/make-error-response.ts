export const makeErrorResponse = (status: number, error: Error) => {
  return {
    statusCode: status,
    body: JSON.stringify({
      message: error.message,
    }),
  };
};