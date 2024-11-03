import { HttpException } from "@nestjs/common";
import { ApiError } from "./ApiError";

export default class ExistedEmailError extends ApiError {
  constructor() {
    super('Email already exists', 400);
  }
}