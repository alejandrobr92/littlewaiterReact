import React from 'react';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ToolBar = (props) => {
  const { setOpenPopup, title } = props;
  return (
    <Toolbar>
      <div>
          <h1>{title}</h1>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Buscar:"
            variant="outlined"
            //className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
      <div>
        <Button
          // className={classes.newButton}
          variant="contained"
          onClick={() => setOpenPopup(true)}
        >
          +
        </Button>
      </div>
    </Toolbar>
  );
};

ToolBar.propTypes = {
  setOpenPopup: PropTypes.func,
  title: PropTypes.string,
};
export default ToolBar;
