import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import BaseButton from "../../atoms/buttons/BaseButton";
import { FC, useState } from "react";
import BaseModal from "../../atoms/modal/BaseModal";
import { useDeleteItem } from "../../../hooks/useCoupons";
import DeleteModal from "../../templates/deleteModal/DeleteModal";
import "./style.scss";
import { GridCellParams } from "@mui/x-data-grid/models";

interface IActionsRenderer {
  id: string;
  row: any;
  handleRefetch: () => void;
  title: string;
}

export const ImageRenderer = (params: GridCellParams) => {
  const img = params.row.logo;
  return <img src={img.low} alt="logo" className="logo" />;
};

export const ActionsRenderer: FC<IActionsRenderer> = ({
  id,
  row,
  handleRefetch,
  title,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteMutation = useDeleteItem(handleRefetch);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteMutation.mutateAsync({ id, title });

      handleDeleteModalClose();
      // onRefreshCB && onRefreshCB();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="actions-cell">
        <BaseLoadingButton
          name="Delete"
          loading={false}
          onClick={handleDeleteModalOpen}
          color="error"
        />
        <BaseButton name="Edit" />
      </div>
      {isDeleteModalOpen && (
        <BaseModal
          open={isDeleteModalOpen}
          handleClose={handleDeleteModalClose}
        >
          <DeleteModal
            name={title}
            loading={false}
            onHandleDelete={() => handleDelete(id, title)}
            onHandleClose={handleDeleteModalClose}
          />
        </BaseModal>
      )}
    </>
  );
};
