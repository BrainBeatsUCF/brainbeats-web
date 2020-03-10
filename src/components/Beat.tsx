import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { BackendContext } from '../util/api';
import {PlaylistDetail, Song} from '../util/api/types';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
  header: {
    alignItems: 'left',
    paddingLeft: 20,
    margin: 0,
  },
  scroll: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  card: {
    borderRadius: 10,
    display: 'inline-block',
    color: 'white',
    textAlign: 'center',
    margin: 20,
    width: 350,
    height: 200,
    textDecoration: 'none',
    
  },
  cardContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  songType: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    height: '100%'
  },
  beatContainer: {
    position: 'absolute',
    top: 120
  },
  sampleInstrument: {
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'grey',
    margin: 5,
    opacity: 0.7
  }
}));

const Beat: React.FC = () => {
  const api = React.useContext(BackendContext);

  const classes = useStyles();
  const [songs, setSongs] = useState([] as Song[]);
  const [loading, setLoading] = useState(true);

  // testing purpose
  let playlistId = '1';

  useEffect(() => {
    if (loading) {
      api.demoGetPlaylist(playlistId).then(async (res: PlaylistDetail) => {
        
        let songsList = [] as Song[];
        res.songList.forEach(async (songId) => {
          await api.demoGetSong(songId).then((song) => {
            songsList.push(song);
          });
        });
  
        setSongs(songsList);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => console.log(err));
    }
    
  }, []);

  if (loading) return (<div>loading...</div>);
  
  return (
    <div>
      <div className={classes.header}>
        <h4>My Beats</h4>
        <hr></hr>
      </div>
      <div className={classes.scroll}>
        {songs.map((song, key) => {
          return (

            <div className={classes.card} style={{backgroundImage: `url(${song.songImage})`}}>
              <div className={classes.cardContent}>
                <div className={classes.songType}>
                  {/* 
                    get beat type, examples: 
                      1. vibing not a phone in sight 
                      2. first mix
                      3. basic
                      etc ... 
                  */}
                  Vibing, Not a Phone in Sight
                </div>


                {/*
                  for these box, get all the types of samples in a beat to display in the card
                */}
                <Box className={classes.beatContainer}
                  display="flex"
                  flexWrap="wrap"
                  alignContent="flex-start"
                  p={1}
                  m={1}
                >
                  <Box className={classes.sampleInstrument} p={1}>
                    Clap
                  </Box>
                  <Box className={classes.sampleInstrument} p={1}>
                    Saxophone
                  </Box>
                  <Box className={classes.sampleInstrument} p={1}>
                    Heavy Gutar
                  </Box>
                  <Box className={classes.sampleInstrument} p={1}>
                    Drums
                  </Box>
                  <Box className={classes.sampleInstrument} p={1}>
                    Snare
                  </Box>
                </Box>
                  </div>
              </div>
          )
        })}
      </div>
    </div>
    
    
  )
};

export default Beat;