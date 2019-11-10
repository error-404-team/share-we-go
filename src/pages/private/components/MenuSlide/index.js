import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// core lib
import { makeStyles, useTheme } from '@material-ui/core/styles';

// tag lib
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

// icon lib
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/History';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { get } from '../../../../RESTful_API';
import firebase from '../../../../connect/firebase';
import { Loading } from './components/Loading';


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
    },
    bigAvatar: {
        margin: 10,
        marginTop: 50,
        width: 90,
        height: 90,
    },
}))

function MenuSlide(props) {

    const theme = useTheme();
    const classes = useStyles();

    const [profile, setProfile] = useState(null)

    function Logout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.location.reload()
        }).catch(function (error) {
            // An error happened.
        });
    }
    // firebase.auth().onAuthStateChanged((user) => {
    get.users.profile(props.uid).then((data) => {
        setProfile(data)
        // console.log(data);

    })
    // })



    return (
        <Fragment>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {profile !== null
                    ? (<Fragment>
                        {/* <Loading /> */}
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={props.onClose} style={{ position: "absolute" }}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                            </IconButton>
                            <div style={{
                                backgroundColor: 'darkgrey',
                                boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                            }}>
                                <Grid container justify="center" alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={profile.photoURL}
                                        className={classes.bigAvatar}
                                        style={{
                                            border: '4px solid #fff',
                                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                        }}
                                    />
                                </Grid>
                                <center style={{ marginBottom: '10px', fontSize: 'large' }}>
                                    <span>{profile !== null ? profile.displayName : null}</span>
                                </center>
                            </div>
                        </div>
                        <List style={{
                            marginTop: '15px'
                        }}>
                            <Link to={`/profile/${props.uid}`} style={{
                                color: 'dimgray',
                                textDecoration: 'blink'
                            }}>
                                <ListItem button key={0}>
                                    <ListItemIcon style={{
                                        minWidth: 0,
                                        marginLeft: 15,
                                        marginRight: 15
                                    }}> <AccountBoxIcon fontSize="large" /></ListItemIcon>
                                    <ListItemText ><span style={{ fontSize: "large" }} >Profile</span></ListItemText>
                                </ListItem>
                            </Link>
                            <Link to="/history" style={{
                                color: 'dimgray',
                                textDecoration: 'blink'
                            }}>
                                <ListItem button key={1}>
                                    <ListItemIcon style={{
                                        minWidth: 0,
                                        marginLeft: 15,
                                        marginRight: 15
                                    }}> <HistoryIcon fontSize="large" /></ListItemIcon>
                                    <ListItemText > <span style={{ fontSize: "large" }} >History</span></ListItemText>
                                </ListItem>
                            </Link>
                        </List>
                        <div style={{
                            position: "absolute",
                            bottom: 0,
                            width: '-webkit-fill-available'
                        }}>
                            <Button
                                onClick={Logout}
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                style={{
                                    width: '-webkit-fill-available',
                                    height: '56px',
                                    borderRadius: '0px'
                                }}>Logout</Button>
                        </div>
                    </Fragment>)
                    : (<Loading onClose={props.onClose} />)
                }
            </Drawer>
        </Fragment>
    )
}

MenuSlide.protoType = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    uid: PropTypes.string
}

export default MenuSlide;