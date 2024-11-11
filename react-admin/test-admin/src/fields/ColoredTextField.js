import React from 'react'
import { TextField, useRecordContext } from 'react-admin'
import statusColors from 'constants/STATUS_COLORS';

const ColoredTextField = (props) => {
    const record = useRecordContext();
    return (
        <TextField sx={{
            color: statusColors[record[props.source]],
            fontSize: 16,
        }}
            {...props} />
    )
}

export default ColoredTextField;