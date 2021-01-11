import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import UseTable from '../usetable';
import Button from '@material-ui/core/Button';
import { Paper, Toolbar, InputAdornment, TableRow, TableCell } from '@material-ui/core';
import Popup from '../popup';
import { Search } from '@material-ui/icons';
import Notification from '../notification/Notification';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import FormMenu from './formMenu';
import BarLoader from '../barLoader/BarLoader';
import * as firestore from '../../firebase/menu';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    newButton: {
      position: 'absolute',
      right: '10px',
    },
    searchInput: {
      width: '95%',
    },
  },
}));

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'categoria', label: 'Categoría' },
  { id: 'precio', label: 'Precio' },
  { id: 'imagen', label: 'Imagen' },
];
function Menu(props) {
  const classes = useStyles();

  const { TbContainer, TbHead } = UseTable([], headCells);
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, tittle: '', subTittle: '' });
  const [loading, setLoading] = useState(false);
  const [productEdit, setProductEdit] = useState([]);
  const [menu, setMenu] = useState([]);

  const addOrEdit = (values, resetForm) => {
    setLoading(true);
    const response = firestore.addOrEditProduct(values);
    response.then(() => {
      setProductEdit(null);
      setOpenPopup(false);
      resetForm();
      setNotify({
        isOpen: true,
        message: 'Todo salió correctamete!',
        type: 'success',
      });
      setLoading(false);
    });
    firestore.getMenu();
  };
  /*
  const openInPopup = (item) => {
    setCategoriasEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setLoading(true);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const response = removeCategorie(id);
    response.then(() => {
      setNotify({
        isOpen: true,
        message: 'Eliminado con éxito.',
        type: 'error',
      });
      setLoading(false);
    });
    getMenu();
  };
   */

  useEffect(() => {
    setMenu(firestore.getMenu());
  }, []);

  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <div>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="buscar"
                variant="outlined"
                className={classes.searchInput}
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
              className={classes.newButton}
              variant="contained"
              onClick={() => setOpenPopup(true)}
            >
              +
            </Button>
          </div>
        </Toolbar>

        <TbContainer>
          <TbHead />
          <TableBody>
            {menu.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TbContainer>
      </Paper>
      <Popup title="Agregar platillo" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <FormMenu addOrEdit={addOrEdit} productEdit={productEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      {loading ? <BarLoader width={500} heigth={10} color="red" loading={loading} /> : null}
    </React.Fragment>
  );
}
export default Menu;
