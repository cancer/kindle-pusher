import { VerifyErrors } from 'jsonwebtoken';
import { AuthToken, AuthTokenError } from './auth-token';

export class InvalidAuthtoken extends AuthToken {
  constructor(private error_: VerifyErrors) {
    super('');
  }

  get isVerified(): false {
    return false;
  }

  get error(): AuthTokenError {
    return {
      ...this.error_,
      type: 'invalid_token',
    };
  }
}
