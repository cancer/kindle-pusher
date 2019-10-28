export const makeErrorResponse = (status: number, error: Error) => {
  return {
    statusCode: status,
    body: {
      message: error.message,
    },
  };
};