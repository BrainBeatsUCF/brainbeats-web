import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import MusicContext from '../../util/contexts/music/MusicContext';
import axios from 'axios';
import { BeatObject, BeatProps } from '../../util/api/types';
import clsx from 'clsx';
import { useStyles } from './useStyles';

const Beat: React.FC<BeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [beats, setBeats] = useState([] as BeatObject[]);
  const beatArray = [] as BeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net";

  const [searchName, setSearchName] = useState('');
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
      props.setNumBeatsMethod(beatArray.length);
      if (beatArray.length === 0) {
        setNoBeatByName(true);
      } else {
        setNoBeatByName(false);
      }
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

  const submitSearch = (e: any) => {
    e.preventDefault();
    setSearchNameCompleteValue(searchName);
    if (searchName === '') {
      setNoBeatByName(false);
      setBeats(musicProvider.getOriginalBeatArray());
    } else {
      
      let beatArrayByName = [] as BeatObject[];

      musicProvider.getOriginalBeatArray().forEach((beat: BeatObject) => {
        if (beat.name.toLowerCase() === searchName.toLowerCase()) {
          beatArrayByName.push(beat);
        }
      });

      if (beatArrayByName.length === 0) {
        setNoBeatByName(true);
      } else {
        setNoBeatByName(false);
      }
      setBeats(beatArrayByName);
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
