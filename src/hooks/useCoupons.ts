import { title } from "process";
import { request } from "../utils/axios-rq";
import { useMutation, useQuery } from "react-query";

const getListRequest = ({
  size = 10,
  offset = 0,
  search = "",
  sort = "",
  dir = "asc",
  title ='',
}) => {
  return request({
    url: `${title}/`,
    method: "get",
    params: { size, offset, search, sort, dir: dir.toUpperCase() },
  });
};


export const deleteCouponRequest = (id: string) => {
  return request({ url: `coupon/${id}`, method: "delete" });
};

export const deleteBrandRequest = (id: string) => {
  return request({ url: `brand/${id}`, method: "delete" });
};

export const createItemRequest = ({data, title}: any) => {
  return request({ url: `${title}/`, method: "post", data});
};

export const useDeleteCoupon = (
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) => {
  return useMutation("deleteCoupon", deleteCouponRequest, {
    onSuccess,
    onError,
  });
};

export const useDeleteBrand = (
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) => {
  return useMutation("deleteBrand", deleteBrandRequest, {
    onSuccess,
    onError,
  });
};

export const useGetList = (data: {
  size: number;
  offset: number;
  search: string;
  sort: string;
  dir: string;
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
