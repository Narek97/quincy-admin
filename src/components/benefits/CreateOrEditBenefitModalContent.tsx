import React, { FC, useState } from "react";
import BenefitFormTemplate from "../templates/forms/BenefitFormTemplate/BenefitFormTemplate";
import { BenefitRequestType } from "../../ts/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BENEFIT_FORM_VALIDATION } from "../../constants/yupValidation";

interface ICreateOrEditBenefitModalContent {
  selectedBenefit: BenefitRequestType | null;
  onHandleClose: () => void;
  mutate: (formData: any) => void;
  loading: boolean;
}

const CreateOrEditBenefitModalContent: FC<ICreateOrEditBenefitModalContent> = ({
  selectedBenefit,
  onHandleClose,
  mutate,
  loading,
}) => {
  const [file, setFile] = useState<any>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BenefitRequestType>({
    resolver: yupResolver(BENEFIT_FORM_VALIDATION),
    defaultValues: {
      url: selectedBenefit?.url || "",
      description: selectedBenefit?.description || "",
    },
  });

  const onHandleSubmit = handleSubmit((benefitFormData: BenefitRequestType) => {
    if (file) {
      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("url", benefitFormData.url);
      formData.append("description", benefitFormData.description);
      if (selectedBenefit) {
        benefitFormData.id = selectedBenefit.id;
      }

      mutate(formData);
    } else {
    }
  });

  const onHandleUploadFile = (uploadFile: FileList | null) => {
    setFile(uploadFile);
  };

  return (
    <div>
      <BenefitFormTemplate
        isEditForm={!!selectedBenefit}
        onHandleClose={onHandleClose}
        onHandleSubmit={onHandleSubmit}
        onHandleUploadFile={onHandleUploadFile}
        errors={errors}
        loading={loading}
        control={control}
      />
    </div>
  );
};

export default CreateOrEditBenefitModalContent;
