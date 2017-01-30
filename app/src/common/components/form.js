import React, { PropTypes } from 'react'
import { TextField as FormTextField } from 'material-ui'

export function TextField ({ input, label, disabled, value, multiLine, rows, type }) {
    const width = multiLine ? '100vw' : '256px' // inline to override material-ui
    return (
        <FormTextField
            floatingLabelText={label}
            disabled={disabled}
            defaultValue={value}
            multiLine={multiLine}
            rows={rows}
            className='text_field'
            type={type}
            style={{ width: width, maxWidth: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            {...input}
        />
    )
}

TextField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    value: PropTypes.any,
}
