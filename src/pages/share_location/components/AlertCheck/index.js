import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function AlertCheck(props) {
  const classes = useStyles();


  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
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
            
            <h4 id="spring-modal-title">คุณได้ทำการเปิดการแชร์โลเคชันแล้ว</h4>
            <center>
            <p >กดปุ่ม ตกลง เพื่อเข้าสู้หน้าแรก</p>
            <button style={{
              backgroundColor: "#3f51b5",
              color: "white",
              padding: "15px 32px",
              fontSize: "16px",
              margin: "4px 2px",
              border:"none",
              borderRadius:'5px',
              boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'

            }} >
            <Link to='/' style={{color:"white",textDecorationLine:"none"}}>ตกลง</Link>
            </button>
            </center>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

AlertCheck.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}