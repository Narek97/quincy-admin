import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import BaseButton from "../../atoms/buttons/BaseButton";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import FormInputError from "../formInputError/FormInputError";
import "./style.scss";
import { FC } from "react";
import { IFormField } from "../../../ts/interface";
import CustomImageUpload from "../image-upload";
import CustomChipsInput from "../multiple-input";
import CustomSelectAsync from "../select-async";

interface IFormContentRenderer {
  title: string;
  onSubmit: (data: unknown) => void;
  fields: IFormField[];
  control: Control<any, unknown>;
  errors: FieldErrors<any>;
  isEdit: boolean;
  onClose: () => {};
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  isLoading: boolean;
  imgUrl?: string;
}

const getAnyMessage = (arr: any[]) => {
  return arr.find((elem) => elem.message);
};

const FormContentRenderer: FC<IFormContentRenderer> = ({
  title,
  onSubmit,
  fields,
  control,
  errors,
  isEdit,
  onClose,
  handleSubmit,
  isLoading,
  imgUrl,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-section">
        <h1>Create {title}</h1>
        {fields.map((field) => (
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
                    message={
                      (errors?.[field.name]?.message as string | undefined) ||
                      ""
                    }
                  />
                );
              }
              if (field.input === "text" && field.multiChoice) {
                let message;
                if (errors?.[field.name]) {
                  const error = (message = getAnyMessage(
                    errors[field.name] as unknown as any[]
                  ));
                  message = error.message;
                }
                return (
                  <CustomChipsInput
                    onChange={onChange}
                    value={value}
                    placeholder={field.placeholder}
                    message={(message as string | undefined) || ""}
                  />
                );
              }
              if (field.input === "image") {
                return (
                  <CustomImageUpload
                    onChangeCB={onChange}
                    imgUrl={imgUrl}
                    message={
                      (errors?.[field.name]?.message as string | undefined) ||
                      ""
                    }
                  />
                );
              }
              if (field.input === "select" && field.async) {
                return (
                  <CustomSelectAsync
                    label={field.placeholder}
                    title={field.asyncGet!}
                    nameKey={field.nameKey!}
                    onChangeCB={onChange}
                    value={value}
                    message={
                      (errors?.[field.name]?.message as string | undefined) ||
                      ""
                    }
                  />
                );
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
