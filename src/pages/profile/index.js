import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';

import {withRouter} from 'react-router-dom'

import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// import Personalform from "../components/personalInformation";

// import Link from "next/link";
import firebase from "../../connect/firebase";
import { InputBase } from '@material-ui/core';
import { post,get } from '../../RESTful_API';
// import { writeUserDataEdit } from '../firebase-database/write-data'
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import WcIcon from '@material-ui/icons/Wc';
import FaceIcon from '@material-ui/icons/Face';
import { dateTime } from '../../module';

class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            photoURL: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiTltSo4MDkAhURUI8KHffBDJUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F227642&psig=AOvVaw0nPTqj6ZudRIcCKQWYbHEk&ust=1568015831780316',
            displayName: '-',
            email: '-',
            phoneNumber: '-',
            sex: '',
            age: '-',
            statusEdit: true,
            currencies: [
                {
                    value: 0,
                    label: 'ไม่ระบุ',
                },
                {
                    value: 1,
                    label: 'Man',
                },
                {
                    value: 2,
                    label: 'Women',
                }
            ],
            match: this.props.match,
            uid: '',
            nullProfile: true
        }

        this.displayNameInput = React.createRef()
        this.emailInput = React.createRef()
        this.sexInput = React.createRef()
        this.ageInput = React.createRef()
    }


    displayNameInputUpdate(e) {
        this.setState({ displayName: e.target.value })
    }

    emailNameInputUpdate(e) {
        this.setState({ email: e.target.value })
    }

    phoneNumberInputUpdate(e) {
        this.setState({ phoneNumber: e.target.value })
    }

    sexInputUpdate = (e) => {
        this.setState({ sex: e.target.value })
    }

    ageInputUpdate(e) {
        this.setState({ age: e.target.value })
    }

    goBack() {
        this.props.history.goBack()
    }

    onEdit() {

        this.setState({ statusEdit: false })
    }


    onSave() {
        let data = {
            displayName: this.state.displayName,
            email: this.state.email,
            photoURL: this.state.photoURL,
            phoneNumber: this.state.phoneNumber,
            sex: this.state.sex,
            age: this.state.age
        }

        firebase.auth().onAuthStateChanged((user) => {

            post.users.profile(user.uid, data, dateTime)


        })
        this.setState({ statusEdit: true })
    }

    componentDidMount() {
        const me = this;
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ uid: user.uid })
            get.users.profile(this.props.match.params.id).then(function (data) {
                console.log(data);
                if (data) {
                    me.setState({ nullProfile: false })
                } else {
                    me.setState({ nullProfile: true })
                }

                if (data.photoURL !== null) {

                    me.setState({ photoURL: data.photoURL });
                }

                if (data.displayName !== null) {

                    me.setState({ displayName: data.displayName });
                }

                if (data.email !== null) {

                    me.setState({ email: data.email });
                }

                if (data.phoneNumber !== null) {

                    me.setState({ phoneNumber: data.phoneNumber });
                }

                if (data.sex !== null) {

                    me.setState({ sex: data.sex });
                }

                if (data.age !== null) {

                    me.setState({ age: data.age });
                }
            })

        })
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {this.state.nullProfile !== true
                    ? (<React.Fragment>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.props.history.goBack} style={{ position: "absolute" }}>
                                <ChevronLeftIcon fontSize="large" />
                            </IconButton>
                            <div style={{
                                backgroundColor: 'darkgrey',
                                boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                            }}>
                                <Grid container justify="center" alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={this.state.photoURL}
                                        className={classes.bigAvatar}
                                        style={{
                                            border: '4px solid #fff',
                                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                        }}
                                    />
                                </Grid>
                            </div>
                        </div>
                        <List style={{
                            marginTop: '15px'
                        }}>
                            <ListItem button key={0}>
                                <ListItemIcon style={{
                                    minWidth: 0,
                                    marginLeft: 15,
                                    marginRight: 15
                                }}> <PersonIcon fontSize="large" /></ListItemIcon>
                                <ListItemText >
                                    <span style={{ fontSize: "large" }} >
                                        ชื่อ: <InputBase ref={this.displayNameInput} onChange={this.displayNameInputUpdate.bind(this)} type="text" disabled={this.state.statusEdit} value={this.state.displayName} />
                                    </span>
                                </ListItemText>
                            </ListItem>
                            <ListItem button key={1}>
                                <ListItemIcon style={{
                                    minWidth: 0,
                                    marginLeft: 15,
                                    marginRight: 15
                                }}> <EmailIcon fontSize="large" /></ListItemIcon>
                                <ListItemText >
                                    <span style={{ fontSize: "large" }} >
                                        E-mail: <InputBase ref={this.emailInput} onChange={this.emailNameInputUpdate.bind(this)} type="text" disabled={this.state.statusEdit} value={this.state.email} />
                                    </span>
                                </ListItemText>
                            </ListItem>
                            <ListItem button key={1}>
                                <ListItemIcon style={{
                                    minWidth: 0,
                                    marginLeft: 15,
                                    marginRight: 15
                                }}> <PhoneIcon fontSize="large" /></ListItemIcon>
                                <ListItemText >
                                    <span style={{ fontSize: "large" }} >
                                        เบอร์โทร: <InputBase ref={this.phoneNumberInput} onChange={this.phoneNumberInputUpdate.bind(this)} type="number" disabled={this.state.statusEdit} value={this.state.phoneNumber} />
                                    </span>
                                </ListItemText>
                            </ListItem>
                            <ListItem button key={1}>
                                <ListItemIcon style={{
                                    minWidth: 0,
                                    marginLeft: 15,
                                    marginRight: 15
                                }}> <WcIcon fontSize="large" /></ListItemIcon>
                                <ListItemText >
                                    <span style={{ fontSize: "large" }} >
                                        เพศ: <TextField
                                            id="outlined-select-currency"
                                            select
                                            disabled={this.state.statusEdit}
                                            value={this.state.sex}
                                            onChange={this.sexInputUpdate.bind(this)}
                                            SelectProps={{
                                                MenuProps: {
                                                    // className: classes.menu,
                                                },
                                            }}
                                        >
                                            {this.state.currencies.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </span>
                                </ListItemText>
                            </ListItem>
                            <ListItem button key={1}>
                                <ListItemIcon style={{
                                    minWidth: 0,
                                    marginLeft: 15,
                                    marginRight: 15
                                }}> <FaceIcon fontSize="large" /></ListItemIcon>
                                <ListItemText >
                                    <span style={{ fontSize: "large" }} >
                                        อายุ: <InputBase ref={this.ageInput} onChange={this.ageInputUpdate.bind(this)} type="number" disabled={this.state.statusEdit} value={this.state.age} />
                                    </span>
                                </ListItemText>
                            </ListItem>
                        </List>
                        {this.props.match.params.id === this.state.uid
                            ? (<React.Fragment>
                                <div style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: '-webkit-fill-available'
                                }}>

                                    {this.state.statusEdit === true
                                        ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                // className={classes.button}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    height: '56px',
                                                    borderRadius: '0px'
                                                }}
                                                onClick={this.onEdit.bind(this)}>แก้ไขข้อมูล</Button>
                                        )
                                        : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                // className={classes.button}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    height: '56px',
                                                    borderRadius: '0px'
                                                }}
                                                onClick={this.onSave.bind(this)}>บันทึก</Button>
                                        )
                                    }
                                </div>
                            </React.Fragment>)
                            : (<React.Fragment>
                            </React.Fragment>)
                        }
                    </React.Fragment>)
                    : (<React.Fragment>
                        ไม่มีโปรไฟล์ที่คนต้องการ
                    </React.Fragment>)
                }
            </React.Fragment>
        );
    }
}


const styles = {
    bigAvatar: {
        margin: 10,
        marginTop: 50,
        width: 90,
        height: 90,
    },
    drawerHeader: {
        display: 'contents',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'flex-end',
    },
}

export default withStyles(styles)(withRouter(Profile));