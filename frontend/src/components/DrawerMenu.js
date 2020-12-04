import React from 'react';
import { 
  makeStyles, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  Box 
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 'inherit',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: 240,
    position: "relative",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: "inherit"
  },
  drawerClose: {
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "inherit"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}))

function DrawerMenu({handleDrawer, drawer}) {
  const classes = useStyles();

  return(
      <Box component="div" style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '240px' }}
          variant="persistent"
          anchor="left"
          open={drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <ListItem button onClick={() => handleDrawer()}>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
            </ListItem>

            <ListItem>
            <p style={{ fontFamily: 'Wired', fontWeight: 'bold'}}>Film Ctrl</p>
            </ListItem>

            <ListItem button key="Home" component={Link} to="/" onClick={() => handleDrawer()}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem button key="Ranking" component={Link} to="/ranking" onClick={() => handleDrawer()}>
              <ListItemIcon>
                <GroupWorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Ranking"} />
            </ListItem>

            <ListItem button key="About" component={Link} to="/about" onClick={() => handleDrawer()}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItem>

          </List>
        </Drawer>
      </Box>
  )
}

export default DrawerMenu;