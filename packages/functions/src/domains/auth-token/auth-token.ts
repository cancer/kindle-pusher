import { Payload, isStructured } from './payload';

export interface AuthTokenError extends Error {
  type: string;
}

export class AuthToken {
  constructor(private payload: Payload | string) {}

  get isVerified(): boolean {
    return true;
  }

  get id(): string {
    if (!isStructured(this.payload)) {
      return '';
    }

    return this.payload.sub || '';
  }

  get error(): AuthTokenError {
    return {
      name: '',
      message: '',
      type: '',
    };
  }
}
