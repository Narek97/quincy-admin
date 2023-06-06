import { FC } from "react";
import { useCreateBrand } from "../../../../hooks/useCoupons";
import { createSponsorDefaultValues } from "./constants";
import { Controller, useForm } from "react-hook-form";
import FormInputError from "../../../molecules/formInputError/FormInputError";
import BaseButton from "../../../atoms/buttons/BaseButton";
import BaseLoadingButton from "../../../atoms/buttons/BaseLoadingButton";
import CustomChipsInput from "../../../molecules/multiple-input";

interface IBrandFormRenderer {
  fields?: any;
  data?: any;
}

const SponsorFormRenderer: FC<IBrandFormRenderer> = ({ fields, data }) => {
  const isEdit = !!data;

  console.log("fieldsss", fields);

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
    <div>
      <form onSubmit={onSubmit}>
        <h1>Create Sponsor</h1>
        {fields.map((field, id) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => {
              if (field.input === "text" && !field.multiChoice) {
                return (
                  <FormInputError
                    onChange={onChange}
                    value={value}
                    element={field}
                    placeholder={field.placeholder}
                    message={""}
                  />
                );
              }
              if (field.input === "text" && field.multiChoice) {
                return (
                  <CustomChipsInput
                    onChange={onChange}
                    value={value}
                    placeholder={field.placeholder}
                  />
                );
              }
              return <></>;
            }}
          />
        ))}

        <div className="form-footer">
          <BaseButton
            name={"Close"}
            type={"submit"}
            //   onClick={onHandleClose}
            //   disabled={loading}
            variant={"outlined"}
          />
          <BaseLoadingButton
            name={isEdit ? "Update" : "Create"}
            type={"submit"}
            //   loading={isLoading}
            //   onClick={onHandleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default SponsorFormRenderer;
