import { request } from "../utils/axios-rq";
import { useMutation, useQuery } from "react-query";
import { BenefitRequestType } from "../ts/types";

const createBenefitRequest = (data: BenefitRequestType) => {
  return request({
    url: "benefit",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useCreateBenefit = (
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) => {
  return useMutation("createBenefit", createBenefitRequest, {
    onSuccess,
    onError,
  });
};

export const getBenefitsRequest = ({ limit = 10, offset = 0, search = "" }) => {
  return request({
    url: `benefit/?size=${limit}&offset=${offset}&q=${search}`,
    method: "get",
  });
};

export const useGetBenefits = (data: {
  limit: number;
  offset: number;
  search: string;
}) => {
  const { limit, offset, search } = data;
  return useQuery<any, Error>(
    ["getBenefits", data],
    () => getBenefitsRequest({ limit, offset, search }),
    {}
  );
};

const updateBenefitRequest = ({data, id}:{data: any, id: string}) => {
  return request({ url: `benefit/${id}`, method: "put", data });
};

export const useUpdateBenefit = (
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) => {
  return useMutation("updateBenefit", updateBenefitRequest, {
    onSuccess,
    onError,
  });
};

const deleteBenefitRequest = (id: string | number) => {
  return request({ url: `benefit/${id}`, method: "delete" });
};

export const useDeleteBenefit = (
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) => {
  return useMutation("deleteBenefit", deleteBenefitRequest, {
    onSuccess,
    onError,
  });
};
