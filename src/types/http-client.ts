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

export type Payload<
  Body extends any = unknown,
  Params extends any = unknown,
  Query extends any = unknown,
> = (Params extends object ? { params: Params } : {}) &
  (Query extends object ? { query: Query } : {}) &
  (Body extends object ? { body: Body } : {}) & {
    pagination?: Pick<PaginationResponse, 'page' | 'size'>;
  };

export type DataResponse<T extends object | null> = ErrorResponse &
  (T extends null ? {} : { data: T; pagination?: PaginationResponse });
