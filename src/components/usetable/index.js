import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      //color: theme.palette.primary.main,
      //backgroundColor: theme.palette.primary.light,
      color: 'white',
      backgroundColor: '#c79100',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

export default function UseTable(records, headCells) {
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  // const [order, setOrder] = useState();
  // const [orderBy, setOrderBy] = useState();

  const TbContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };
  TbContainer.propTypes = {
    children: PropTypes.node,
  };
  const TbHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const TbPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.lenght}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
  const recordAferPaginationAndSorting = () => {
    return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  return {
    TbContainer,
    TbHead,
    TbPagination,
    recordAferPaginationAndSorting,
  };
}
