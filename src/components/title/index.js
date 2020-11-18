import React, { Component } from 'react'
import Page from './page'
import PropTypes from 'prop-types';

class Title extends Component {
    render() {
        const {title}= this.props;
        return (
            <Page title={title}/>
        )
    }
}

export default Title;