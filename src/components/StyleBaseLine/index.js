import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// core lib
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

// style
const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${window.innerWidth}px)`,
        // marginLeft: drawerWidth,
        backgroundColor: "rgba(0,0,0,0.4)",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}))

export const StyleBaseLine = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <div className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
            })} >
                {props.children}
            </div>
        </Fragment>
    )
}

StyleBaseLine.propTypes = {
    open: PropTypes.bool
}