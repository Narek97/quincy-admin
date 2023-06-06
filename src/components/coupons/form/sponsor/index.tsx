import { FC } from "react";
import { useCreateItem } from "../../../../hooks/useCoupons";
import { createSponsorDefaultValues } from "./constants";
import { useForm } from "react-hook-form";
import FormContentRenderer from "../../../molecules/form-content-renderer";
import { IBrand, IFormField } from "../../../../ts/interface";

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
    triggerUrls: data?.targetUrls || [],
    logo: null,
    deleteAttachment: false,
  };

  const onSuccess = () => {
    onClose();
    onRefresh();
  };

  const { mutate, isLoading } = useCreateItem(onSuccess);

  const state = useForm({
    mode: "onSubmit",
    defaultValues: sponsorDefaultValues,
    // resolver: yupResolver(createServiceSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = state;

  const onSubmit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "triggerUrls") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
    mutate({ data: formData, title });
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
      imgUrl={data?.logo?.low}
    />
  );
};

export default SponsorFormRenderer;
