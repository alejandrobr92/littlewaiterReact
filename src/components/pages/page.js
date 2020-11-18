
import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core';
import { Form, UseForm } from '../useForm';


const initialFValues = {
    id: 0,
    name: '',
    email: '',

}
function Page(props) {

    const validate = () => {
        let temp = {};
        temp.name = values.name ? "" : "Este campo es requerido"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x =="")
   
    }
    const { values, setValues, errors, setErrors, handleInputChange } = UseForm(initialFValues);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
        window.alert('testing...')
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Name"
                        name="name"
                        error
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        helperText="some validation error."

                    />
                    <div>
                        <Button
                            type="submit"
                            text="submit"
                            variant="contained"
                            size="large"
                            color="primary"

                        >
                            Enviar
                    </Button>
                    </div>
                </Grid>

            </Grid>
        </Form>
    )
}


export default Page;