import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, makeStyles } from '@material-ui/core'


const useStyles= makeStyles(theme=>({
    root:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogTittle:{
        textAlign:'center'
    },
    dialogContent:{
        textAlign:'center'
    },
    dialogAction:{
        justifyContent:'center'
    }
}))
export default function ConfirmDialog(props){
    
    const { confirmDialog, setConfirmDialog } = props
    const classes=useStyles();
    return(
        <Dialog open={confirmDialog.isOpen} className={classes.root}>
            <DialogTitle className={classes.dialogTittle}>
            
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.tittle}
                </Typography>
                <Typography variant="subtittle2">
                    {confirmDialog.subTittle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
            <Button
            color="default"
            onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}
            >
                No
            </Button>
            <Button
            color="secondary"
            onClick={confirmDialog.onConfirm}
            >
                Si
            </Button>
            </DialogActions>
        </Dialog>
        
    )
}