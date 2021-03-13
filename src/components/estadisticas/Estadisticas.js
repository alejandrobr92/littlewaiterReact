import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Form, DatePicker } from '../datepicker/DatePicker';
import Toolbar from '../toolBar/toolBar';
import UseTable from '../usetable';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import { Paper, TableRow, TableCell, Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getSells } from '../../firebase/sells';
import Title from '../title/Title';
import Details from '../estadisticas/Details';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  root2: {
    flexGrow: 1,
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: 0, label: 'id pedido' },
  { id: 1, label: 'Total' },
  { id: 2, label: 'Mesa' },
  { id: 3, label: 'Fecha' },
  { id: 4, label: 'Acciones' },
];
const initialFValues = {
  fechaIncio: new Date(),
  fechaFin: new Date(),
};
function Estadisticas() {
  const { values, handleInputChange } = DatePicker(initialFValues);
  const { TbContainer, TbHead /* , TbPagination */ } = UseTable([], headCells);
  const [ventas, setVentas] = useState([]);
  const [filterFn, setFilterFn] = useState('');
  const [modal, setModal] = useState(false);
  const [ventaDetail, setVentaDetail] = useState([]);

  useEffect(() => {
    getAllSells();
  }, []);

  const getAllSells = () => {
    const data = getSells();
    setVentas(data);
  };

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFn(target.value);
  };
  const openModal = () => {
    setModal(!modal);
  };
  const handleOpenModal = (venta) => {
    setVentaDetail(venta);
    openModal();
  };
  const convertTime = (timestamp) => {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy;
    return date;
  };
  const TableRows = () => {
    const columns = ventas[0] && Object.keys(ventas[0]);
    return (
      <TableBody>
        {ventas
          .filter((item) => {
            if (filterFn == '') {
              return item;
            } else {
              return columns.some((column) =>
                item[column].toString().toLowerCase().includes(filterFn.toLowerCase()),
              );
            }
          })
          .map((venta) => (
            <TableRow key={venta.id}>
              <TableCell>{venta.id}</TableCell>
              <TableCell>{'$ ' + venta.total}</TableCell>
              <TableCell>{venta.table}</TableCell>
              <TableCell>{convertTime(venta.time)}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenModal(venta)}
                >
                  <VisibilityIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent}>
      <Title title="Estadísticas" />
      <Grid container className={classes.root2} spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={4}>
            <Form
              name="fechaIncio"
              label="Fecha inicio"
              value={values.fechaIncio}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Form
              name="fechaFin"
              label="Fecha fin"
              value={values.fechaFin}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Toolbar value={filterFn} onChange={handleSearch} />
          </Grid>
        </Grid>
      </Grid>
      <TbContainer>
        <TbHead />
        <TableRows />
      </TbContainer>
      <Details open={modal} openModal={openModal} data={ventaDetail} />;
    </Paper>
  );
}
export default Estadisticas;
