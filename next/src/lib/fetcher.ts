// import axios from 'axios';
import apiClient, { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';

type ApiUrl = `/api/${string}`;

/**
 * @desc swr 요청에 사용되는 axios fetcher
 * @returns AxiosResponse의 data
 */
export default async function fetcher(url: ApiUrl) {
  const res = await apiClient.get<any>(url);
  // const res = await axios.get<any>(url); // TODO: 유저를 Next Mock API 로 받기 위한 임시 fetcher (In useUser hooks)

  if (res.status >= 400) {
    logAxiosError(res.data as unknown as GeneralAxiosError);
  }

  return res.data;
}
