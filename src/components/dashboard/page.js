import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Categoria from '../categoria/categoria';
import Menu from '../menu';
// import * as PropTypes from 'prop-types';
import Copyright from '../copyRight/CopyRight';
import AppBars from '../appBar/AppBars';
import Drawers from '../drawers/Drawers';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
function Page(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState('Categorias');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadComponent = () => {
    switch (component) {
      case 'Menu':
        return <Menu />;
      case 'Categorias':
        return <Categoria />;
      default:
        break;
    }
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBars handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawers handleDrawerClose={handleDrawerClose} open={open} setComponent={setComponent} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {loadComponent()}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
export default Page;
