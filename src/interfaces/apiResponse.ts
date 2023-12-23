export interface IApiResponse<T> {
  success: boolean;
  payload: T;
}

interface IApiPayloadMeta {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface IApiPayloadPaginate<K> {
  data: K;
  meta: IApiPayloadMeta;
}
