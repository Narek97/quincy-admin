import { Controller } from "react-hook-form";
import BaseButton from "../../atoms/buttons/BaseButton";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import FormInputError from "../formInputError/FormInputError";
import CustomChipsInput from "../multiple-input";
import ImageUpload from "../image-upload";
import './style.scss';

const FormContentRenderer = ({ onSubmit, fields, control, errors, isEdit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="form-section">
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

export default FormContentRenderer;
