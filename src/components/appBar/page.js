import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { Fragment } from 'react';

function Page(props) {
    
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          
        </AppBar>
    )
}
export default Page;