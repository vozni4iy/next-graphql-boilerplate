import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types';
import { basicStyle, errorStyle, warnStyle, inputStyle, underlineStyle } from 'src/components/styled/materialStyles'

const FormInput = ({input, label, style, meta: { touched, error, warning }, ...custom}) => (
  <TextField hintText={label}
    id={input.name + '_formInput'}
    style={style ? style : basicStyle}
    errorText={touched && error || warning}
    errorStyle={error ? errorStyle : warnStyle}
    inputStyle={inputStyle }
    underlineFocusStyle={underlineStyle}
    {...input}
    {...custom}
  />
)

FormInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  style: PropTypes.object
};

export default FormInput
