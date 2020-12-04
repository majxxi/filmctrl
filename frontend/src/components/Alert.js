import React from 'react';
import { makeStyles, Typography, Card } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: 10 + 'em',
    marginLeft: 2 + 'em',
    marginRight: 2 + 'em',
    backgroundColor: '#b53838',
    overflow: 'hidden',
    color: 'white',
    padding: 10 + 'px',
    maxWidth: 400
  }
}));

function Alert({message}){
  const classes = useStyles();

  return (
    <Card component='div' className={classes.box}>
      <Typography variant='h3'>{message}</Typography>
    </Card>
  )
}

export default Alert;