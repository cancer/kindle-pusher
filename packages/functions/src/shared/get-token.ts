export const getToken = (authorization: string | undefined): string | null => {
  if (typeof authorization === 'undefined') {
    return null;
  }

  const parsed = authorization.replace('bearer ', '').trim();
  return parsed || null;
};
