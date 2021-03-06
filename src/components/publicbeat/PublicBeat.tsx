
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MusicContext } from '../../util/contexts/music';
import clsx from 'clsx';
import { PublicBeatObject, PublicBeatProps } from '../../util/api/types';
import { useStyles } from './useStyles';
import RedHeartButton from '../../images/redHeartButton.png';
import WhiteHeartButton from '../../images/whiteHeartButton.png';
import PlayButton from '../../images/playButton.png';
import PauseButton from '../../images/pauseButton.png';
import { ValidateAndRegenerateAccessToken } from '../../util/ValidateRegenerateAccessToken';
import { Pause } from '@material-ui/icons';
// import PauseButton from '../../images/pauseButton.png';

// Todo: call /api/user/get_liked_beats to get liked beats, then use orignalPubliBeat to see if any public beat is pre-liked
//       add like: boolean for public beat

// Todo: switch between play and pause button for public beat
// add new field for public beat object

const PublicBeat: React.FC<PublicBeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [publicBeats, setPublicBeats] = useState([] as PublicBeatObject[]);
  let publicBeatArray = [] as PublicBeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const [searchName, setSearchName] = useState('');
  const [isPublicBeatEmpty, setIsPublicBeatEmpty] = useState(false);
  const [message, setMessage] = useState('');

  //Testing status
  const [isPlaying,setIsPlaying] = useState(false);

  const loadLikedBeats = async () => {
    ValidateAndRegenerateAccessToken();
    const data = {
      'email': userEmail
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    const temp = [] as string[];

    publicBeatArray.forEach((publicBeat: PublicBeatObject) => {
      temp.push(publicBeat.id);
      // if like beats are in this publicBeatArray, set like = true
    });

    publicBeatArray = [...musicProvider.getOriginalPublicBeatArray()];
    
    axios.post(url + '/api/user/get_liked_beats', data, config)
    .then((res) => {
      res.data.forEach((likeBeat: PublicBeatObject) => {
        if (temp.includes(likeBeat.id)) {
          
          // find index
          const index: number = temp.indexOf(likeBeat.id);
          publicBeatArray[index]['like'] = true;
        }
      });
      if (publicBeatArray.length === 0) {
        setMessage('There is 0 public beat.');
        setIsPublicBeatEmpty(true);
      } else {
        setIsPublicBeatEmpty(false);
      }
      setPublicBeats(publicBeatArray);
    }).catch((err) => {
      // console.log(err);
    });
  }

  const loadData = async () => {
    ValidateAndRegenerateAccessToken();
    axios.get(url + 'api/v2/beats',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach((item: any) => {
        const newPublicBeat = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "name": item.properties['name'][0]['value'],
          "like": false,
          "duration": item.properties['duration'][0]['value'],
          "instrumentList": item.properties['instrumentList'][0]['value'],
          "isPlaying": false,
        };
        
        publicBeatArray.push(newPublicBeat);
      });
      musicProvider.setOriginalPublicBeatArray(publicBeatArray);
      
      loadLikedBeats();
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
      if (musicProvider.getOriginalPublicBeatArray().length === 0) {
        setMessage(`There is 0 public beat.`);
        setIsPublicBeatEmpty(true);
      } else {
        setIsPublicBeatEmpty(false);
      }
      setPublicBeats(musicProvider.getOriginalPublicBeatArray());
    } else {
      let publicBeatArrayByName = [] as PublicBeatObject[];

      musicProvider.getOriginalPublicBeatArray().forEach((publicBeat: PublicBeatObject) => {
        if (publicBeat.name.toLowerCase().includes(searchName.toLowerCase())) {
          publicBeatArrayByName.push(publicBeat);
        }
      })

      if (publicBeatArrayByName.length === 0) {
        setMessage(`There is 0 public beat with the name ${searchName}.`);
        setIsPublicBeatEmpty(true);
      } else {
        setIsPublicBeatEmpty(false);
      }

      setPublicBeats(publicBeatArrayByName);
    }    
  }

  const playPublicBeat = (id: string, key: number) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('public-beats');
    
    publicBeats[key]['isPlaying'] = true;
    publicBeatArray = [...publicBeats];
    setPublicBeats(publicBeatArray);
    musicProvider.playNew();
  }

  const pausePublicBeat = (key: number) => {
    publicBeats[key]['isPlaying'] = false;
    publicBeatArray = [...publicBeats];
    setPublicBeats(publicBeatArray);
    musicProvider.changePlayingStatus();
  }

  const likeBeat = (id: string, idx: number) => {
    publicBeats[idx]['like'] = true;
    publicBeatArray = [...publicBeats];
    setPublicBeats(publicBeatArray);

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    const data = {
      'email': userEmail,
      'vertexId': id,
    }

    axios.post(url + '/api/user/like_vertex', data, config)
    .then((res) => {
      // console.log(res);
    }).catch((err) => {
      // console.log(err);
    });
  }

  const unlikeBeat = (id: string, idx: number) => {
    publicBeats[idx]['like'] = false;
    publicBeatArray = [...publicBeats];
    setPublicBeats(publicBeatArray);

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    const data = {
      'email': userEmail,
      'vertexId': id,
    }

    axios.post(url + '/api/user/unlike_vertex', data, config)
    .then((res) => {
      // console.log(res);
    }).catch((err) => {
      // console.log(err);
    });
  }

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10px', alignSelf: 'flex-end'}}>
          <h4 className={classes.title}>Public Beats</h4>
          <form style={{display: 'flex'}} onSubmit={submitSearch}>
            <input className={clsx(classes.formInput, classes.formElement)} onChange={(e: any) => {
            setSearchName(e.target.value);
            }} type="text" placeholder="Search.."></input>
            <button className={classes.formElement}>Search</button>
          </form>
        </div>
        <hr></hr>
      </div>
      {loading ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>Loading...</div> : 
        <div className={classes.scroll}>
          {isPublicBeatEmpty ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>{message}</div> :
            <>
              {publicBeats.map((publicBeat, key) => {
                return (
                  <div className={classes.card} key={key}>
                    <img alt='Public Beat' className={classes.background} src={publicBeat.imageUrl}></img>
                    <div className={classes.bottomLeftCorner}>
                      <div>
                        <div>{publicBeat.name}</div>
                        <div className={classes.playButtonAndBeatInfo}>
                          {
                            <img style={{cursor: 'pointer'}} alt ='Play Button'src={PlayButton} onClick={() => playPublicBeat(publicBeat.id, key)}></img>
                          }
                          <div style={{marginLeft: '8px'}}>
                            {
                              JSON.parse(publicBeat.instrumentList).map((item: string, index: number) => 
                                <span style={{marginRight: '5px'}} key={index}>{item}</span>
                              )
                            }
                            <div>{publicBeat.duration} seconds</div>
                          </div>
                        </div>
                      </div>  
                    </div>
                    <div className={classes.topRightCorner}>
                      {publicBeat.like ? 
                        <img className={classes.likeButton} alt='Red Heart Button' src={RedHeartButton} onClick={() => {unlikeBeat(publicBeat.id, key)}}></img> : 
                        <img className={classes.likeButton} alt='White Heart Button' src={WhiteHeartButton} onClick={() => {likeBeat(publicBeat.id, key)}}></img>
                      }
                    </div>
                  </div>
                )
              })}
            </>
          }
        </div>
      }
    </div>
  );
};

export default PublicBeat;
