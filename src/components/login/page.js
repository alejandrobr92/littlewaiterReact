import React, { Fragment, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './styles.css';
import { useAuth } from '../../firebase/login';
import { Redirect, useHistory } from 'react-router-dom';
import Notification from '../notification/Notification';
import { Form, UseForm } from '../useForm';
import BarLoader from '../barLoader/BarLoader';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentImage: {
    width: '100px',
    height: '70px',
    margin: theme.spacing(3, 0, 0),
    padding: theme.spacing(1, 2, 0),
  },
  contentLoader: {
    width: '250px',
    height: '10px',
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

const initialFValues = {
  email: '',
  password: '',
  rememberme: false,
};
function Page(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { currentUser, notify, setNotify, signIn } = useAuth();
  const { values, handleInputChange } = UseForm(initialFValues);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      setLoading(false);
      history.push('/dashboard');
    } catch (error) {
      console.log('error login....', error);
      setLoading(false);
    }
  };
  const Loader = () => (
    <div className={classes.container}>
      <div className={classes.contentImage}>
        <img src={'https://i.imgur.com/qundQaI.gif'} alt="logo" width="75px" heigth="15px" />
      </div>
      <div className={classes.contentLoader}>
        <BarLoader width={250} heigth={4} color={'#FBA100'} loading={loading} />
      </div>
    </div>
  );
  if (currentUser !== null) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-container">
          <CssBaseline />
          <Card className="card" elevation={7}>
            <CardContent>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Iniciar sesión
                </Typography>
              </div>
              <Form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoFocus
                  value={values.email}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={values.rememberme}
                      color="primary"
                      onChange={handleInputChange}
                    />
                  }
                  label="Recordarme"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Enviar
                </Button>
              </Form>
            </CardContent>
          </Card>
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      )}
    </Fragment>
  );
}
export default Page;
