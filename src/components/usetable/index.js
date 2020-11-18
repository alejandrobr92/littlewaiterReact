import React, { Component, useState } from 'react'
import Page from './page'
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TablePagination } from '@material-ui/core';

export default function UseTable(records, headCells) {

    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder]=useState()
    const [orderBy, setOrderBy]=useState()
    const TbContainer = props => (
        <Table>
            {props.children}
        </Table>
    )
    const TbHead = props => {
        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell key={headCell.id}>
                                {headCell.label}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage =event=>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
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
    )
    const recordAferPaginationAndSorting=()=>{
        return records.slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }
    return {
        TbContainer,
        TbHead,
        TbPagination,
        recordAferPaginationAndSorting

    }
}