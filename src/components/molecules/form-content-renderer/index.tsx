import { Control, Controller, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import BaseButton from "../../atoms/buttons/BaseButton";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import FormInputError from "../formInputError/FormInputError";
import CustomChipsInput from "../multiple-input";
import ImageUpload from "../image-upload";
import "./style.scss";
import { FC } from "react";
import { IBrandCreate, IFormField } from "../../../ts/interface";

interface IFormContentRenderer {
  onSubmit: (data: unknown) => void;
  fields: IFormField[];
  control:  Control<any, unknown>;
  errors: FieldErrors<any>;
  isEdit: boolean;
  onClose: ()=> {};
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  isLoading: boolean;
}

const FormContentRenderer: FC<IFormContentRenderer> = ({
  onSubmit,
  fields,
  control,
  errors,
  isEdit,
  onClose,
  handleSubmit,
  isLoading,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-section">
        <h1>Create Sponsor</h1>
        {fields.map((field, id) => (
          <Controller
            key={field.name}
            name={field.name }
            control={control}
            render={({ field: { onChange, value } }) => {
              if (field.input === "text" && !field.multiChoice) {
                return (
                  <FormInputError
                    onChange={onChange}
                    value={value}
                    element={field}
                    placeholder={field.placeholder}
                    message=""
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
              if (field.input === "image") {
                return <ImageUpload onChangeCB={onChange} value={value} />;
              }
              return <></>;
            }}
          />
        ))}

        <div className="form-footer">
          <BaseButton
            name="Close"
            onClick={onClose}
            disabled={isLoading}
            variant={"outlined"}
          />
          <BaseLoadingButton
            name={isEdit ? "Update" : "Create"}
            type="submit"
            loading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default FormContentRenderer;
