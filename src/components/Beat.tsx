import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import MusicContext from '../util/contexts/music/MusicContext';
import axios from 'axios';

interface BeatProps {
  setAudioGlobal: any,
}

interface BeatObject {
  name: string
  // instrumentList: string[],
  id: string,
  imageUrl: string,
}

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    alignItems: 'left',
    paddingLeft: '20px',
    margin: 0,
  },
  scroll: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  card: {
    borderRadius: '10px',
    display: 'inline-block',
    textAlign: 'center',
    margin: '20px',
    position: 'relative',
    cursor: 'pointer'
  },
  background: {
    backgroundRepeat: 'no-repeat',
    width: '200px',
    height: '150px',
    opacity: 0.4,
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
    top: '50%',
    fontSize: '13px'
  },
  beatContainer: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    bottom: 0
  },
  sampleInstrument: {
    borderRadius: '5px',
    padding: '2px',
    backgroundColor: 'grey',
    margin: '5px',
    opacity: 0.7,
    fontSize: '10px'
  },
}));

const Beat: React.FC<BeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [beats, setBeats] = useState([] as BeatObject[]);
  const beatArray = [] as BeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const loadData = async () => {
    console.log(localStorage.getItem('accessToken'));
    axios.post(url + 'api/user/get_owned_beats', 
    {
      email: userEmail
    }, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      console.log(res.data.length);
      musicProvider.setNumBeats(res.data.length);
      res.data.forEach((item: any) => {

        // const instrumentListArray = [] as String[];
  
        // item.properties['instrumentList']
        const newBeat = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "name": item.properties['name'][0]['value'],
          // "instrumentList": instrumentListArray
        };
        
        beatArray.push(newBeat);
      });
      setBeats(beatArray);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const getData = async () => {
      await loadData();
      setLoading(false);
    };
    getData();
  }, []);

  const playBeat = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('beat');
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div>
          <span style={{marginRight: 10}}>My Beats</span>
          <input type="text" placeholder="Search.."></input>
        </div>
        <hr></hr>
      </div>
      {loading ? <div>loading...</div> : 
        <div className={classes.scroll}>
          {beats.map((beat, key) => {
            return (
              <div className={classes.card} key={key} onClick={() => playBeat(beat.id)}>
                <img alt='Song' className={classes.background} src={beat.imageUrl}></img>
                <div className={classes.cardContent}>
                  <div className={classes.songType}>
                    {/* Vibing, Not a Phone in Sight */}
                    {beat.name}
                  </div>
                  <Box className={classes.beatContainer}
                    display="flex"
                    flexWrap="wrap"
                    alignContent="flex-start"
                    p={1}
                    m={1}
                  >
                    {/* {instrumentList} */}
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
      }
      
    </div>
  )
};

export default Beat;
