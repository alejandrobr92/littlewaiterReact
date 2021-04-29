import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import React, { useState, useEffect } from 'react';
import UseTable from '../usetable';
import Button from '@material-ui/core/Button';
import { Paper, TableRow, TableCell } from '@material-ui/core';
import Popup from '../popup';
import EditOutLineIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../notification/Notification';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import FormCategoria from './formCategoria';
import BarLoader from '../barLoader/BarLoader';
import { getCategories, addOrEditCategorie, removeCategorie } from '../../firebase/categories';
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
  buttonEdit: {
    marginRight: theme.spacing(1),
  },
  editPhone: {
    marginTop: theme.spacing(1),
  },
}));

const headCells = [
  { id: 0, label: 'Nombre' },
  { id: 1, label: 'Descripcion' },
  { id: 3, label: 'Acciones' },
];
export default function Categoria(props) {
  const classes = useStyles();
  const [categoriasEdit, setCategoriasEdit] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, tittle: '', subTittle: '' });
  const [loading, setLoading] = useState(false);
  const { TbContainer, TbHead /* , TbPagination */ } = UseTable(categorias, headCells);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const data = await getCategories();
      const response = data;
      setCategorias(response);
    } catch (error) {
      console.log('error', error);
    }
  };

  const addOrEdit = (values, resetForm) => {
    setLoading(true);
    const response = addOrEditCategorie(values);
    response
      .then(() => {
        setOpenPopup(false);
        resetForm();
        setCategoriasEdit(null);
        setNotify({
          isOpen: true,
          message: 'Todo salió correctamete!',
          type: 'success',
        });
        setLoading(false);
      })
      .catch((err) => {
        setCategoriasEdit(null);
        setOpenPopup(false);
        resetForm();
        setNotify({
          isOpen: true,
          message: 'Todo salió correctamete!',
          type: 'success',
        });
        setLoading(false);
        console.log(err);
      });
    getAllCategories();
  };

  const openInPopup = (item) => {
    setCategoriasEdit(item);
    setOpenPopup(true);
  };

  const onDelete = async (id) => {
    setLoading(true);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const response = await removeCategorie(id);
      if (response) {
        setLoading(false);
        getAllCategories();
        setNotify({
          isOpen: true,
          message: 'Eliminado con éxito.',
          type: 'error',
        });
      }
    } catch (error) {
      console.log('error', error);
      getAllCategories();
    }
    getAllCategories();
  };

  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Title title="Categoría" />
        <ToolBar
          nameContent={'categoria'}
          setOpenPopup={setOpenPopup}
          setCategoriasEdit={() => setCategoriasEdit(null)}
          setViewButton={true}
        />
        <TbContainer>
          <TbHead />
          <TableBody>
            {categorias.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.buttonEdit}
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutLineIcon fontSize="small" />
                  </Button>
                  <Button
                    variant="outlined"
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
      <Popup
        title={categoriasEdit == null ? 'Agregar categoria' : 'Actualizar categoria'}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FormCategoria categoriasEdit={categoriasEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      {loading ? <BarLoader width={500} heigth={10} color="red" loading={loading} /> : null}
    </React.Fragment>
  );
}
