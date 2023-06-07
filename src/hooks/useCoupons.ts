import { request } from "../utils/axios-rq";
import { useMutation, useQuery } from "react-query";
import { GridSortDirection } from "@mui/x-data-grid/models";

const getListRequest = ({
  size,
  offset,
  q = "",
  sort,
  dir,
  title = "",
}: {
  size?: number;
  offset?: number;
  q?: string;
  sort?: string;
  dir: GridSortDirection;
  title: string;
}) => {
  return request({
    url: `${title}/`,
    method: "get",
    params: { size, offset, q, sort, dir: dir?.toUpperCase() },
  });
};

export const deleteItemRequest = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  return request({ url: `${title}/${id}`, method: "delete" });
};

export const createItemRequest = ({ data, title }: any) => {
  return request({ url: `${title}/`, method: "post", data });
};

export const updateItemRequest = ({ data, title, id }: any) => {
  return request({ url: `${title}/${id}`, method: "put", data });
};

export const useDeleteItem = (onSuccess: () => void) => {
  return useMutation(deleteItemRequest, {
    onSuccess,
  });
};

export const useGetList = (data: {
  size?: number;
  offset?: number;
  q?: string;
  sort?: string;
  dir?: GridSortDirection;
  title: string;
  enabled?: boolean;
  open?: boolean;
}) => {
  const { size, offset, q, sort, dir, title, enabled = true, open } = data;
  return useQuery<any, Error>(
    [`get${title}`, size, offset, q, sort, dir, title, open],
    () => getListRequest({ size, offset, q, sort, dir, title }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      enabled,
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
