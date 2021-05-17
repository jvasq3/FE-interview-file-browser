import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => {
    const {
        setNameFilter,
        setTypeFilter,
        typeFilter
    } = props;

    const _setTypeFilter = (e) => {
        let returnValue = e.target.value;

        if(e.target.value === 'All'){
            returnValue = '';
        }
        setTypeFilter(returnValue)
    }
    const _renderEmptyCell = () => (
        <TableCell align='right'/>
    )

    return (
        <TableHead>
            <TableRow>
                <TableCell>Path</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Last Modified</TableCell>
            </TableRow>
            <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">
                    <TextField
                        label="Name Filter"
                        id="name-filter"
                        onChange={(event) => {
                            setNameFilter(event.target.value);
                        }}
                    />
                </TableCell>
                <TableCell align="right">
                    <Select
                        labelId="type-filter-id"
                        value={typeFilter}
                        onChange={_setTypeFilter}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Directory"}>Directory</MenuItem>
                        <MenuItem value={"File"}>File</MenuItem>
                    </Select>
                </TableCell>
                {_renderEmptyCell()}
                {_renderEmptyCell()}
            </TableRow>
        </TableHead>
    )
}