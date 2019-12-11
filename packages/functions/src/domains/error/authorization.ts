export class AuthorizationError extends Error {
  constructor(msg?: string) {
    super(msg || 'Authorization required.');
  }
}