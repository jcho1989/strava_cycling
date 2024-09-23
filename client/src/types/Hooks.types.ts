import { AxiosResponse } from 'axios';

export type ApiCallConfig = {
  pathParams?: Record<string, any>;
  params?: Record<string, any>;
  data?: Record<string, any>;
};

export type ApiResponse = {
  data?: Record<string, any>
};

export type ConfigType = {
  apiCall: any
  pathParams?: Record<string, any>;
  params?: Record<string, any>;
  data?: Record<string, any>;
  onSuccess: Function;
  onError: Function;
};
