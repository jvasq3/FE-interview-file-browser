import React from "react";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

import FileTableBody from './TableBody';
import FileTableHeader from './TableHeader'

export default (props) => {
    const {
        rows,
        classes,
        setPage,
        updateHistory,
        setNameFilter,
        typeFilter,
        setTypeFilter
    } = props;

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <FileTableHeader typeFilter={typeFilter} setNameFilter={setNameFilter} setTypeFilter={setTypeFilter}/>
                <FileTableBody rows={rows} updateHistory={updateHistory} setPage={setPage} />
            </Table>
        </TableContainer>
  )
}