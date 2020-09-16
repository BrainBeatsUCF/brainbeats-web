import React, { useState } from 'react';
import Beat from '../components/Beat';
import PublicBeat from '../components/PublicBeat';
import PublicSample from '../components/PublicSample';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#262626',
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
        marginBottom: 234
      }
    },
    fixedTopRight: {
      '@media (min-width: 960px)': {
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        height: '100%'
      } 
    }
  }),
);

const HomeView: React.FC = () => {
  const classes = useStyles();
  const [id, setId] = useState("0");

  const { user, isAuthenticated } = useAuth0();

  console.log("Is Authenticated In Home:" + isAuthenticated);

  const setAudioGlobal = (audioId: string) => {
    console.log(`setAudioGlobal: ${audioId}`);
    setId(audioId);
  };


  return (
    <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Grid container>
              <Grid className={classes.fixedLeftTop} item xs={12}>
                <NavBar />
              </Grid>
              <Grid className={classes.scrollableView} item xs={12}>
                <Beat setAudioGlobal={setAudioGlobal}/>
                <PublicSample setAudioGlobal={setAudioGlobal}/>
                <PublicBeat setAudioGlobal={setAudioGlobal}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.fixedTopRight} item xs={12} md={3}>
              <SideBar id={id} setAudioGlobal={setAudioGlobal}/>
          </Grid>
        </Grid>
      </div>
  );
};
    
export default HomeView;