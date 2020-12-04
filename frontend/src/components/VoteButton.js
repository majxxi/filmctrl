import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import {
  makeStyles,
  Fab,
  Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    // direction: 'column',
    // position: 'fixed',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 1 + 'rem',
    marginBottom: 2 + 'rem',
    marginLeft: -1 + 'rem',
  },
  thumbsUp: {
    color: 'green',
    fontSize: 50 + 'px'
  },
  thumbsDown: {
    color: 'red',
  },
  space: {
    margin: 10 + 'px',
  }
}));

function VoteButton({vote}){
  const classes = useStyles();

  return (
    <Box component="div" className={classes.button}>
      <Fab className={classes.thumbsUp} onClick={evt => vote("up")}>
        <ThumbUpIcon />
      </Fab>
      <span className={classes.space} />
      <Fab className={classes.thumbsDown} onClick={evt => vote("down")}>
        <ThumbDownIcon />
      </Fab>
    </Box>
  )
}

export default VoteButton;