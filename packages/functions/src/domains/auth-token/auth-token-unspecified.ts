import { AuthToken, AuthTokenError } from './auth-token';

export class AuthTokenUnspecified extends AuthToken {
  constructor() {
    super('');
  }

  get isVerified(): false {
    return false;
  }

  get error(): AuthTokenError {
    return {
      name: 'AuthorizationRequiredError',
      message: 'Authorization required.',
      type: '',
    };
  }
}
