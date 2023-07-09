export default class VerifyTokenError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'VerifyUserTokenError';
    this.data = data;
  }
}
