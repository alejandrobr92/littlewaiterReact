import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchInput: {
    width: '100%',
    pointerEvents: 'none',
    display: 'flex',
    transition: theme.transitions.create('width'),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const ToolBar = (props) => {
  const {
    setOpenPopup,
    label,
    name,
    value,
    onChange,
    setViewButton,
    setCategoriasEdit,
    setProductEdit,
    nameContent,
  } = props;
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const contentReset = () => {
    switch (nameContent) {
      case 'categoria':
        setCategoriasEdit();
        break;
      case 'menu':
        setProductEdit();
        break;
      default:
        break;
    }
  };
  const Buton = (e) => {
    return (
      setViewButton && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setOpenPopup(true);
            contentReset();
          }}
        >
          +
        </Button>
      )
    );
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Buton />
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <Toolbar variant="regular">
        <div className={classes.search}>
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
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Buton />
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
      {renderMobileMenu}
    </div>
  );
};

ToolBar.propTypes = {
  setOpenPopup: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setViewButton: PropTypes.bool,
  setCategoriasEdit: PropTypes.func,
  setProductEdit: PropTypes.func,
  nameContent: PropTypes.string,
};
export default ToolBar;
