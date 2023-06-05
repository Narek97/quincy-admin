import React, { useCallback, useState } from "react";
import { useGetUsers } from "../../hooks/useUsers";
import Loading from "../../components/atoms/loading/Loading";
import EnhancedTable from "../../components/templates/enhancedTable/EnhancedTable";
import { userHeadCells } from "../../constants/tableElements";
import UsersTableRows from "../../components/users/UsersTableRows";
import { UserResponseType } from "../../ts/types";
import BaseSearch from "../../components/molecules/search/Search";
import { USER_LIMIT } from "../../constants/paginationLimit";

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(USER_LIMIT);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { isLoading, error, data } = useGetUsers({
    offset: 0,
    limit,
    search,
  });

  const createData = (
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    magnifyingGlassCount: number
  ): UserResponseType => {
    return {
      firstName,
      lastName,
      email,
      role,
      magnifyingGlassCount,
    };
  };

  const createUserData = useCallback(() => {
    return data?.users?.map((user: UserResponseType) =>
      createData(
        user.firstName,
        user.lastName,
        user.email,
        user.role,
        user.magnifyingGlassCount
      )
    );
  }, [data]);

  const renderFunction = useCallback(
    (tableRow: UserResponseType) => (
      <UsersTableRows tableRow={tableRow} key={tableRow.email} />
    ),
    []
  );

  const onHandleSearch = useCallback((searchText: string) => {
    setSearch(searchText);
  }, []);

  const onHandleChangePage = useCallback(
    (page: number) => {
      setPage(page);
      const newLimit = USER_LIMIT > rowsPerPage ? USER_LIMIT : rowsPerPage;
      if (limit < data?.count) {
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
            rows={(createUserData() as UserResponseType[]) || []}
            headCells={userHeadCells}
            renderFunction={renderFunction}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
