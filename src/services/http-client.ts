import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { HttpStatusCode } from 'types/http-client';

type RequestConfig = AxiosRequestConfig & {
  showLoading?: boolean;
};

type HttpRequestCallback = {
  onShowLoading?: () => void;
  onHideLoading?: () => void;
  onCatchUnauthorizedError?: () => void;
  onSetAuthorization?: (prevToken: string) => void;
};

type ErrorResponse = AxiosError & {
  config: Pick<RequestConfig, 'showLoading'>;
};

export class HttpClient {
  readonly instance: AxiosInstance;
  private _isAttachedAuthToken = false;
  private _callbacks?: HttpRequestCallback;

  constructor(baseURL: string, config?: RequestConfig) {
    this.instance = axios.create({
      baseURL,
      timeout: 60000,
      ...config,
    });
  }

  private _handleError(error: AxiosError) {
    return Promise.reject({
      message: error.response?.data?.message,
      systemMessage: error.message,
      code: error.response?.status,
      isCancel: axios.isCancel(error),
      isForbidden: error.response?.status === HttpStatusCode.Forbidden,
    });
  }

  initRequest() {
    let requestCount = 0;

    const decreaseRequestCount = () => {
      requestCount -= 1;
      if (requestCount === 0) {
        this._callbacks?.onHideLoading && this._callbacks.onHideLoading();
      }
    };

    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        if (config?.showLoading) {
          requestCount += 1;
          this._callbacks?.onShowLoading && this._callbacks.onShowLoading();
        }
        return config;
      },
      (error: ErrorResponse) => {
        if (error?.config?.showLoading) {
          decreaseRequestCount();
        }
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (res: any) => {
        if (res.config?.showLoading) {
          decreaseRequestCount();
        }
        return res;
      },
      (error: ErrorResponse) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          this._callbacks?.onCatchUnauthorizedError && this._callbacks.onCatchUnauthorizedError();
          this.deleteAuthorization();
        }
        if (error?.config?.showLoading) {
          decreaseRequestCount();
        }
        return Promise.reject(error);
      },
    );
  }

  injectCallbacks(cb: HttpRequestCallback) {
    this._callbacks = cb;
  }

  setAuthorization(token: string, type: 'Token' | 'Bearer') {
    this._isAttachedAuthToken = true;
    this.instance.defaults.headers.common['Authorization'] = `${type} ${token}`;

    this._callbacks?.onSetAuthorization && this._callbacks.onSetAuthorization(token);
  }

  deleteAuthorization() {
    if (this._isAttachedAuthToken) {
      delete this.instance.defaults.headers.common['Authorization'];
      this._isAttachedAuthToken = false;
    }
  }

  get(path: string, config?: RequestConfig) {
    return this.instance.get(path, config).catch(this._handleError);
  }

  post(path: string, data: any, config?: RequestConfig) {
    return this.instance.post(path, data, config).catch(this._handleError);
  }

  put(path: string, data: any, config?: RequestConfig) {
    return this.instance.put(path, data, config).catch(this._handleError);
  }

  patch(path: string, data: any, config?: RequestConfig) {
    return this.instance.patch(path, data, config).catch(this._handleError);
  }

  delete(path: string, config?: RequestConfig) {
    return this.instance.delete(path, config).catch(this._handleError);
  }
}
