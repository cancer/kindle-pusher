export interface Payload {
  at_hash?: string;
  aud?: string;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  family_name?: string;
  given_name?: string;
  iss?: string;
  locale?: string;
  name?: string;
  nickname?: string;
  nonce?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
}

export const isStructured = (jwt: Payload | string): jwt is Payload => {
  return typeof jwt !== 'string';
};
