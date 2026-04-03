export interface ApiError {
  code: string;
  message: string;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: ApiError;
  meta: ApiMeta;
}
