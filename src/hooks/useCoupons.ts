import { request } from "../utils/axios-rq";
import { useMutation, useQuery } from "react-query";

const getCouponsRequest = ({
  size = 10,
  offset = 0,
  search = "",
  sort = "",
  dir = "asc",
}) => {
  return request({
    url: `coupon/`,
    method: "get",
    params: { size, offset, search, sort, dir: dir.toUpperCase() },
  });
};

const getBrandsRequest = ({
  size = 10,
  offset = 0,
  search = "",
  sort = "",
  dir = "asc",
}) => {
  return request({
    url: `brand/`,
    method: "get",
    params: { size, offset, search, sort, dir: dir.toUpperCase()  },
  });
};

export const deleteCouponRequest = (id: string) => {
  return request({ url: `coupon/${id}`, method: "delete" });
};

export const deleteBrandRequest = (id: string) => {
  return request({ url: `brand/${id}`, method: "delete" });
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

export const useGetCoupons = (data: {
  size: number;
  offset: number;
  search: string;
  enabled: boolean;
  sort: string;
  dir: string;
}) => {
  const { size, offset, search, enabled, sort, dir } = data;
  return useQuery<any, Error>(
    ["getCoupons", size, offset, search, enabled, sort, dir],
    () => getCouponsRequest({ size, offset, search, sort, dir }),
    {
      retry: 0,
      enabled,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetBrands = (data: {
  size: number;
  offset: number;
  search: string;
  enabled: boolean;
  sort: string;
  dir: string;
}) => {
  const { size, offset, search, enabled, sort, dir } = data;
  return useQuery<any, Error>(
    ["getBrands", size, offset, search, enabled, sort, dir],
    () => getBrandsRequest({ size, offset, search, sort, dir }),
    {
      retry: 0,
      enabled,
      refetchOnWindowFocus: false,
    }
  );
};
