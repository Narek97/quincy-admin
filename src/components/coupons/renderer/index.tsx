import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import BaseButton from "../../atoms/buttons/BaseButton";
import { FC, useState } from "react";
import BaseModal from "../../atoms/modal/BaseModal";
import { useDeleteItem } from "../../../hooks/useCoupons";
import DeleteModal from "../../templates/deleteModal/DeleteModal";
import "./style.scss";
import { GridCellParams } from "@mui/x-data-grid/models";
import { couponsFormRendererMap } from "../../../pages/coupons/constants";

interface IActionsRenderer {
  id: string;
  row: any;
  handleRefetch: () => void;
  title: string;
  fields: any;
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
  fields
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
      handleRefetch && handleRefetch();
    } catch (error) {
      console.error(error);
    }
  };

  const FormRenderer = couponsFormRendererMap[title];
  return (
    <>
      <div className="actions-cell">
        <BaseLoadingButton
          name="Delete"
          loading={false}
          onClick={handleDeleteModalOpen}
          color="error"
        />
        <BaseButton name="Edit" onClick={handleEditModalOpen} />
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
       {isEditModalOpen && (
        <BaseModal
          loading={false}
          open={isEditModalOpen}
          handleClose={handleEditModalClose}
        >
          <FormRenderer
            fields={fields}
            onClose={handleEditModalClose}
            onRefresh={handleRefetch}
            title={title}
            data={row}
          />
        </BaseModal>
      )}
    </>
  );
};
