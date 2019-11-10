import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
// import firebase from '../../../../connect/firebase';
// import { post, get } from '../../../../RESTful_API';
// import { dateTime } from '../../../../module';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '-webkit-fill-available',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function InputCaht(props) {
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
      <InputBase
        value={props.value}
        className={classes.input}
        placeholder="Send Message"
        inputProps={{ 'aria-label': 'send message' }}
        onChange={props.onChange}
        type="text"
      />
      <IconButton onClick={props.onClick} className={classes.iconButton} aria-label="send">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

InputCaht.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}