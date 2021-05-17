import React from "react";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

export default (props) => {
    const {
        onDelete,
        onChange,
        sizeGt,
        sizeLt,
        label
    } = props;

    return (
        <Box>
            <Chip
                color="primary"
                onDelete={() => onDelete('gt')}
                label={
                    <Box>
                        <strong>{label} &gt;</strong>
                        <input
                            // onChange={(e) => setSizeGt(Number(e.currentTarget.value))} 
                            onChange={e => onChange(Number(e.target.value), 'gt')}
                            type="number"
                            value={sizeGt}
                            style={{
                                marginLeft: 8,
                                background: 'transparent',
                                color: 'white',
                                border: 'none',
                                width: 80,
                            }}
                        />
                    </Box>
                }
            />
            <Chip
                color="primary"
                onDelete={() => onDelete('lt')}
                label={
                    <Box>
                        <strong>{label} &lt;</strong>
                        <input
                            onChange={e => onChange(Number(e.target.value), 'lt')}
                            type="number"
                            value={sizeLt}
                            style={{
                                marginLeft: 8,
                                background: 'transparent',
                                color: 'white',
                                border: 'none',
                                width: 80,
                            }}
                        />
                    </Box>
                }
            />
        </Box>
    );
}