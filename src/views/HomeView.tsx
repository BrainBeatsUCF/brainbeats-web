import React, { useState } from 'react';
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
    },
    fixedTopRight: {
      '@media (min-width: 960px)': {
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%'
      } 
    }
  }),
);

const HomeView: React.FC = () => {
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [id, setId] = useState('');

  const togglePlayPauseButon = () => {
    console.log("isPlaying in Home: " + isPlaying);
    setIsPlaying(!isPlaying);
  }

  const setAudioGlobal = (audioId: string) => {
    console.log(audioId);
    setId(audioId);
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Grid container>
            <Grid className={classes.fixedLeftTop} item xs={12}>
              <NavBar />
            </Grid>
            <Grid className={classes.scrollableView} item xs={12}>
              <Beat isPlaying={isPlaying} setAudioGlobal={setAudioGlobal} togglePlayPauseButon={togglePlayPauseButon}/>
              <PublicSample isPlaying={isPlaying} setAudioGlobal={setAudioGlobal} togglePlayPauseButon={togglePlayPauseButon}/>
              <PublicBeat isPlaying={isPlaying} setAudioGlobal={setAudioGlobal} togglePlayPauseButon={togglePlayPauseButon}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.fixedTopRight} item xs={12} md={3}>
          <SideBar id={id} isPlaying={isPlaying} setAudioGlobal={setAudioGlobal} togglePlayPauseButon={togglePlayPauseButon}/>
        </Grid>
      </Grid>
    </div>
  );
};
    
export default HomeView;