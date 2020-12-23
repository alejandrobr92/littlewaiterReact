import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import UseTable from '../usetable'
import Button from '@material-ui/core/Button';
import { Paper, Toolbar, InputAdornment, TableRow, TableCell } from '@material-ui/core';
import Popup from "../popup"
import { Search } from '@material-ui/icons'
import EditOutLineIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Notification from '../notification/Notification';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import FormCategoria from './formCategoria';
import BarLoader from '../barLoader/BarLoader'
import { getCategories, addOrEditCategorie, removeCategorie } from '../../firebase/categories'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        position: "absolute",
        right: "10px"
    },
    searchInput: {
        width: "95%"
    }
}));

const headCells = [
    { id: 0, label: 'Nombre' },
    { id: 1, label: 'Descripcion' },
    { id: 3, label: 'Acciones' },
]
export default function Categoria(props) {
    const classes = useStyles();
    const [categoriasEdit, setCategoriasEdit] = useState([])
    const [categorias, setCategorias] = useState([])
    const { TbContainer, TbHead, TbPagination } = UseTable(categorias, headCells);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, tittle: '', subTittle: '' })
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        const data = getCategories()
        setCategorias(data)
    }

    const addOrEdit = (values, resetForm) => {
        
            setLoading(true)
            const response = addOrEditCategorie(values)
            response.then(() => {
                setCategoriasEdit(null)
                setOpenPopup(false)
                resetForm()
                setNotify({
                    isOpen: true,
                    message: 'Todo salió correctamete!',
                    type: 'success'
                })
                setLoading(false)
            })
            getAllCategories()
        
    }


    const openInPopup = item => {
        setCategoriasEdit(item)
        setOpenPopup(true)
    }

    const onDelete = (id) => {
      
            setLoading(true)
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false
            })
            const response = removeCategorie(id)
            response.then(() => {
                setNotify({
                    isOpen: true,
                    message: 'Eliminado con éxito.',
                    type: 'error'
                })
                setLoading(false)
            })
            getAllCategories()

    }


    return (
        <React.Fragment>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="buscar" variant="outlined"
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                                }}
                            />
                        </form>
                    </div>

                    <div>
                        <Button
                            color="default"
                            className={classes.newButton}
                            variant="contained"
                            onClick={() => { setOpenPopup(true); setCategoriasEdit(null); }}
                        >+</Button>
                    </div>
                </Toolbar>
                <TbContainer>
                    <TbHead />
                    <TableBody>
                        {

                            categorias.map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.descripcion}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}
                                    >
                                        <EditOutLineIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                tittle: 'Esta seguro de eliminar el registro?',
                                                subTittle: "No podra recueperarlo después",
                                                onConfirm: () => { onDelete(item.id) }
                                            })
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </Button>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TbContainer>
            </Paper>
            <Popup
                title={categoriasEdit == null ? "Agregar categoria" : "Actualizar categoria"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <FormCategoria
                    categoriasEdit={categoriasEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            {loading ? <BarLoader width={500} heigth={10} color='red' loading={loading} /> : null}

        </React.Fragment>
    )
}
