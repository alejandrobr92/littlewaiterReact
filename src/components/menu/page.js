import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import UseTable from '../usetable'
import Button from '@material-ui/core/Button';
import { Paper, Toolbar, InputAdornment } from '@material-ui/core';
import Popup from "../popup"
import { Search } from '@material-ui/icons'
import Notification from '../notification/Notification';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import FormMenu from './formMenu';



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
    { id: 'fullName', labe: 'E TbContainername' },
    { id: 'email', labe: 'Email Address' },
    { id: 'mobile', labe: 'Mobil Number' },
    { id: 'department', labe: 'Department' },
]
function Page(props) {
    const classes = useStyles();
    const [records, setRecords] = useState()

    const { TbContainer, TbHead } = UseTable(records, headCells);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, tittle: '', subTittle: '' })

    
    // const addOrEdit = (data, resetData) => {
    //     setNotify({
    //         isOpen:true,
    //         message:'Success', 
    //         type:'success'
    //     })
    // }
    const addOrEdit = obj=> {
        // setNotify({
        //     isOpen:true,
        //     message:'Success',
        //     type:'success'
        // })
    }

    const onDelete = id => {

        // setConfirmDialog({
        //     ...confirmDialog,
        //     isOpen: false
        // })

        // setNotify({
        //     isOpen:true,
        //     message:'Success',
        //     type:'error'
        // })
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
                            className={classes.newButton}
                            variant="contained"
                            onClick={() => setOpenPopup(true)}
                        >+</Button>
                    </div>
                </Toolbar>
                <TbContainer>
                    <TableHead />
                    <TableBody>
                        {/* {
                    array.map(item=>
                        (<TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>)
                        )
                    
                    
                    } */}
                    </TableBody>
                </TbContainer>
            </Paper>
            <Popup
                title="Agregar platillo"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <FormMenu
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
        </React.Fragment>
    )
}
export default Page;