import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as PropTypes from 'prop-types';

function DatePicker(props) {
  const [values, setValues] = useState({ hireDate: new Date() });
  const { name, label } = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MMM/yyyy"
        name={name}
        value={values.hireDate}
        onChange={(date) => handleInputChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
DatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};
export default DatePicker;
