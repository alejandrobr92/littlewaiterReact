
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
function Page(props) {
    const {title}=props;
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {title}
        </Typography>
    )
}


export default Page;