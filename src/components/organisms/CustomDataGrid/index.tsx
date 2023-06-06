import Box from '@mui/material/Box/Box';
import { DataGrid, GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { FC } from 'react';
import { IBrandsListResponse } from '../../../ts/interface';



interface ICutomGrid {
  columns: GridColDef[];
  rows: IBrandsListResponse[];
  rowCount:number;
  paginationModel:GridPaginationModel;
  handlePageChange: (model: GridPaginationModel)=> void;
  handleSortChange: (ev: GridSortModel) => void;
  isLoading: boolean;
}

const CustomDataGrid: FC<ICutomGrid> = ({
  columns =[],
  rows = [],
  rowCount,
  paginationModel,
  handlePageChange,
  handleSortChange,
  isLoading
}) => {
 
  return (
    <Box sx={{ height: 400, width: '100%', }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        paginationModel={paginationModel}
        paginationMode="server"
        sortingMode="server"
        onPaginationModelChange={handlePageChange}
        onSortModelChange={handleSortChange}
        loading={isLoading}
        disableRowSelectionOnClick
        rowHeight={50}
      />
    </Box>
  );
};

export default CustomDataGrid;
