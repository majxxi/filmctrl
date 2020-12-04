import React from 'react';
import {
  makeStyles,
  IconButton,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Box
 } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FilmDetail from './FilmDetail';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    backgroundColor: '#004652',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
  },
}));

function FilmDialog({title, id, close, open}) {
  const classes = useStyles();

  return (
    <Box>
      <Dialog fullScreen open={open ? open : false} onClose={close} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <FilmDetail id={id} />
      </Dialog>
    </Box>
  )
}

export default FilmDialog;