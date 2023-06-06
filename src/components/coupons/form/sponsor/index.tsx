import { FC } from "react";
import { useCreateBrand } from "../../../../hooks/useCoupons";
import { createSponsorDefaultValues } from "./constants";
import { useForm } from "react-hook-form";
import FormContentRenderer from "../../../molecules/form-content-renderer";

interface IBrandFormRenderer {
  fields?: any;
  data?: any;
}


const SponsorFormRenderer: FC<IBrandFormRenderer> = ({ fields, data }) => {
  const isEdit = !!data;

  const { mutate, isLoading } = useCreateBrand(() => {});

  const state = useForm({
    mode: "onSubmit",
    defaultValues: createSponsorDefaultValues,
    // resolver: yupResolver(createServiceSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = state;

  const onSubmit = (sponsorData: any) => {
    mutate(sponsorData);
  };

  return (
    <FormContentRenderer
      onSubmit={onSubmit}
      errors={errors}
      control={control}
      isEdit={isEdit}
      fields={fields}
    />
  );
};

export default SponsorFormRenderer;
