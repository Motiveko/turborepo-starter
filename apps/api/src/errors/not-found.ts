export class NotFoundError extends Error {
  public status: number;
  constructor(message = "Not Found") {
    super(message);
    this.status = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
