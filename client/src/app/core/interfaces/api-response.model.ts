export interface IApiResponse<T> {
  success: boolean;
  errors: {
    code: number;
    message: string;
  }[];
  data: T;
}
