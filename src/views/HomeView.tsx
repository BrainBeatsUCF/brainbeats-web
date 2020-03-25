import React from 'react';
import Beat from '../components/Beat';
import PublicBeat from '../components/PublicBeat';
import PublicSample from '../components/PublicSample';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#1a1919',
      flexGrow: 1,
    },
    fixedTopRight: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      boxShadow: '-10px 10px 200px 20px #3d3d3d'
    },
    fixedLeftTop: {
      position: 'fixed',
      top: 0,
      zIndex: 5
    },
    scrollableView: {
      paddingTop: 60
    }
  }),
);

const HomeView: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
          <Grid container>
            <Grid className={classes.fixedLeftTop} item xs={12}>
              <NavBar />
            </Grid>
            <Grid className={classes.scrollableView} item xs={12}>
              <Beat />
              <PublicSample />
              <PublicBeat />
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.fixedTopRight} item xs={3}>
          <SideBar />
        </Grid>
      </Grid>
    </div>
  );
};
    
export default HomeView;