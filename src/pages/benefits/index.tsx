import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import BaseLoadingButton from "../../components/atoms/buttons/BaseLoadingButton";
import BaseModal from "../../components/atoms/modal/BaseModal";
import CreateOrEditBenefitModalContent from "../../components/benefits/CreateOrEditBenefitModalContent";
import DeleteModal from "../../components/templates/deleteModal/DeleteModal";
import { BenefitResponseType } from "../../ts/types";
import {
  useCreateBenefit,
  useDeleteBenefit,
  useGetBenefits,
  useUpdateBenefit,
} from "../../hooks/useBenfit";
import { useRecoilState } from "recoil";
import { benefitsState } from "../../store/benfits.atom";
import Loading from "../../components/atoms/loading/Loading";
import EnhancedTable from "../../components/templates/enhancedTable/EnhancedTable";
import { benefitsHeadCells } from "../../constants/tableElements";
import BenefitsTableRows from "../../components/benefits/BenefitsTableRows";
import BaseSearch from "../../components/molecules/search/Search";
import { BENEFITS_LIMIT } from "../../constants/paginationLimit";

const Benefits = () => {
  const [benefits, setBenefits] = useRecoilState(benefitsState);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(BENEFITS_LIMIT);
  const [page, setPage] = useState<number>(0);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isOpenCreateBenefitModal, setIsOpenCreateBenefitModal] =
    useState<boolean>(false);
  const [isOpenDeleteBenefitModal, setIsOpenDeleteBenefitModal] =
    useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] =
    useState<BenefitResponseType | null>(null);
  const [selectedBenefitId, setSelectedBenefitId] = useState<
    string | number | null
  >(null);

  const onCreateSuccess = (data: BenefitResponseType) => {
    setBenefits((prev) => [data, ...prev]);
    toggleIsOpenCreateBenefitModal();
  };

  const onUpdateSuccess = (data: BenefitResponseType) => {
    setBenefits((prev) =>
      prev.map((benefit) => {
        if (benefit.id === data.id) {
          benefit = data;
        }
        return benefit;
      })
    );
    setIsOpenDeleteBenefitModal(false);
  };

  const onDeleteSuccess = (data: BenefitResponseType) => {
    setBenefits((prev) => prev.filter((benefit) => benefit.id !== data.id));
    setAllCount((prev) => prev - 1);
    setIsOpenDeleteBenefitModal(false);
  };
  const onError = (error: Error) => {
    console.log(error);
  };

  const { mutate: mutateCreateBenefit, isLoading: isLoadingCreateBenefit } =
    useCreateBenefit(onCreateSuccess, onError);

  const { mutate: mutateUpdateBenefit, isLoading: isLoadingUpdateBenefit } =
    useUpdateBenefit(onUpdateSuccess, onError);

  const { mutate: mutateDeleteBenefit, isLoading: isLoadingDeleteBenefit } =
    useDeleteBenefit(onDeleteSuccess, onError);

  const { isLoading, error, data } = useGetBenefits({
    offset: 0,
    limit,
    search,
  });

  const toggleIsOpenCreateBenefitModal = useCallback(() => {
    if (selectedBenefit) {
      setSelectedBenefit(null);
    }
    setIsOpenCreateBenefitModal((prev) => !prev);
  }, [selectedBenefit]);

  const toggleIsOpenDeleteBenefitModal = useCallback(() => {
    setIsOpenDeleteBenefitModal((prev) => !prev);
  }, []);

  const onHandleDelete = useCallback(
    (id: string | number) => {
      setSelectedBenefitId(id);
      toggleIsOpenDeleteBenefitModal();
    },
    [toggleIsOpenDeleteBenefitModal]
  );

  const onConfirmDeleteBenefit = useCallback(() => {
    mutateDeleteBenefit(selectedBenefitId!);
  }, [mutateDeleteBenefit, selectedBenefitId]);

  const onHandleEditBenefit = useCallback(
    (benefit: BenefitResponseType) => {
      toggleIsOpenCreateBenefitModal();
      setSelectedBenefit(benefit);
    },
    [toggleIsOpenCreateBenefitModal]
  );

  const createData = (
    id: string | number,
    description: string,
    url: string,
    attachment: null | {
      id: string | number;
      url: string;
    }
  ): BenefitResponseType => {
    return {
      id,
      description,
      url,
      attachment,
    };
  };

  const createBenefitData = useCallback(() => {
    return benefits.map((benefit: BenefitResponseType) =>
      createData(
        benefit.id,
        benefit.description,
        benefit.url,
        benefit.attachment
      )
    );
  }, [benefits]);

  const renderFunction = useCallback(
    (tableRow: BenefitResponseType) => (
      <BenefitsTableRows
        tableRow={tableRow}
        key={tableRow.id}
        onHandleDelete={onHandleDelete}
        onHandleEdit={onHandleEditBenefit}
      />
    ),
    [onHandleDelete, onHandleEditBenefit]
  );

  const onHandleSearch = useCallback((searchText: string) => {
    setSearch(searchText);
  }, []);

  const onHandleChangePage = useCallback(
    (page: number) => {
      setPage(page);
      const newLimit =
        BENEFITS_LIMIT > rowsPerPage ? BENEFITS_LIMIT : rowsPerPage;
      if (limit < data?.count) {
        setLimit((prev) => prev + newLimit);
      }
    },
    [data?.count, limit, rowsPerPage]
  );

  const onHandleChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
  }, []);

  useEffect(() => {
    if (data) {
      setBenefits(data.benefits);
      setAllCount(data.count);
    }
  }, [data]);

  if (error) {
    return <div className={"response-error-message"}>{error.message}</div>;
  }

  return (
    <div className={"benefits"}>
      {isOpenCreateBenefitModal && (
        <BaseModal
          loading={isLoadingCreateBenefit}
          open={isOpenCreateBenefitModal}
          handleClose={toggleIsOpenCreateBenefitModal}
        >
          <CreateOrEditBenefitModalContent
            selectedBenefit={selectedBenefit}
            onHandleClose={toggleIsOpenCreateBenefitModal}
            mutate={selectedBenefit ? mutateUpdateBenefit : mutateCreateBenefit}
            loading={isLoadingCreateBenefit || isLoadingUpdateBenefit}
          />
        </BaseModal>
      )}
      {isOpenDeleteBenefitModal && (
        <BaseModal
          loading={isLoadingDeleteBenefit}
          open={isOpenDeleteBenefitModal}
          handleClose={toggleIsOpenDeleteBenefitModal}
        >
          <DeleteModal
            name={"benefit"}
            loading={isLoadingDeleteBenefit}
            onHandleDelete={onConfirmDeleteBenefit}
            onHandleClose={toggleIsOpenDeleteBenefitModal}
          />
        </BaseModal>
      )}

      <div className={"benefits--header"}>
        <BaseSearch onHandleSearch={onHandleSearch} />

        <BaseLoadingButton
          name={"Create new benefit"}
          loading={false}
          onClick={toggleIsOpenCreateBenefitModal}
        />
      </div>

      <div>
        {isLoading || !data ? (
          <Loading />
        ) : (
          <EnhancedTable
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={onHandleChangePage}
            setRowsPerPage={onHandleChangeRowsPerPage}
            allCount={allCount}
            rows={(createBenefitData() as BenefitResponseType[]) || []}
            headCells={benefitsHeadCells}
            renderFunction={renderFunction}
          />
        )}
      </div>
    </div>
  );
};

export default Benefits;
