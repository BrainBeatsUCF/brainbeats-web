import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import MusicContext from '../util/contexts/music/MusicContext';
import axios from 'axios';
import { BeatObject } from '../util/api/types';
import clsx from 'clsx';

interface BeatProps {
  setAudioGlobal: any,
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
    whiteSpace: 'nowrap',
    height: '193px',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
  card: {
    borderRadius: '10px',
    display: 'inline-block',
    textAlign: 'center',
    margin: '20px',
    position: 'relative',
    cursor: 'pointer',
    minWidth: '200px',
    minHeight: '150px',
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
  title: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    fontSize: '1.4em',
    marginRight: '10px',
  },
  formInput: {
    marginRight: '10px'
  },
  formElement: {
    borderRadius: '10px',
    backgroundColor: 'rgb(59, 55, 61)',
    fontSize: '0.8em',
    color: 'white'
  }
}));

const Beat: React.FC<BeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [beats, setBeats] = useState([] as BeatObject[]);
  const beatArray = [] as BeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net";
  let originalBeatArray = [] as BeatObject[];

  const [searchName, setSearchName] = useState('Test Beat Private');
  const [noBeatByName, setNoBeatByName] = useState(false);
  const [searchNameCompleteValue, setSearchNameCompleteValue] = useState('');

  const loadData = async () => {
    axios.post(url + '/api/user/get_owned_beats', 
    {
      email: userEmail
    }, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      musicProvider.setNumBeats(res.data.length);
      res.data.forEach((item: any) => {
        console.log(item);

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
      musicProvider.setOriginalBeatArray(beatArray);
      console.log(originalBeatArray);
      setBeats(beatArray);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    console.log(searchName);
  }, [searchName]);

  useEffect(() => {
    const getData = async () => {
      await loadData();
      setLoading(false);
    };
    getData();
  }, []);

  const submitSearch = (e: any) => {
    e.preventDefault();
    console.log(searchName);
    setSearchNameCompleteValue(searchName);
    if (searchName === '') {
      setNoBeatByName(false);
      console.log('here');
      // console.log(beatArray);
      console.log(musicProvider.getOriginalBeatArray());
      setBeats(musicProvider.getOriginalBeatArray());
    } else {
      console.log('here empty');
      // call search api and setBeat
      let beatArrayByName = [] as BeatObject[];
      const dataObject = {
        'email': userEmail,
        'name': searchName,
      };

      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      axios.post(url + '/api/beat/search_beat', dataObject, config)
      .then((res) => {
        // beatArrayByName = res.data;
        console.log(beatArrayByName);

        // traverse through res.data to add beat into beatArrayByName
        //   "id": item.id,
        //   "imageUrl": item.properties['image'][0]['value'],
        //   "name": item.properties['name'][0]['value'],
        res.data.forEach((item: any) => {
          beatArrayByName.push({
            'id': item.id,
            'imageUrl': item.properties['image'][0]['value'],
            'name': item.properties['name'][0]['value'],
          })
        });

        if (beatArrayByName.length === 0) {
          console.log('0 beat');
          setNoBeatByName(true);
        } else {
          console.log('has beat');
          setNoBeatByName(false);
        }
        // if beat array is empty, has a message for empty beat on UI
        setBeats(beatArrayByName);
      }).catch((err) => {
        console.log(err);
      })
      console.log(beatArrayByName);
      
    }    
  }

  const playBeat = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('beat');
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10px', alignSelf: 'flex-end'}}>
          <h4 className={classes.title}>My Beats</h4>
          <form style={{display: 'flex'}} onSubmit={submitSearch}>
            <input className={clsx(classes.formInput, classes.formElement)} onChange={(e: any) => {
            setSearchName(e.target.value);
            }} type="text" placeholder="Search.."></input>
            <button className={classes.formElement}>Search</button>
          </form>
        </div>
        <hr></hr>
      </div>
      {loading ? <div  style={{paddingLeft: '20px', paddingBottom: '10px'}}>Loading...</div> : 
        <div className={classes.scroll}>
          {noBeatByName ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>No beats with the name of {searchNameCompleteValue}</div> :
            <>
            {beats.map((beat, key) => {
              return (
                <div className={classes.card} key={key} onClick={() => playBeat(beat.id)}>
                  <img alt='Beat' className={classes.background} src={beat.imageUrl}></img>
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
            </>
          }
        </div>
      }
      
    </div>
  )
};

export default Beat;
