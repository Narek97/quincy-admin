import { FC, useState } from "react";
import BaseLoadingButton from "../../atoms/buttons/BaseLoadingButton";
import ActionsRenderer from "../renderer";
import Loading from "../../atoms/loading/Loading";
import { useGetBrands, useGetCoupons } from "../../../hooks/useCoupons";
import EnhancedTable from "../../templates/enhancedTable/EnhancedTable";
import BaseSearch from "../../molecules/search/Search";
import "./style.scss";  
import { COUPONS_LIMIT } from "../../../pages/coupons/constants";

interface ICouponsView {
  view: any;
}   

const CouponsView: FC<ICouponsView> = ({ view }) => {
  const [page, setPage] = useState(0);
  const [offset, setOffSet] = useState(0);
  const [limit, setLimit] = useState(COUPONS_LIMIT);
  const [search, setSearch] = useState('');


  const handlePageChange = (page: number) => {
    setPage(page);
    setOffSet(page * limit);
  }

  const handleLimitChange = (count: number) => {
    setLimit(count);
  }

  const handleRefetch = () => {
    refetchCoupons() || refetchBrands();
    setPage(0);
    setOffSet(0);
  };


  const handleSearch = () => {};


  const createModalOpen = () => {};



  const {
    data: couponData,
    error: couponError,
    isLoading: isCouponLoading,
    refetch: refetchCoupons,
  } = useGetCoupons({
    offset,
    limit,
    search,
    enabled: view.title === "coupon",
  });

  const {
    data: brandData,
    error: brandError,
    isLoading: isBrandLoading,
    refetch: refetchBrands,
  } = useGetBrands({
    offset,
    limit,
    search,
    enabled: view.title === "brands",
  });

  const data = couponData || brandData;
  const isLoading = isCouponLoading || isBrandLoading;
  const error = couponError || brandError;



  const renderFunction = (tableRow: any) => (
    <ActionsRenderer
      headCells={view.fields.dashboard}
      row={tableRow}
      title={view.title}
      onRefreshCB={handleRefetch}
    />
  );


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className={"coupons--header"}>
        <BaseSearch onHandleSearch={handleSearch} />

        <BaseLoadingButton
          name={`Create ${view.title}`}
          loading={false}
          onClick={createModalOpen}
        />
      </div>

      {!!data?.count && (
        <EnhancedTable
          rows={data[view.name]}
          headCells={view.fields.dashboard}
          renderFunction={renderFunction}
          allCount={data.count}
          page={page} 
          setPage={handlePageChange}
          rowsPerPage={limit}
          setRowsPerPage={handleLimitChange}
        />
      )}
    </>
  );
};

export default CouponsView;
