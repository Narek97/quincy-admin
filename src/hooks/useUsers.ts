import { useQuery } from "react-query";
import { request } from "../utils/axios-rq";

export const getUsersRequest = ({ limit = 10, offset = 0, search = "" }) => {
  return request({
    url: `users/?size=${limit}&offset=${offset}&q=${search}`,
    method: "get",
  });
};

export const useGetUsers = (data: {
  limit: number;
  offset: number;
  search: string;
}) => {
  const { limit, offset, search } = data;
  return useQuery<any, Error>(
    ["getUsers", data],
    () => getUsersRequest({ limit, offset, search }),
    {}
  );
};
