import { FC, useEffect, useState } from "react";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import { useGetList } from "../../../hooks/useCoupons";
import BaseSearch from "../../molecules/search/Search";
import "./style.scss";
import {
  COUPONS_LIMIT,
  couponsFormRendererMap,
} from "../../../pages/coupons/constants";
import CustomDataGrid from "../../organisms/CustomDataGrid";
import BaseModal from "../../atoms/modal/BaseModal";
import { IView } from "../../../ts/interface";
import {
  GridPaginationModel,
  GridSortItem,
  GridSortModel,
} from "@mui/x-data-grid";
import { ActionsRenderer } from "../renderer";

interface ICouponsView {
  view: IView;
}

const CouponsView: FC<ICouponsView> = ({ view }) => {
  const [formFields, setFormFields] = useState(view.fields.dashboard);
  const [offset, setOffSet] = useState(0);
  const [search, setSearch] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: COUPONS_LIMIT,
  });

  const [sortModel, setSortModel] = useState<GridSortItem>({
    field: "name",
    sort: "desc",
  });

  useEffect(() => {
    setFormFields((prevFields) => {
      const newFields = prevFields.map((prevField) => {
        if (prevField.field === "action") {
          return {
            ...prevField,
            renderCell: (params: any) => {
              return (
                <ActionsRenderer
                  id={params.row.id}
                  row={params.row}
                  handleRefetch={handleRefetch}
                  title={view.title}
                  fields={view.fields.form}
                />
              );
            },
          };
        }
        return prevField;
      });
      return newFields;
    });
    return ()=>{
      console.log('nowww');
    }
  }, []);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    setOffSet(model.page * model.pageSize);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleSortChange = (model: GridSortModel) => {
    if (!model || !model?.length) {
      setSortModel({
        field: "name",
        sort: "desc",
      });
    } else {
      setSortModel(model[0]);
    }
  };

  const handleRefetch = () => {
    refetch();
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: 0,
    }));
    setOffSet(0);
  };

  const handleModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const { data, error, isLoading, refetch } = useGetList({
    offset,
    size: paginationModel.pageSize,
    q: search,
    sort: sortModel.field,
    dir: sortModel.sort,
    title: view.title,
  });

  const FormRenderer = couponsFormRendererMap[view.title];

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="coupons--header">
        <BaseSearch onHandleSearch={handleSearch} />

        <BaseLoadingButton
          name={`Create ${view.title}`}
          loading={false}
          onClick={handleModalOpen}
        />
      </div>

      {!!data?.count && (
        <CustomDataGrid
          rows={data[view.name]}
          columns={formFields}
          rowCount={data.count}
          paginationModel={paginationModel}
          handlePageChange={handlePageChange}
          handleSortChange={handleSortChange}
          isLoading={isLoading}
        />
      )}
      {isCreateModalOpen && (
        <BaseModal
          loading={isLoading}
          open={isCreateModalOpen}
          handleClose={handleModalClose}
        >
          <FormRenderer
            fields={view.fields.form}
            onClose={handleModalClose}
            onRefresh={handleRefetch}
            title={view.title}
            data={data[view.title]}
          />
        </BaseModal>
      )}
    </>
  );
};

export default CouponsView;
