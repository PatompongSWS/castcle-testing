export interface CustomResponse {
  message: string;
  payload: unknown;
}

export interface CustomErrorResponse {
  error: ErrorPayload
}

interface ErrorPayload {
  code: number;
  message: string;
}