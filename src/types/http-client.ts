export enum HttpStatusCode {
  Unauthorized = 401,
  Forbidden = 403,
}

export type ErrorResponse = {
  message: string;
  status: boolean;
  isCancel?: boolean;
  isForbidden?: boolean;
};

export type PaginationResponse = {
  page: number;
  size: number;
  total: number;
};

export type Payload<Body extends any = any, Params extends any = any, Query extends any = any> = {
  params?: Params;
  query?: Query;
  body?: Body;
  pagination?: Pick<PaginationResponse, 'page' | 'size'>;
};

export type DataResponse<T extends object | null> = ErrorResponse &
  (T extends null ? {} : { data: T; pagination: PaginationResponse });
