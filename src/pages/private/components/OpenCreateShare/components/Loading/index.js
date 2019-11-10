import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import '../../styles/loading-page.css'

export const Loading = (props) => {
    const theme = useTheme();

    return (

        <div >
            <div style={{
                display: 'contents',
                padding: '0px 8px',
                minHeight: '56px',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <IconButton onClick={props.onClose} style={{ position: "absolute", zIndex: 1 }}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                </IconButton>
                <div className="bg">
                    <Grid container justify="center" alignItems="center">

                        <div className="image-user"></div>
                    </Grid>
                    <center style={{ paddingBottom: 5, fontSize: 'large' }}>
                        <span className="text">
                            <div className="text-header-line"></div>
                        </span>

                    </center>
                </div>
            </div>
            <List style={{
                marginTop: '15px'
            }}>
                <div style={{
                    color: 'dimgray',
                    textDecoration: 'blink'
                }}>
                    <ListItem button key={0}>
                        <ListItemIcon style={{
                            minWidth: 0,
                            marginLeft: 15,
                            marginRight: 15
                        }}> <div className="image-icon"></div></ListItemIcon>
                        <ListItemText ><span style={{ fontSize: "large" }} ><div className="text-menu-line"></div></span></ListItemText>
                    </ListItem>
                </div>
                <div style={{
                    color: 'dimgray',
                    textDecoration: 'blink'
                }}>
                    <ListItem button key={1}>
                        <ListItemIcon style={{
                            minWidth: 0,
                            marginLeft: 15,
                            marginRight: 15
                        }}> <div className="image-icon"></div></ListItemIcon>
                        <ListItemText > <span style={{ fontSize: "large" }} ><div className="text-menu-line"></div></span></ListItemText>
                    </ListItem>
                </div>
            </List>
            <div style={{
                position: "absolute",
                bottom: 0,
                width: '-webkit-fill-available'
            }}>
                <Button
                    variant="contained"
                    className="button"
                    // color="primary"
                    // className={classes.button}
                    style={{
                        width: '-webkit-fill-available',
                        height: '56px',
                        borderRadius: '0px'
                    }}><div className="text-menu-line"></div></Button>
            </div>
        </div>
    )
}

Loading.propTypes = {
    onClose: PropTypes.func
}