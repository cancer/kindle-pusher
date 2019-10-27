export const makeErrorResponse = (status: number, error: Error) => {
  return {
    status,
    body: {
      message: error.message,
    },
  };
};