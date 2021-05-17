import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

//Local Components
import FileTable from './components/table/index';
import RangeInput from './components/RangeInput';
import { useListEntriesQuery } from "./generated-api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

//Constants
const INIT_LT_VALUE = 100000;
const INIT_GT_VALUE = 200; 

function DataGrid() {
  const classes = useStyles();
  const [sizeGt, setSizeGt] = React.useState(INIT_GT_VALUE);
  const [sizeLt, setSizeLt] = React.useState(INIT_LT_VALUE);
  const [page, setPage] = React.useState(1);
  const [currentPath, setCurrentPath] = React.useState('/')
  const [nameFilter, setNameFilter] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('');

  const [history, updateHistory] = React.useState<{ id: string, path: string }[]>(
    [{
      id: '/',
      path: '/',
    }]
  )
  const serverData = useListEntriesQuery({
    variables: { 
      path: currentPath, 
      page, 
      where: {
        /**
         * File Size
         * @name size_gt a number value that file size should be greater than
         * @name size_lt a number value that file size should be less than
         */
        size_gt: sizeGt, // Int
        size_lt: sizeLt,

        /**
         * Entry Name Contains
         * @name name_contains an entry "name" text value to search on
         */
        name_contains: nameFilter,
        
        /**
         * Type Equals
         * @name type_eq Exact match for Entry type
         */
        type_eq: typeFilter,
      }
    },
  });
     
  const { data, loading, error } = serverData;
  
  React.useEffect(() => {
    setCurrentPath(history[history.length - 1].path)
  }, [history])

  const rows = React.useMemo(() => {
    const dataRows = data?.listEntries?.entries ?? [] as any

    return [
      ...(history.length > 1 
        ? [
            {
              id: history[history.length - 2].id,
              path: history[history.length - 2].path,
              name: 'UP_DIR',
              __typename: 'UP_DIR'
            }
          ]
        : []),
      ...dataRows,
    ]
  }, [history.length, data?.listEntries?.entries])

  const rowCount = React.useMemo(() => {
    const totalUpDirRows = currentPath === '/' 
      ? 0 
      : (data?.listEntries?.pagination.pageCount ?? 0) * 1
    const totalRowsFromServer = data?.listEntries?.pagination.totalRows ?? 0
    return  totalRowsFromServer + totalUpDirRows
  }, [
    data?.listEntries?.pagination.pageCount, 
    data?.listEntries?.pagination.totalRows
  ])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleDelete = (type: string) => {
    if(type === 'gt') setSizeGt(INIT_GT_VALUE)
    if(type === 'lt') setSizeLt(INIT_LT_VALUE)
  }

  const handleRangeChange = (value: number, type: string) => {
    if(type === 'gt') setSizeGt(value)
    if(type === 'lt') setSizeLt(value)
  }

  const _getTableCallbacks = () => {
    return {
      setPage,
      updateHistory,
      setNameFilter,
      setTypeFilter
    }
  }

  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
          <Toolbar>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h6">File Browser</Typography>
              <RangeInput
                label="File Size"
                onDelete={handleDelete}
                sizeGt={sizeGt}
                sizeLt={sizeLt}
                onChange={handleRangeChange}
              />
            </Box>
          </Toolbar>
          <FileTable
            rows={rows}
            classes={classes}
            nameFilter={nameFilter}
            typeFilter={typeFilter}
            {..._getTableCallbacks()}
          />
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={rowCount}
            rowsPerPage={25}
            page={page - 1}
            onChangePage={handleChangePage}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default DataGrid;
