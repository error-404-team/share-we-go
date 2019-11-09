import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { Button, InputBase } from '@material-ui/core';
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
    const [report, setReport] = useState('')

    const removeShare = () => {
        post.history.id(props.uid, props.share, dateTime);
        post.report.id(props.uid, {
            uid: props.uid,
            share_id: props.share_id,
            report: report
        }, dateTime)

        d.share.id(props.share_id, props.uid, dateTime);

        // setTimeout(() => {
        //     props.history.goBack()
        // }, 3500)

    }

    const onChange = (e) => {
        setReport(e.target.value)
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
                                {/* <p>ต้องการให้คำแนะนำ</p> */}
                                <InputBase
                                    placeholder="ต้องการให้คำแนะนำ"
                                    style={{
                                        backgroundColor: 'darkkhaki',
                                        padding: '0px 10px'
                                    }}
                                    value={report}
                                    onChange={onChange}
                                ></InputBase>
                                <br></br>
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