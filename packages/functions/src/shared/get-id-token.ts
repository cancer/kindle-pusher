import { parse } from 'cookie';

export const getIdToken = (cookie: string | undefined): string | null => {
  if (typeof cookie === 'undefined') {
    return null;
  }

  const parsed = parse(cookie);
  return parsed.nf_jwt || null;
};
