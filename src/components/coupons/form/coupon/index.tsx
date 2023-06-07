import { FC } from "react";
import { IFormField } from "../../../../ts/interface";
import { useCreateItem, useUpdateItem } from "../../../../hooks/useCoupons";
import { useForm } from "react-hook-form";
import FormContentRenderer from "../../../molecules/form-content-renderer";

interface ICouponFormRenderer {
  fields: IFormField[];
  data?: any;
  onClose: () => {};
  title: string;
  onRefresh: () => void;
}

const CouponFormRenderer: FC<ICouponFormRenderer> = ({
  fields,
  data,
  onClose,
  title,
  onRefresh,
}) => {
  const isEdit = !!data;

  const couponDefaultValues = {
    brand: data?.brand || null,
    couponCode: data?.couponCode || "",
    dealText: data?.dealText || "",
  };

  const onSuccess = () => {
    onClose();
    onRefresh();
  };

  const { mutate: createMutate, isLoading: createIsLoading } =
    useCreateItem(onSuccess);
  const { mutate: editMutate, isLoading: editIsLoading } =
    useUpdateItem(onSuccess);

  const isLoading = createIsLoading || editIsLoading;

  const state = useForm({
    mode: "onSubmit",
    defaultValues: couponDefaultValues,
    // resolver: yupResolver(editSponsorSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = state;

  const onSubmit = (couponData: any) => {
    const requestData = {...couponData};
    requestData.brandId = couponData.brand.id;
    delete requestData.brand;
    if (isEdit) {
      editMutate({ data: requestData, title, id: data.id });
    } else {
      createMutate({ data: requestData, title });
    }
  };

  return (
    <FormContentRenderer
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      control={control}
      isEdit={isEdit}
      fields={fields}
      onClose={onClose}
      isLoading={isLoading}
      title={title}
    />
  );
};

export default CouponFormRenderer;
