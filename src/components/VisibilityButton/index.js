import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles(theme => ({
    buttonVisibility: {
        position: 'absolute',
        right: '10px',
        top: '95px',
    }
}));

export const VisibilityButton = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            {props.open === true
                ? (<IconButton onClick={props.on} className={classes.buttonVisibility} aria-label="Visibility">
                    <VisibilityIcon />
                </IconButton>)
                : (<IconButton onClick={props.off} className={classes.buttonVisibility} aria-label="VisibilityOff">
                    <VisibilityOffIcon />
                </IconButton>)
            }
        </Fragment>
    )
}

VisibilityButton.propTypes = {
    open: PropTypes.bool,
    on: PropTypes.func,
    off: PropTypes.func
}