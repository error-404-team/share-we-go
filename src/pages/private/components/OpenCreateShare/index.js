import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// core lib
import { makeStyles, useTheme } from '@material-ui/core/styles';

// tag lib
import Drawer from '@material-ui/core/Drawer';

import { Loading } from './components/Loading';
import ShareLocation from '../../../share_location';


// style
const useStyles = makeStyles(theme => ({
    drawer: {
        width: (window.innerWidth),
        flexShrink: 0,
    },
    drawerPaper: {
        width: (window.innerWidth),
    },
    drawerHeader: {
        display: 'contents',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}))

function OpenCreateShare(props) {


    const classes = useStyles();




    return (
        <Fragment>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="buttom"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {props.open !== null
                    ? (<Fragment>
                        <div className={classes.drawerHeader}>
                            <ShareLocation onClose={props.onClose} />
                        </div>
                    </Fragment>)
                    : (<Loading onClose={props.onClose} />)
                }
            </Drawer>
        </Fragment>
    )
}

OpenCreateShare.protoType = {
    open: PropTypes.bool,
    onClose: PropTypes.func
}

export default OpenCreateShare;