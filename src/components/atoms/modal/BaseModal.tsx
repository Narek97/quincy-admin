import { Modal } from "@mui/material";
import React, { FC } from "react";
import "./BaseModal.scss";
import Box from "@mui/material/Box";

interface IBaseModal {
  open: boolean;
  handleClose: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

const BaseModal: FC<IBaseModal> = ({
  open,
  handleClose,
  loading,
  children,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={() => !loading && handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default BaseModal;
