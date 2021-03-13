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
  const { setOpenPopup, label, name, value, onChange } = props;

  const classes = useStyles();
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
      <Button
        variant="contained"
        color="primary"
        className={classes.newButton}
        onClick={() => setOpenPopup(true)}
      >
        +
      </Button>
    </Toolbar>
  );
};

ToolBar.propTypes = {
  setOpenPopup: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default ToolBar;
