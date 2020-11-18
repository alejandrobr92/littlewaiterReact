import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Title from '../title';
import React, { Fragment, useState } from 'react';
import UseTable from '../usetable'
import Button from '@material-ui/core/Button';
import { Paper, Toolbar } from '@material-ui/core';
import Popup from "../popup"
import UserForm from '../pages';



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
    newButton:{
        position:"absolute",
        right: "10px"
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
    const [openPopup, setOpenPopup]=useState(false)
    const [records, setRecords] = useState()
    const { TbContainer, TbHead } = UseTable(records, headCells);
    return (
        <React.Fragment>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="buscar" />
                    </form>
                    <Button 
                    className={classes.newButton}
                    variant="contained"
                    onClick={()=>setOpenPopup(true)}
                    >+</Button>
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
            title="Agregar"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
                <UserForm/>
            </Popup>
        </React.Fragment>
    )
}
export default Page;