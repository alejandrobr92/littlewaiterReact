import React from 'react';
import { Modal, TableRow, TableCell } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UseTable from '../usetable';
import TableBody from '@material-ui/core/TableBody';
import Title from '../title/Title';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '75%',
    background: 'white',
    border: '1px solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6, 8),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textfield: {
    width: '100%',
    textAlign: 'right',
    paddingTop: theme.spacing(4),
  },
}));
const headCells = [
  { id: 1, label: 'name' },
  { id: 2, label: 'price' },
  { id: 3, label: 'quantity' },
  { id: 4, label: 'category' },
];
function Details(props) {
  const { TbContainer, TbHead } = UseTable([], headCells);
  const classes = useStyles();
  const { open, openOrCloseModal, data } = props;

  const TableCells = () => {
    if (data.lenght !== 0) {
      return (
        <TableBody>
          {data.content.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{'$ ' + item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }
  };

  const body = (
    <div className={classes.modal}>
      <Title title="Detalles" />
      <TbContainer>
        <TbHead />
        <TableCells />
      </TbContainer>
      <div className={classes.textfield}>
        <TextField
          variant="outlined"
          label="TOTAL"
          defaultValue={'$ ' + data.total}
          InputProps={{ readOnly: true }}
        />
      </div>
    </div>
  );
  return (
    <Modal aria-labelledby="detalles" open={open} onClose={openOrCloseModal}>
      {body}
    </Modal>
  );
}

Details.propTypes = {
  open: PropTypes.bool,
  openOrCloseModal: PropTypes.func,
  data: PropTypes.any,
};
export default Details;
