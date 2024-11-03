import { ApiError } from "./ApiError";

export default class PasswordNotCorrect extends ApiError {
  constructor() {
    super('Password is not correct', 400);
  }
}