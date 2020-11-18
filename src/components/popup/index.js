import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core'
export default function Popup(props){
    const {title, children, openPopup,setOpenPopup}=props

    const useStyles=makeStyles(theme =>({
        dialogWrapper:{
            padding:theme.spacing(2),
            position:'absolute',
            top: theme.spacing(5)
        }
    })
        )

        const classes= useStyles();
    return(
        <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.dialogWrapper}}>
            <DialogTitle>
                <div>
                    <Typography variant="h6" component="div">
                    {title}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent>
            {children}
            </DialogContent>
        </Dialog>

    )
}