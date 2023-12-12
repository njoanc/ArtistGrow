export class Logger {
  static info(...params: any[]): void {
    if (process.env.NODE_ENV !== "test") {
      console.log(...params);
    }
  }

  static debug(...params: any[]): void {
    if (process.env.NODE_ENV !== "test") {
      console.log(...params);
    }
  }
  static error(...params: any[]): void {
    if (process.env.NODE_ENV !== "test") {
      console.error(...params);
    }
  }
}
