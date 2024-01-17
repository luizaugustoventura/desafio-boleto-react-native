export class CameraPermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CameraPermissionError";
  }
}
