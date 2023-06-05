import { request } from "../utils/axios-rq";
import { useMutation, useQuery } from "react-query";

const getCouponsRequest = ({ limit = 10, offset = 0, search = "" }) => {
  return request({
    url: `coupon/?size=${limit}&offset=${offset}&q=${search}`,
    method: "get",
  });
};

const getBrandsRequest = ({ limit = 10, offset = 0, search = "" }) => {
  return request({
    url: `brand/?size=${limit}&offset=${offset}&q=${search}`,
    method: "get",
  });
};

export const deleteCouponRequest = (id : string)=> {
  return request({ url: `coupon/${id}`, method: "delete" });
}


export const deleteBrandRequest = (id : string)=> {
  return request({ url: `brand/${id}`, method: "delete" });
}


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
  limit: number;
  offset: number;
  search: string;
  enabled: boolean;
}) => {
  const { limit, offset, search, enabled } = data;
  return useQuery<any, Error>(
    ["getCoupons",limit, offset, search, enabled],
    () => getCouponsRequest({ limit, offset, search }),
    {
      retry: 0,
      enabled,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetBrands = (data: {
  limit: number;
  offset: number;
  search: string;
  enabled: boolean;
}) => {
  const { limit, offset, search, enabled } = data;
  return useQuery<any, Error>(
    ["getBrands", limit, offset, search, enabled],
    () => getBrandsRequest({ limit, offset, search }),
    {
      retry: 0,
      enabled,
      refetchOnWindowFocus: false,

    }
  );
};
