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

// Todo: handle whether use clicks on play beat/sample/ or playling to call a right apis in sidebar

const HomeView: React.FC = () => {
  const classes = useStyles();
  const [id, setId] = useState("0");
  let history = useHistory();
  let userEmail = localStorage.getItem('userEmail');
  let jwt = localStorage.getItem('accessToken');
  let expired: boolean = false;

  const setAudioGlobal = (audioId: string) => {
    console.log('audioId in home: ' + audioId);
    setId(audioId);
  };

  if (jwt != null) {
    let jwtDecoded: any = jwt_decode(jwt);

    console.log(jwtDecoded);
    console.log(Date.now() / 1000);

    if (Date.now() / 1000 >= jwtDecoded.exp) {
      console.log("EXPIRED ACCESS TOKEN");
      expired = true;
    } else {
      console.log("ACCESS TOKEN NOT EXPIRED");
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

                {/* Todo: Added public playlist */}
                <Sample setAudioGlobal={setAudioGlobal}/>
                <PublicBeat setAudioGlobal={setAudioGlobal}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.fixedTopRight} item xs={12} md={3}>
            <SideBar id={id} setAudioGlobal={setAudioGlobal}/>
          </Grid>
        </Grid>
      </div>
      
  }
  </>
  );
};
    
export default HomeView;