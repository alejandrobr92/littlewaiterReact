import React, { useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { Form, UseForm } from '../../useForm';
import { makeStyles } from '@material-ui/core';

const initialFValues = {
  id: '',
  nombre: '',
  descripcion: '',
};
const useStyles = makeStyles((theme) => ({
  btnAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1, 0, 0, 1),
  },
}));

const Page = (props) => {
  const classes = useStyles();
  const { categoriasEdit, addOrEdit } = props;
  const { values, setValues, errors, handleInputChange, resetForm } = UseForm(initialFValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (categoriasEdit != null) {
      setValues({
        ...categoriasEdit,
      });
    }
  }, [categoriasEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        required
        variant="outlined"
        label="Nombre"
        name="nombre"
        fullWidth
        margin="normal"
        value={values.nombre || ''}
        onChange={handleInputChange}
        error={errors.name}
        helperText="some validation error."
      />
      <TextField
        required
        fullWidth
        margin="normal"
        variant="outlined"
        label="Descripcion"
        multiline
        rows={3}
        name="descripcion"
        value={values.descripcion || ''}
        onChange={handleInputChange}
        error={errors.name}
        helperText="some validation error."
      />
      <Button
        type="submit"
        text="submit"
        variant="contained"
        size="large"
        color="primary"
        className={classes.btnAdd}
      >
        {categoriasEdit == null ? 'Guardar' : 'Actualizar'}
      </Button>
    </Form>
  );
};

Page.propTypes = {
  categoriasEdit: PropTypes.any,
  addOrEdit: PropTypes.func,
};

export default Page;
