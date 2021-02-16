import React, { useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { Form, UseForm } from '../../useForm';
// import firebase from '../../../firebase';

const initialFValues = {
  id: '',
  nombre: '',
  descripcion: '',
};
const Page = (props) => {
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
      <Grid container>
        <Grid item xs={12}>
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
          <div>
            <TextField
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Descripcion"
              multiline
              rows={5}
              name="descripcion"
              value={values.descripcion || ''}
              onChange={handleInputChange}
              error={errors.name}
              helperText="some validation error."
            />
          </div>
          <div>
            <Button type="submit" text="submit" variant="contained" size="large" color="primary">
              {categoriasEdit == null ? 'Guardar' : 'Actualizar'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

Page.propTypes = {
  categoriasEdit: PropTypes.object,
  addOrEdit: PropTypes.func,
};

export default Page;
