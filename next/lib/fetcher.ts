import apiClient, { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';

type ApiUrl = `/api/${string}`;

/**
 * @desc swr 요청에 사용되는 axios fetcher
 * @returns AxiosResponse의 data
 */
export default async function fetcher<T = any>(url: ApiUrl) {
  const res = await apiClient.get<T>(url);

  if (res.status >= 400) {
    logAxiosError(res.data as unknown as GeneralAxiosError);
  }

  return res.data;
}
