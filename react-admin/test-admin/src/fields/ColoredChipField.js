import React from 'react'
import { ChipField, useRecordContext } from 'react-admin'
import statusColors from 'constants/STATUS_COLORS';

const ColoredChipField = (props) => {
    const record = useRecordContext();
    return (
        <ChipField sx={{
            backgroundColor: statusColors[record[props.source]],
            color: (theme) => theme.palette.common.white,
            fontWeight: 600,
            fontSize: 16,
            padding: 1
        }}
            {...props} />
    )
}

export default ColoredChipField;