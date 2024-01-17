export class InvalidPaymentCodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidPaymentCodeError";
  }
}
