import React from 'react';
import Beat from '../components/Beat';
import PublicBeat from '../components/PublicBeat';
import PublicSample from '../components/PublicSample';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import MusicContext from '../contexts/MusicContext';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#1a1919',
      flexGrow: 1,
    },
    fixedLeftTop: {
      position: 'fixed',
      top: 0,
      zIndex: 5
    },
    scrollableView: {
      paddingTop: 60,
      '@media (max-width: 960px)': {
        marginBottom: 251
      }
    }
  }),
);

const HomeView: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={9}>
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
        <Grid item xs={12} md={3}>
          <SideBar />
        </Grid>
      </Grid>
    </div>
  );
};
    
export default HomeView;