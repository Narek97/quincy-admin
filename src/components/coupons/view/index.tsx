import { FC, useState } from "react";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import ActionsRenderer from "../renderer";
import { useGetBrands, useGetCoupons } from "../../../hooks/useCoupons";
import BaseSearch from "../../molecules/search/Search";
import "./style.scss";
import { COUPONS_LIMIT } from "../../../pages/coupons/constants";
import CustomDataGrid from "../../organisms/CustomDataGrid";


interface ICouponsView {
  view: any;
}

const CouponsView: FC<ICouponsView> = ({ view }) => {
  const [offset, setOffSet] = useState(0);
  const [search, setSearch] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: COUPONS_LIMIT,
  });

  const [sortModel, setSortModel] = useState({
    field: "name",
    sort: "desc",
  });

  const handlePageChange = (model: any) => {
    setPaginationModel(model);
    setOffSet(model.page * model.pageSize);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleSortChange = (ev: any) => {
    if (!ev || !ev.length) {
      setSortModel({
        field: "name",
        sort: "desc",
      })
    } else {
      setSortModel(ev[0]);
    }
   
  };




  const handleRefetch = () => {
    refetchCoupons() || refetchBrands();
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: 0,
    }));
    setOffSet(0);
  };

  const createModalOpen = () => {};

  const {
    data: couponData,
    error: couponError,
    isLoading: isCouponLoading,
    refetch: refetchCoupons,
  } = useGetCoupons({
    offset,
    size: paginationModel.pageSize,
    search,
    sort: sortModel.field,
    dir: sortModel.sort,
    enabled: view.title === "coupon",
  });

  const {
    data: brandData,
    error: brandError,
    isLoading: isBrandLoading,
    refetch: refetchBrands,
  } = useGetBrands({
    offset,
    size: paginationModel.pageSize,
    search,
    sort: sortModel.field,
    dir: sortModel.sort,
    enabled: view.title === "brands",
  });

  const data = couponData || brandData;
  const isLoading = isCouponLoading || isBrandLoading;
  const error = couponError || brandError;


  console.log('dataaaa', data);

  const renderFunction = (tableRow: any) => (
    <ActionsRenderer
      columns={view.fields.dashboard}
      row={tableRow}
      title={view.title}
      onRefreshCB={handleRefetch}
    />
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="coupons--header">
        {!!data?.count && <BaseSearch onHandleSearch={handleSearch} />}

        <BaseLoadingButton
          name={`Create ${view.title}`}
          loading={false}
          onClick={createModalOpen}
        />
      </div>

      {!!data?.count && (
        <CustomDataGrid
          rows={data[view.name]}
          columns={view.fields.dashboard}
          rowCount={data.count}
          paginationModel={paginationModel}
          handlePageChange={handlePageChange}
          handleSortChange={handleSortChange}
          isLoading={isLoading}
          // renderFunction={renderFunction}
        />
      )}
    </>
  );
};

export default CouponsView;
