import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import Loading from "../../components/atoms/loading/Loading";
import EnhancedTable from "../../components/templates/enhancedTable/EnhancedTable";
import { useWebHistory } from "../../hooks/useWebHistory";
import { webHistoryHeadCells } from "../../constants/tableElements";
import WebHistoryRows from "../../components/webHistory/WebHistoryRows";
import { WEB_HISTORY_LIMIT } from "../../constants/paginationLimit";
import BaseSearch from "../../components/molecules/search/Search";
import { WebHistoryResponseType, WebHistoryTableType } from "../../ts/types";

const WebHistory = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(WEB_HISTORY_LIMIT);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { isLoading, error, data } = useWebHistory({
    offset: 0,
    limit,
    search,
  });

  const createData = (
    firstName: string,
    lastName: string,
    favicon: string,
    url: string,
    createdAt: string
  ): WebHistoryTableType => {
    return {
      firstName,
      lastName,
      favicon,
      url,
      createdAt,
    };
  };

  const createWebHistoryData = useCallback(() => {
    return data?.browserHistoryList?.map((WebHistory: WebHistoryResponseType) =>
      createData(
        WebHistory.user.firstName,
        WebHistory.user.lastName,
        WebHistory.favicon,
        WebHistory.url,
        dayjs(WebHistory?.createdAt)?.format("DD/MM/YYYY")
      )
    );
  }, [data]);

  const renderFunction = useCallback(
    (tableRow: WebHistoryTableType) => (
      <WebHistoryRows tableRow={tableRow} key={tableRow.url} />
    ),
    []
  );

  const onHandleSearch = useCallback((searchText: string) => {
    setSearch(searchText);
  }, []);

  const onHandleChangePage = useCallback(
    (page: number) => {
      setPage(page);
      if (limit < data?.count) {
        const newLimit =
          WEB_HISTORY_LIMIT > rowsPerPage ? WEB_HISTORY_LIMIT : rowsPerPage;
        setLimit((prev) => prev + newLimit);
      }
    },
    [data?.count, limit, rowsPerPage]
  );

  const onHandleChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
  }, []);

  if (error) {
    return <div className={"response-error-message"}>{error.message}</div>;
  }

  return (
    <div>
      <BaseSearch onHandleSearch={onHandleSearch} />
      <div>
        {isLoading || !data ? (
          <Loading />
        ) : (
          <EnhancedTable
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={onHandleChangePage}
            setRowsPerPage={onHandleChangeRowsPerPage}
            allCount={data?.count}
            rows={(createWebHistoryData() as WebHistoryTableType[]) || []}
            headCells={webHistoryHeadCells}
            renderFunction={renderFunction}
          />
        )}
      </div>
    </div>
  );
};

export default WebHistory;
