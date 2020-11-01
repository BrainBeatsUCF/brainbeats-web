import React, { useState } from 'react';
import Beat from '../components/beat/Beat';
import Playlist from '../components/playlist/Playlist';
import PublicBeat from '../components/publicbeat/PublicBeat';
import Sample from '../components/sample/Sample';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/sidebar/SideBar';
import NavBar from '../components/NavBar';
import { useHistory, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import RecommendedBeat from '../components/recommendedbeat/RecommendedBeat';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#28252b',
      flexGrow: 1,
    },
    fixedLeftTop: {
      position: 'fixed',
      top: 0,
      zIndex: 5,
      paddingTop: '10px',
      paddingLeft: '20px',
    },
    scrollableView: {
      paddingTop: 60,
      '@media (max-width: 960px)': {
        marginBottom: '234px'
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
    },
    leftContent: {
      background: 'linear-gradient(to left, rgba(40, 45, 43, 0.9) 60%, #28252b)',
    }
  }),
);

// Todo: add gradient

const HomeView: React.FC = () => {
  const classes = useStyles();
  const [id, setId] = useState("0");
  let history = useHistory();
  let userEmail = localStorage.getItem('userEmail');
  let jwt = localStorage.getItem('accessToken');
  let expired: boolean = false;

  console.log(localStorage.getItem('accessToken'));

  const setAudioGlobal = (audioId: string) => {
    console.log('audioId in home: ' + audioId);
    setId(audioId);
  };

  if (jwt != null) {
    let jwtDecoded: any = jwt_decode(jwt);
    if (Date.now() / 1000 >= jwtDecoded.exp) {
      expired = true;
    }
  }

  if (userEmail == null) {
    history.push('/login');
  }

  return (
    <>
      {expired ? <Redirect to='login' /> : 
        <div className={classes.root}>
          <Grid container className={classes.leftContent}>
            <Grid item xs={12} md={9}>
              <Grid container>
                <Grid className={classes.fixedLeftTop} item xs={12}>
                  <NavBar />
                </Grid>
                <Grid className={classes.scrollableView} item xs={12}>
                  <Beat setAudioGlobal={setAudioGlobal}/>
                  <Playlist setAudioGlobal={setAudioGlobal}/>
                  <Sample setAudioGlobal={setAudioGlobal}/>
                  <PublicBeat setAudioGlobal={setAudioGlobal}/>
                  <RecommendedBeat setAudioGlobal={setAudioGlobal}/>
                </Grid>
              </Grid>
            </Grid>

            {/* Testing Gradient */}
            {/* <Grid>
              <div className={classes.overlaySection}></div>
            </Grid> */}
            <Grid className={classes.fixedTopRight} item xs={12} md={3}>
              <SideBar id={id}/>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
};
    
export default HomeView;