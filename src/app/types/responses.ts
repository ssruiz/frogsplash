export interface ServerResponse<T> {
  data?: T;
  error?: boolean;
  message: string;
}
