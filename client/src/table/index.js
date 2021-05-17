import React from "react";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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