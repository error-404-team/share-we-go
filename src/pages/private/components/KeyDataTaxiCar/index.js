import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #ffc800',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

const KeyDataTaxiCar = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Grid container justify="center" alignItems="center" >
                            <center>
                                <h1>ทะเบียนรถ</h1>
                                <h2>{props.license_plate}</h2>
                                <h1>สีรถ</h1>
                                <h2>{props.select}</h2>
                            </center>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )

}



KeyDataTaxiCar.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    data_doc: PropTypes.object
}

export default KeyDataTaxiCar