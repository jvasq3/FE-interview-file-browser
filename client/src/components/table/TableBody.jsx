import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

export default (props) => {
    const {
        setPage,
        updateHistory,
        rows
    } = props;
    
    const _generateRows = () => {
        return rows.map(({ path, __typename, name, size, id, lastModified }) => {
            const isUpDir = __typename === 'UP_DIR'
            return (
                <TableRow key={id}>
                    <TableCell component="th" scope="row">
                        <Button
                            color="primary"
                            disabled={__typename === 'File'}
                            startIcon={isUpDir
                                ? (<ArrowBackIcon />)
                                : (__typename === 'File' ? null : <SubdirectoryArrowRightIcon />)
                            }
                            onClick={() => {
                                updateHistory((h) => {
                                    if (isUpDir && h.length > 1) {
                                        setPage(1)
                                        return [...h.splice(0, h.length - 1)]
                                    } else {
                                        return ([...h, { id: path, path }])
                                    }
                                })
                            }}
                        >
                            {!isUpDir ? path : `Back to ${path}`}
                        </Button>
                    </TableCell>
                    <TableCell align="right">{isUpDir ? '_' : name}</TableCell>
                    <TableCell align="right">{isUpDir ? '_' : __typename}</TableCell>
                    <TableCell align="right">{isUpDir ? '_' : size}</TableCell>
                    <TableCell align="right">{isUpDir ? '_' : lastModified}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <TableBody>
            {_generateRows()}
        </TableBody>
    )
}