import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { post, d } from '../../../../../../RESTful_API'
import { dateTime } from '../../../../../../module';

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

const ModelExitShare = (props) => {
    const classes = useStyles();

    const removeShare = () => {
        post.history.id(props.uid,props.share,dateTime);

        d.share.member(props.share_id, props.uid, dateTime);

        // setTimeout(() => {
        //     props.history.goBack()
        // }, 3500)

    }
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
                                <h1>คุณต้องการอยากจะออกจากกลุ่มแชร์</h1>

                                <Button onClick={removeShare} >ตกลง</Button>
                            </center>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )

}



ModelExitShare.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
}

export default withRouter(ModelExitShare)