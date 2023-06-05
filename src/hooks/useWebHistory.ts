import { useQuery } from "react-query";
import { request } from "../utils/axios-rq";

export const getWebHistoryRequest = ({
  limit = 10,
  offset = 0,
  search = "",
}) => {
  return request({
    url: `browser-history/?size=${limit}&offset=${offset}&q=${search}`,
    method: "get",
  });
};

export const useWebHistory = (data: {
  limit: number;
  offset: number;
  search: string;
}) => {
  const { limit, offset, search } = data;
  return useQuery<any, Error>(
    ["getWebHistory", data],
    () => getWebHistoryRequest({ limit, offset, search }),
    {}
  );
};
