import { FC } from "react";
import { useCreateItem } from "../../../../hooks/useCoupons";
import { createSponsorDefaultValues } from "./constants";
import { useForm } from "react-hook-form";
import FormContentRenderer from "../../../molecules/form-content-renderer";

interface IBrandFormRenderer {
  fields?: any;
  data?: any;
  onClose: ()=> {};
  title: string;
  onRefresh: () => void
}


const SponsorFormRenderer: FC<IBrandFormRenderer> = ({ fields, data, onClose, title, onRefresh }) => {
  const isEdit = !!data;

  const onSuccess =() =>{
    onClose();
    onRefresh();
  }

  const { mutate, isLoading } = useCreateItem(onSuccess);

  const state = useForm({
    mode: "onSubmit",
    defaultValues: createSponsorDefaultValues,
    // resolver: yupResolver(createServiceSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = state;

  const onSubmit = (sponsorData: any) => {
    const formData = new FormData();
    for (const key in sponsorData) {
      if (key === 'triggerUrls') {
        formData.append(key, JSON.stringify(sponsorData[key]));
      } else {
        formData.append(key, sponsorData[key]);
      }
    }
    mutate({data:formData, title});
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
    />
  );
};

export default SponsorFormRenderer;
