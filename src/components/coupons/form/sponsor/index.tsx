import { FC } from "react";
import { useCreateItem, useUpdateItem } from "../../../../hooks/useCoupons";
import { useForm } from "react-hook-form";
import FormContentRenderer from "../../../molecules/form-content-renderer";
import { IBrand, IFormField } from "../../../../ts/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSponsorSchema, editSponsorSchema } from "./constants";

interface IBrandFormRenderer {
  fields: IFormField[];
  data?: IBrand;
  onClose: () => {};
  title: string;
  onRefresh: () => void;
}

const SponsorFormRenderer: FC<IBrandFormRenderer> = ({
  fields,
  data,
  onClose,
  title,
  onRefresh,
}) => {
  const isEdit = !!data;

  const sponsorDefaultValues = {
    name: data?.name || "",
    targetUrl: data?.targetUrl || "",
    triggerUrls: data?.triggerUrls || [],
    logo: null,
    deleteAttachment: false,
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
    defaultValues: sponsorDefaultValues,
    resolver: !isEdit
      ? yupResolver(createSponsorSchema)
      : yupResolver(editSponsorSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = state;

  const onSubmit = (couponData: any) => {
    const formData = new FormData();
    for (const key in couponData) {
      if (key === "triggerUrls") {
        formData.append(key, JSON.stringify(couponData[key]));
      } else {
        formData.append(key, couponData[key]);
      }
    }
    if (isEdit) {
      editMutate({ data: formData, title, id: data.id });
    } else {
      createMutate({ data: formData, title });
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
      imgUrl={data?.logo?.low}
    />
  );
};

export default SponsorFormRenderer;
