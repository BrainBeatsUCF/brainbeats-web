import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { BackendContext } from '../util/api';
import {PlaylistDetail, Song} from '../util/api/types';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    alignItems: 'left',
    paddingLeft: 20,
    margin: 0,
  },
  scroll: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  card: {
    borderRadius: 10,
    display: 'inline-block',
    textAlign: 'center',
    margin: 20,
    textDecoration: 'none',
    position: 'relative',
  },
  background: {
    backgroundRepeat: 'no-repeat',
    width: 300,
    height: 250,
    opacity: 0.4
  },
  cardContent: {
    width: '100%',
    height: '100%',
  },
  songType: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: '50%'
  },
  beatContainer: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    bottom: 0
  },
  sampleInstrument: {
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'grey',
    margin: 5,
    opacity: 0.7
  },
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
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div>
          <span style={{marginRight: 10}}>My Beats</span>
          <input type="text" placeholder="Search.."></input>
        </div>
        <hr></hr>
      </div>
      <div className={classes.scroll}>
        {songs.map((song, key) => {
          return (
            <div className={classes.card} key={key}>
              <img alt='' className={classes.background} src={song.songImage}></img>
              <div className={classes.cardContent}>
                <div className={classes.songType}>
                  Vibing, Not a Phone in Sight
                </div>
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