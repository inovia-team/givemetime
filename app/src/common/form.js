import React, { PropTypes } from 'react'
import { TextField as FormTextField } from 'material-ui'

export function TextField ({ input, label, disabled, value }) {
    return (
        <FormTextField
            floatingLabelText={label}
            disabled={disabled}
            defaultValue={value}
            {...input}
        />
    )
}

TextField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.any,
}