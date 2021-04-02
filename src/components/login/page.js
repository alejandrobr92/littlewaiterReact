import React, { Fragment, useState, useEffect } from 'react';
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
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import './styles.css';
import { signIn, onAuthUser } from '../../firebase/login';
import { useHistory } from 'react-router-dom';

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
}));

function Page(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [currentUser,setCurrentUser] = useState(null);
  const [rememberme, setRememberMe] = useState(false);
  const history = useHistory();

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const passChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleCheck = (e) => {
    const value = e.target.value;
    setRememberMe(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      history.push('/dashboard');
    } catch (error) {
      console.log('error login....', error);
    }
  };

  useEffect(() => {
    onAuthUser();
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <div className="card-container">
        <Card className="card">
          <CardContent>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar sesión
              </Typography>
            </div>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={emailChangeHandler}
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
                autoComplete="current-password"
                value={password}
                onChange={passChangeHandler}
              />
              <FormControlLabel
                control={<Checkbox value={rememberme} color="primary" onChange={handleCheck} />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
export default Page;
