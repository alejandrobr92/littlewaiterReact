import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import { useAuth } from '../../firebase/login';
import { useHistory } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    //backgroundColor: '#ffc107',
    backgroundColor: '#c79100',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  LogoutTitle: {
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

const AppBars = (props) => {
  const classes = useStyles();
  const { handleDrawerOpen, open } = props;
  const { logOut } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    try {
      await logOut();
      history.push('/login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
          Admin Little Waiter
        </Typography>

        <IconButton color="inherit" onClick={handleLogOut}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.LogoutTitle}
          >
            Log out
          </Typography>
          <LockOpenIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

AppBars.propTypes = {
  handleDrawerOpen: PropTypes.func,
  open: PropTypes.bool,
};

export default AppBars;
