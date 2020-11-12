import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import MusicContext from '../../util/contexts/music/MusicContext';
import axios from 'axios';
import { RecommendedBeatObject, RecommendedBeatProps } from '../../util/api/types';
import clsx from 'clsx';
import { useStyles } from './useStyles';
import { ValidateAndRegenerateAccessToken } from '../../util/ValidateRegenerateAccessToken';

const RecommendedBeat: React.FC<RecommendedBeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [beats, setBeats] = useState([] as RecommendedBeatObject[]);
  const beatArray = [] as RecommendedBeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net";

  const [searchName, setSearchName] = useState('');
  const [isRecommendedBeatEmpty, setisRecommendedBeatEmpty] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    ValidateAndRegenerateAccessToken();
    axios.post(url + '/api/user/get_recommended_beats', 
    {
      email: userEmail
    }, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach((item: any) => {
        const newBeat = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "name": item.properties['name'][0]['value'],
          "instrumentList": item.properties['instrumentList'][0]['value'],
        };
        
        beatArray.push(newBeat);
      });
      musicProvider.setOriginalRecommendedBeatArray(beatArray);
      if (beatArray.length === 0) {
        setMessage('There is 0 recommended beat currently.');
        setisRecommendedBeatEmpty(true);
      } else {
        setisRecommendedBeatEmpty(false);
      }
      setBeats(beatArray);
    }).catch((err) => {
      // console.log(err);
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
    if (searchName === '') {
      if (musicProvider.getOriginalRecommendedBeatArray().length === 0) {
        setMessage(`There is 0 recommended beat currently.`);
        setisRecommendedBeatEmpty(true);
      } else {
        setisRecommendedBeatEmpty(false);
      }
      setBeats(musicProvider.getOriginalRecommendedBeatArray());
    } else {
      
      let beatArrayByName = [] as RecommendedBeatObject[];

      musicProvider.getOriginalRecommendedBeatArray().forEach((beat: RecommendedBeatObject) => {
        if (beat.name.toLowerCase().includes(searchName.toLowerCase())) {
          beatArrayByName.push(beat);
        }
      });

      if (beatArrayByName.length === 0) {
        setMessage(`You have 0 recommended beat with the name ${searchName}.`);
        setisRecommendedBeatEmpty(true);
      } else {
        setisRecommendedBeatEmpty(false);
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
          <h4 className={classes.title}>Recommended Beats</h4>
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
            {isRecommendedBeatEmpty ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>{message}</div> :
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
                          {
                            JSON.parse(beat.instrumentList).map((item: string, index: number) => <Box key={index} className={classes.sampleInstrument} p={1}>{item}</Box>)
                          }
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

export default RecommendedBeat;
