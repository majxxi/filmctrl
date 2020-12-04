import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  text: {
    marginTop: 5 + 'rem',
  }
}));

export default function About() {
  const classes = useStyles();
  return (
    <Grid container spacing={3} display="flex" className={classes.text}>
      <Grid item xs></Grid>
      <Grid item xs={8}>
        <Typography
          style={{ 
            fontFamily: 'Wired', 
            fontSize: 2 + 'em', 
            backgroundColor: 'inherit'
            }}
          >
          Majick Tadepa
        </Typography>
        <Typography
          style={{ 
            fontFamily: 'Helvetica', 
            fontWeight: 'bold', 
            backgroundColor: 'inherit'
            }}
          >
          majicktadepa@gmail.com
        </Typography>
        <Typography
          style={{ 
            fontFamily: 'Helvetica', 
            fontWeight: 'bold', 
            backgroundColor: 'inherit'
          }}
        >
          www.majxxi.net
        </Typography>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
}