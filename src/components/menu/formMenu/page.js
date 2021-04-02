import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Form, UseForm } from '../../useForm';
import * as dataService from '../../../data/dataService';

const initialFValues = {
  id: '',
  name: '',
  category: '',
  price: 0,
  details: '',
  photo: 'http://weneedfun.com/wp-content/uploads/2015/10/Delicious-Food-Photos-12.jpg',
};
function Page(props) {
  const { productEdit, addOrEdit } = props;
  const { values, setValues, errors, handleInputChange, resetForm } = UseForm(initialFValues);
  const dataSelect = dataService.default;

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setValues({
          photo: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (productEdit != null) {
      setValues({
        ...productEdit,
      });
    }
  }, [productEdit]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            label="Nombre"
            name="name"
            fullWidth
            margin="normal"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            helperText="some validation error."
          />
          <div>
            <FormControl required variant="outlined">
              <InputLabel shrink>Categoria</InputLabel>
              <Select
                label="Category"
                name="category"
                value={values.category}
                onChange={handleInputChange}
              >
                <MenuItem value="" disabled>
                  None
                </MenuItem>
                {dataSelect.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Precio"
              name="price"
              value={values.price}
              onChange={handleInputChange}
              error={errors.name}
              helperText="some validation error."
            />
          </div>
          <div>
            <TextField
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Descripción"
              multiline
              rows={5}
              name="details"
              value={values.details}
              onChange={handleInputChange}
              error={errors.name}
              helperText="some validation error."
            />
          </div>
          <div>
            <TextField
              required
              fullWidth
              margin="normal"
              type="file"
              variant="outlined"
              name="photo"
              onChange={handleInputChange}
              error={errors.name}
              helperText="some validation error."
              accept="image/*"
              onChangeImg={imageHandler}
            />
          </div>
          <div>
            <img
              src={values.photo}
              alt="imagen"
              id=""
              className="img"
              style={{ width: 400, height: 265 }}
            />
          </div>
          <div>
            <Button type="submit" text="submit" variant="contained" size="large" color="primary">
              Enviar
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

Page.propTypes = {
  addOrEdit: PropTypes.func,
  productEdit: PropTypes.any,
};
export default Page;
