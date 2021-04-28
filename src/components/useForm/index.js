import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
export function UseForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const doublePrice = Number(value);
      setValues({
        ...values,
        [name]: doublePrice,
      });
      return;
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues({
      initialFValues,
    });
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}
const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      witdh: '80%',
      margin: theme.spacing(1),
    },
  },
}));
export function Form(props) {
  const classes = useStyle();
  const { children, ...other } = props;
  return (
    <form className={classes.root} /*autoComplete="off"*/ {...other}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
};
