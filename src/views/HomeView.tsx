import React, { useState } from 'react';
import Beat from '../components/Beat';
import Playlist from '../components/Playlist';
import PublicBeat from '../components/PublicBeat';
import Sample from '../components/Sample';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { useHistory, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#262626',
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
    }
  }),
);

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
          <Grid container>
            <Grid item xs={12} md={9}>
              <Grid container>
                <Grid className={classes.fixedLeftTop} item xs={12}>
                  <NavBar />
                </Grid>
                <Grid className={classes.scrollableView} item xs={12}>
                  <Beat setAudioGlobal={setAudioGlobal}/>
                  <Playlist setAudioGlobal={setAudioGlobal}/>

                  {/* Todo: Added public sample/playlist */}
                  <Sample setAudioGlobal={setAudioGlobal}/>
                  <PublicBeat setAudioGlobal={setAudioGlobal}/>
                </Grid>
              </Grid>
            </Grid>
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