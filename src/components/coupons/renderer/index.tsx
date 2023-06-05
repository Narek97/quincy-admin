import TableCell from "@mui/material/TableCell";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import BaseButton from "../../atoms/buttons/BaseButton";
import { FC, Key, useState } from "react";
import BaseModal from "../../atoms/modal/BaseModal";
import { useDeleteBrand, useDeleteCoupon } from "../../../hooks/useCoupons";
import DeleteModal from "../../templates/deleteModal/DeleteModal";


interface ICouponsRenderer {
  row:any;
  headCells:any;
  title:any;
  onRefreshCB:any;

}

const CouponsRenderer: FC<ICouponsRenderer>= ({ row, headCells, title, onRefreshCB }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const couponMutation = useDeleteCoupon(()=>{}, ()=>{});
  const brandMutation = useDeleteBrand(()=>{}, ()=>{});


  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (id: string)=> {
    try {
      if (title==='coupon') {
        await couponMutation.mutateAsync(id);
      } 
      if (title==='brand') {
        await brandMutation.mutateAsync(id);
      }  
      setIsDeleteModalOpen(false);
      onRefreshCB && onRefreshCB()
    } catch (error) {
     console.error(error)
    }
  }

  return (
    <>
      {headCells.map((column: { id: string; }, index: Key | null | undefined) =>
        column.id !== "action" ? (
          (
            <TableCell
              key={index}
              align="left"
              component="th"
              scope="row"
              padding="none"
            >
              {row[column.id]}
            </TableCell>
          )
        ) : (
          <TableCell key={index} align="right" sx={{ display: "flex", gap: "10px  " }}>
            <BaseLoadingButton
              name={"Delete"}
              loading={false}
              onClick={handleDeleteModalOpen}
              color="error"
            />
            <BaseButton name={"Edit"} />
          </TableCell>
        )
      )}

      {isDeleteModalOpen && (
        <BaseModal
          open={isDeleteModalOpen}
          handleClose={handleDeleteModalClose}
        >
          <DeleteModal
            name={title}
            loading={false}
            onHandleDelete={()=>handleDelete(row.id)}
            onHandleClose={handleDeleteModalClose}
          />
        </BaseModal>
      )}
    </>
  );
};

export default CouponsRenderer;
