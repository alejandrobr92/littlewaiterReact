import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import React, { useEffect, useState } from 'react';
import UseTable from '../usetable';
import Button from '@material-ui/core/Button';
import { Paper, TableRow, TableCell } from '@material-ui/core';
import Popup from '../popup';
import Notification from '../notification/Notification';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import FormMenu from './formMenu';
import BarLoader from '../barLoader/BarLoader';
import * as firestore from '../../firebase/menu';
import EditOutLineIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ToolBar from '../toolBar/toolBar';
import Title from '../title/Title';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: 'name', label: 'Nombre' },
  { id: 'category', label: 'Categoría' },
  { id: 'details', label: 'Detalles' },
  { id: 'photo', label: 'Foto' },
  { id: 'price', label: 'Precio' },
  { id: 'actions', label: 'Acciones' },
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
    getMenu();
  };

  const openInPopup = (item) => {
    setProductEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    console.log(id);
    setLoading(true);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const response = firestore.removeItemMenu(id);
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

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    const menu = firestore.getMenu();
    setMenu(menu);
  };
  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Title title="Menú" />
        <ToolBar setOpenPopup={setOpenPopup} />
        <TbContainer>
          <TbHead />
          <TableBody>
            {menu.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.details}</TableCell>
                <TableCell>{item.photo}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutLineIcon fontSize="small" />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        tittle: 'Esta seguro de eliminar el registro?',
                        subTittle: 'No podra recueperarlo después',
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </TableCell>
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
      {loading ? <BarLoader width={500} heigth={10} color="#c79100" loading={loading} /> : null}
    </React.Fragment>
  );
}

export default Menu;
