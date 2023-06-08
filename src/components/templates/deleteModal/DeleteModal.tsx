import React, { FC } from "react";
import "./DeleteModal.scss";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import BaseButton from "../../atoms/buttons/BaseButton";

interface IDeleteModal {
  name: string;
  loading: boolean;
  onHandleDelete: () => void;
  onHandleClose: () => void;
}

const DeleteModal: FC<IDeleteModal> = ({
  name,
  loading,
  onHandleDelete,
  onHandleClose,
}) => {
  return (
    <div className={"delete-modal-content"}>
      <p>{`Are you sure to delete this ${name}?`}</p>
      <div className={"delete-modal-content--footer"}>
        <BaseButton
          name={"Close"}
          onClick={onHandleClose}
          disabled={loading}
          variant={"outlined"}
        />
        <BaseLoadingButton
          name={"Confirm"}
          loading={loading}
          onClick={onHandleDelete}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
