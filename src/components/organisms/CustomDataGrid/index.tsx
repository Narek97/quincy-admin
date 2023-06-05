import Box from '@mui/material/Box/Box';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import { FC } from 'react';



interface ICutomGrid {
  columns: any;
  rows: any;
  rowCount:any;
  paginationModel:any;
  handlePageChange: any;
  handleSortChange: (ev: GridSortModel) => void;
  isLoading: boolean;
}

const CustomDataGrid: FC<ICutomGrid> = ({
  columns,
  rows,
  rowCount,
  paginationModel,
  handlePageChange,
  handleSortChange,
  isLoading
}) => {

 
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
      />
    </Box>
  );
};

export default CustomDataGrid;
