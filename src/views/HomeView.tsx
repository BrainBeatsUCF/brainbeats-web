import React, { useState } from 'react';
import Beat from '../components/beat/Beat';
import Playlist from '../components/playlist/Playlist';
import PublicBeat from '../components/publicbeat/PublicBeat';
import Sample from '../components/sample/Sample';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/sidebar/SideBar';
import NavBar from '../components/NavBar';
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import RecommendedBeat from '../components/recommendedbeat/RecommendedBeat';
import axios from 'axios';
import { ValidateAndRegenerateAccessToken } from '../util/ValidateRegenerateAccessToken';

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
    fixedTopRightGradient: {
      '@media (min-width: 960px)': {
        position: 'fixed',
        left: 840,
        top: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(40, 37, 43, 0.9) 60%, rgba(40, 37, 43, 1) 100%)',
        pointerEvents: 'none'
      }
    },
    leftContent: {
      /*background: 'linear-gradient(to left, rgba(40, 45, 43, 0.9) 60%, #28252b)',*/
      backgroundColor: '#28252b'
    }
  }),
);

// Todo:  Match play/pause button for public beats
//        Match gradient with desktop
//        Allow beat/sample/publicbeat to play next or previous like playlist

const HomeView: React.FC = () => {
  const classes = useStyles();
  const [id, setId] = useState("0");
  const [numBeats, setNumBeats] = useState(0);
  const [numSamples, setNumSamples] = useState(0);
  const [numShares, setNumShares] = useState(0);
  const url = "https://brain-beats-server-docker.azurewebsites.net";
  let userEmail = localStorage.getItem('userEmail');
  let expired: boolean = false;

  const setNumBeatsMethod = (numBeats: number) => {
    setNumBeats(numBeats);
  }

  const setNumSamplesMethod = (numSamples: number) => {
    setNumSamples(numSamples);
  }

  const setAudioGlobal = (audioId: string) => {
    setId(audioId);
    console.log(`audioId: ${audioId}`)
  };

  const setNumPublicSamplesMethod = (numPublicSamples: number) => {
    setNumShares(numShares => numShares + numPublicSamples);
  }

  const setNumPublicBeatsMethod = (numPublicBeats: number) => {
    setNumShares(numShares => numShares + numPublicBeats);
  }

  // Todo: tomorrow: run one hour and test to see if new access token console is printed, if so
  //     in catch err api, call the function again
  ValidateAndRegenerateAccessToken();

  // handle expired/logged out users
  if (userEmail == null || userEmail === undefined) {
    expired = true;
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
                  <Beat setNumPublicBeatsMethod={setNumPublicBeatsMethod} setAudioGlobal={setAudioGlobal} setNumBeatsMethod={setNumBeatsMethod}/>
                  <Playlist setAudioGlobal={setAudioGlobal}/>
                  <Sample setNumPublicSamplesMethod={setNumPublicSamplesMethod} setAudioGlobal={setAudioGlobal} setNumSamplesMethod={setNumSamplesMethod}/>
                  <PublicBeat setAudioGlobal={setAudioGlobal}/>
                  <RecommendedBeat setAudioGlobal={setAudioGlobal}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.fixedTopRightGradient} item xs={12} md={3}>
            </Grid>
            <Grid className={classes.fixedTopRight} item xs={12} md={3}>
              <SideBar id={id} numBeats={numBeats} numSamples={numSamples} numShares={numShares}/>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
};
    
export default HomeView;