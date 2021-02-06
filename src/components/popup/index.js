import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5),
    },
    dialogTittle: {
      paddingRight: '0px',
    },
  }));

  const classes = useStyles();
  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTittle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

Popup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
};
