import { ApiErrorInterface } from "src/interfaces/api";

export class ApiError extends Error implements ApiErrorInterface {
  errors?: string[];

  constructor(message: string | undefined, errors?: string[] | undefined) {
    super(message);
    this.errors = errors;
  }
}
