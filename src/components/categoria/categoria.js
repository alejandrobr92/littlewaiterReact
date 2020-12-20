import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
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
import firebase from '../../firebase'
import BarLoader from '../barLoader/BarLoader'


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
        const db = firebase.firestore()
        const unsubcribe = db.collection("Restaurantes/SYUV0oVZZp2Ndqc3Fx7h/categories")
            .onSnapshot((snapshot) => {
                const data = []
                snapshot.forEach(doc =>
                    data.push(doc.data()))
                setCategorias(data)

            })
        return unsubcribe;
    }, [])


    const addOrEdit = (values, resetForm) => {
        const db = firebase.firestore()
        setLoading(true)
        if (values.id !== "") {
            const categoriaEdit = db.collection("Restaurantes/SYUV0oVZZp2Ndqc3Fx7h/categories").doc(values.id)
            return categoriaEdit.update(values)
                .then(function () {
                    resetForm()
                    setCategoriasEdit(null)
                    setOpenPopup(false)
                    setNotify({
                        isOpen: true,
                        message: 'Actualizado correctamente',
                        type: 'success'
                    })
                    setLoading(false)
                    console.log('Document successfully updated!')
                })
                .catch(function (error) {
                    resetForm()
                    setCategoriasEdit(null)
                    setOpenPopup(false)
                    setLoading(false)
                    setNotify({
                        isOpen: true,
                        message: 'Actualizado correctamente',
                        type: 'success'
                    })
                    setLoading(false)
                    console.log("Error updating document: ", error)
                })
        }
        else {
            const nuevaCategoria = db.collection("Restaurantes/SYUV0oVZZp2Ndqc3Fx7h/categories").doc()
            return nuevaCategoria.set(({ ...values, id: nuevaCategoria.id }))
                .then(function (docRef) {
                    resetForm()
                    setOpenPopup(false)
                    setCategoriasEdit(null)
                    setNotify({
                        isOpen: true,
                        message: 'Agregado correctamente!',
                        type: 'success'
                    })
                    setLoading(false)
                })
                .catch(function (error) {
                    resetForm()
                    setCategoriasEdit(null)
                    setOpenPopup(false)
                    setNotify({
                        isOpen: true,
                        message: 'Success',
                        type: 'success'
                    })
                    setLoading(false)
                    console.log('error document', error)
                })
        }

    }


    const openInPopup = item => {
        setCategoriasEdit(item)
        setOpenPopup(true)
    }

    const onDelete = (id) => {
        const db = firebase.firestore()
        setLoading(true)
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        db.collection("Restaurantes/SYUV0oVZZp2Ndqc3Fx7h/categories").doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                setLoading(false)
                setNotify({
                    isOpen: true,
                    message: 'Eliminado con éxito.',
                    type: 'error'
                })
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            })
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
