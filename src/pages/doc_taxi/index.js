import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import MenuItem from '@material-ui/core/MenuItem';

// import Personalform from "../components/personalInformation";
import Button from '@material-ui/core/Button';
import { Link, withRouter } from "react-router-dom";
import firebase from "../../connect/firebase";
import { post } from '../../RESTful_API';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DocTaxiBar from './components/DocTaxiBar';
import { dateTime } from '../../module';

class DocTaxi extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            select: 'เหลือง',
            license_plate: ""
        }

        this.displayNameInput = React.createRef()
        this.emailInput = React.createRef()
        this.sexInput = React.createRef()
        this.ageInput = React.createRef()
    }


    InputUpdate(e) {
        this.setState({ license_plate: e.target.value })
    }



    goBack() {
        // Router.back()
    }

    onEdit() {

        this.setState({ statusEdit: false })
    }

    handleChange = (e) => {
        this.setState({ select: e.target.value })
    }



    onSend() {


        firebase.auth().onAuthStateChanged((user) => {

            post.share.alert(user.uid, {
                uid: `${user.uid}`,
                sahre_id: `${user.uid}`,
                select: `${this.state.select}`,
                license_plate: `${this.state.license_plate}`

            }, dateTime)

            post.status.alert(user.uid, {
                uid: `${user.uid}`,
                share_id: `${user.uid}`,
                value: 'true'
            }, dateTime)
        })
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>

                <div className={classes.drawerHeader}>
                    <DocTaxiBar>
                        <IconButton onClick={this.props.history.goBack} style={{ position: "absolute", left: 0 }}>
                            <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        <div
                            style={{
                                position: 'absolute',
                                left: (window.innerWidth / 2.5),
                            }}
                        >
                            <h2>ข้อมูลรถ</h2>
                        </div>
                    </DocTaxiBar>
                    <Grid container justify="center" alignItems="center"
                        style={{
                            position: 'absolute',
                            top: (window.innerHeight / 4),
                        }}
                    >
                        <center>
                            <h1>ทะเบียนรถ</h1>
                            <Paper className={classes.root}>
                                <InputBase
                                    value={this.state.license_plate}
                                    onChange={this.InputUpdate.bind(this)}
                                    className={classes.input}
                                    placeholder="กรอกทะเบียนรถ"
                                    inputProps={{ 'aria-label': 'กรอกทะเบียนรถ' }}
                                />
                            </Paper>
                            <h1>สีรถ</h1>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={this.state.select}
                                    onChange={this.handleChange.bind(this)}
                                    className={classes.selectEmpty}
                                    input={<InputBase
                                        id="age-customized-native-simple"
                                        name="age"
                                    />}
                                >
                                    <MenuItem value="เหลือง">
                                        <em>เหลือง</em>
                                    </MenuItem>
                                    <MenuItem value="เขียว">เขียว</MenuItem>
                                    <MenuItem value="ชมพู">ชมพู</MenuItem>
                                    <MenuItem value="ฟ้า">ฟ้า</MenuItem>
                                    <MenuItem value="แดง">แดง</MenuItem>
                                    <MenuItem value="ส้ม">ส้ม</MenuItem>
                                    <MenuItem value="เหลือง/เขียว">เหลือง/เขียว</MenuItem>
                                    <MenuItem value="เหลือง/แดง">เหลือง/แดง</MenuItem>
                                    <MenuItem value="เหลือง/ส้ม">เหลือง/ส้ม</MenuItem>
                                    <MenuItem value="ฟ้า/แดง">ฟ้า/แดง</MenuItem>
                                </Select>
                            </FormControl>
                        </center>
                    </Grid>
                </div>
                <Button onClick={this.onSend.bind(this)} variant="contained" style={{ backgroundColor: 'rgb(210, 210, 210)' }} className={classes.fab}>บันทึก</Button>

            </React.Fragment>

        );
    }
}


const styles = {
    drawerHeader: {
        display: 'contents',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'flex-end',
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 200,
    },
    input: {
        marginLeft: 0,
        flex: 1,
    },
    fab: {
        height: '45px',
        bottom: '16px',
        width: '-webkit-fill-available',
        position: 'absolute',
        marginLeft: '22px',
        marginRight: '22px',
        borderRadius: 12
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    formControl: {

        marginRight: 5,
        minWidth: 90,
    },
    selectEmpty: {
        marginTop: 0,
    },
}

export default withStyles(styles)(withRouter(DocTaxi));