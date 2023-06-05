import React, { FC } from "react";
import "./BenefitFormTemplate.scss";
import BaseLoadingButton from "../../../atoms/buttons/BaseLoadingButton";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { BENEFIT_FORM_ELEMENTS } from "../../../../constants/formEleemets";
import FormInputError from "../../../molecules/formInputError/FormInputError";
import BaseButton from "../../../atoms/buttons/BaseButton";
import { BenefitRequestType } from "../../../../ts/types";
import { FileUploader } from "react-drag-drop-files";

interface ILoginFormTemplate {
  isEditForm: boolean;
  control: Control<BenefitRequestType>;
  errors: FieldErrors<BenefitRequestType>;
  onHandleSubmit: () => void;
  onHandleClose: () => void;
  onHandleUploadFile: (uploadFile: FileList | null) => void;
  loading: boolean;
}

const fileTypes = ["JPG", "PNG"];

const BenefitFormTemplate: FC<ILoginFormTemplate> = ({
  isEditForm,
  control,
  onHandleSubmit,
  onHandleClose,
  onHandleUploadFile,
  errors,
  loading,
}) => {
  return (
    <div className={"benefit-form-template"}>
      <form onSubmit={onHandleSubmit} className={"benefit-form-template--form"}>
        <h1 className={"benefit-form-template--title"}>Create new benefit</h1>
        {BENEFIT_FORM_ELEMENTS.map((element, index) => (
          <Controller
            key={element.name}
            name={element.name as "url" | "description"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInputError
                onChange={onChange}
                value={value}
                element={element}
                placeholder={element.placeholder}
                message={
                  errors[element.name as "url" | "description"]?.message || ""
                }
              />
            )}
          />
        ))}
        <FileUploader
          handleChange={onHandleUploadFile}
          name="file"
          types={fileTypes}
        />
        <div className={"benefit-form-template--footer"}>
          <BaseButton
            name={"Close"}
            type={"submit"}
            onClick={onHandleClose}
            disabled={loading}
            variant={"outlined"}
          />
          <BaseLoadingButton
            name={isEditForm ? "Update" : "Create"}
            type={"submit"}
            loading={loading}
            onClick={onHandleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default BenefitFormTemplate;
