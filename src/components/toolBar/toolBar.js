import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));
const ToolBar = (props) => {
  const { setOpenPopup, label, name, value, onChange, setViewButton, addNewItem } = props;
  const classes = useStyles();

  const button = () => {
    if (setViewButton) {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.newButton}
          onClick={() => {
            setOpenPopup(true), addNewItem;
          }}
        >
          +
        </Button>
      );
    }
  };
  return (
    <Toolbar>
      <TextField
        id="standard-basic"
        label={label || 'Buscar:'}
        variant="outlined"
        name={name || 'buscar'}
        value={value || ''}
        type="search"
        onChange={onChange}
        className={classes.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      {button()}
    </Toolbar>
  );
};

ToolBar.propTypes = {
  setOpenPopup: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setViewButton: PropTypes.bool,
  addNewItem: PropTypes.any,
};
export default ToolBar;
