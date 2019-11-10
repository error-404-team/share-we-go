import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// core lib
import { makeStyles, useTheme } from '@material-ui/core/styles';

// tag lib
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { get, post } from '../../../../RESTful_API';
// import firebase from '../../../../connect/firebase';
import { Loading } from './components/Loading';
import ChatBar from '../ChatBar';
import InputCaht from '../InputChat';
import { dateTime } from '../../../../module';
import './styles/chat-box.css';


// style
const useStyles = makeStyles(theme => ({
    drawer: {
        width: (window.innerWidth),
        flexShrink: 0,
    },
    drawerPaper: {
        width: (window.innerWidth),
    }
}))

function ChatSlide(props) {

    const theme = useTheme();
    const classes = useStyles();

    const [profile, setProfile] = useState(null)
    const [chat, setChat] = useState(null)
    const [msg, setMsg] = React.useState(null)

  const sendMsg = () => {

    get.users.profile(props.status.member.uid).then((profile) => {
      post.share.chat(props.status.share.id, {
        uid: props.status.share.uid,
        share_id: props.status.share.id,
        profile: profile,
        msg: `${msg}`

      }, dateTime)
      
    })

    // inputChat.current.focus();
    // console.log(msg);
        // get.share.chat(props.status.member.share_id).then((data) => {
        //     setChat(data)
        // })
    setMsg('')
  }

  const updateMsg = (e) => {
    setMsg(e.target.value)
  }
    // firebase.auth().onAuthStateChanged((user) => {
    get.users.profile(props.uid).then((data) => {
        setProfile(data)
        // console.log(data);

    })
    // })

    get.share.chat(props.status.member.share_id).then((data) => {
        setChat(data)
    })



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
                {chat !== null
                    ? (<Fragment>
                        <ChatBar>
                            <IconButton onClick={props.onClose} style={{ position: "absolute", left: 0 }}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                            </IconButton>
                            <div style={{
                                position: 'absolute',
                                left: (window.innerWidth / 2.2),
                            }}>
                                <h2>Chat</h2>
                            </div>
                        </ChatBar>

                        <div className="box">
                            <div className="chat-box">
                                {chat !== null
                                    ? (<Fragment>
                                        {Object.keys(chat).map((key) => (
                                            <Fragment>
                                                {key !== props.uid
                                                    ? (<Fragment>
                                                        <div class="container darker">
                                                            <img src={`${chat[key].profile.photoURL}`} alt="Avatar" class="right" />
                                                            <h4 style={{
                                                                marginTop: 0
                                                            }}>{chat[key].profile.displayName}</h4>
                                                            <p>{chat[key].msg}</p>
                                                        </div>
                                                    </Fragment>)
                                                    : (<Fragment>
                                                        <div class="container">
                                                            <img src={`${chat[key].profile.photoURL}`} alt="Avatar" class="left" />
                                                            <h2>{chat[key].profile.displayName}</h2>
                                                            <p>{chat[key].msg}</p>
                                                        </div>
                                                    </Fragment>)
                                                }
                                            </Fragment>
                                        ))}
                                    </Fragment>)
                                    : (<Fragment></Fragment>)
                                }
                            </div>
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '-webkit-fill-available',
                            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
                        }}>
                            <InputCaht value={msg} onChange={updateMsg} onClick={sendMsg}/>
                        </div>
                    </Fragment>)
                    : (<Loading onClose={props.onClose} />)
                }
            </Drawer>
        </Fragment>
    )
}

ChatSlide.protoType = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    uid: PropTypes.string
}

export default ChatSlide;