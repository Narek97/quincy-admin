import { request } from "../utils/axios-rq";
import { useMutation, useQuery } from "react-query";
import { GridSortDirection } from "@mui/x-data-grid/models";

const getListRequest = ({
  size = 10,
  offset = 0,
  search = "",
  sort = "",
  dir = "asc",
  title ='',
}:{
  size: number,
  offset: number,
  search: string,
  sort: string,
  dir: GridSortDirection,
  title: string
}) => {
  return request({
    url: `${title}/`,
    method: "get",
    params: { size, offset, search, sort, dir: dir?.toUpperCase() },
  });
};


export const deleteItemRequest = ({id, title}: {id: string, title: string}) => {
  return request({ url: `${title}/${id}`, method: "delete" });
};


export const createItemRequest = ({data, title}: any) => {
  return request({ url: `${title}/`, method: "post", data});
};


export const updateItemRequest = ({data, title, id}: any) => {  
  return request({ url: `${title}/${id}`, method: "put", data});
};

export const useDeleteItem = (
  onSuccess: () => void,
) => {
  return useMutation( deleteItemRequest, {
    onSuccess,
  });
};


export const useGetList = (data: {
  size: number;
  offset: number;
  search: string;
  sort: string;
  dir: GridSortDirection;
  title: string;
}) => {
  const { size, offset, search, sort, dir, title } = data;
  return useQuery<any, Error>(
    [`get${title}`, size, offset, search, sort, dir, title],
    () => getListRequest({ size, offset, search, sort, dir, title }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};


export const useCreateItem = (onSuccess: (data: any) => void) => {
  return useMutation(createItemRequest, {
    onSuccess,
  });
};


export const useUpdateItem = (onSuccess: (data: any) => void) => {
  return useMutation(updateItemRequest, {
    onSuccess,
  });
};

