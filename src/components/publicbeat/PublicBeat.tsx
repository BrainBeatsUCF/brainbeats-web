
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MusicContext } from '../../util/contexts/music';
import clsx from 'clsx';
import { PublicBeatObject, PublicBeatProps } from '../../util/api/types';
import { useStyles } from './useStyles';
import RedHeartButton from '../../images/redHeartButton.png';
import WhiteHeartButton from '../../images/whiteHeartButton.png';
import PlayButton from '../../images/playButton.png';
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

  const [searchName, setSearchName] = useState('Test Beat Private');
  const [noBeatByName, setNoBeatByName] = useState(false);
  const [searchNameCompleteValue, setSearchNameCompleteValue] = useState('');

  const loadLikedBeats = async () => {
    // call api to get liked beat
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
      setPublicBeats(publicBeatArray);
    }).catch((err) => {
      console.log(err);
    });

    
  }

  const loadData = async () => {
    axios.post(url + 'api/beat/get_all_beats', 
    {
      email: userEmail
    },
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
          // "isPlaying": false,
          // "instrumentList": instrumentListArray
        };
        
        publicBeatArray.push(newPublicBeat);
      });
      musicProvider.setOriginalPublicBeatArray(publicBeatArray);
      loadLikedBeats();
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
      setPublicBeats(musicProvider.getOriginalPublicBeatArray());
    } else {
      let publicBeatArrayByName = [] as PublicBeatObject[];

      musicProvider.getOriginalPublicBeatArray().forEach((publicBeat: PublicBeatObject) => {
        if (publicBeat.name.toLowerCase() === searchName.toLowerCase()) {
          publicBeatArrayByName.push(publicBeat);
        }
      })

      if (publicBeatArrayByName.length === 0) {
        setNoBeatByName(true);
      } else {
        setNoBeatByName(false);
      }

      setPublicBeats(publicBeatArrayByName);
    }    
  }

  const playPublicBeat = (id: string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('beat');
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
      console.log(res);
    }).catch((err) => {
      console.log(err);
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
      console.log(res);
    }).catch((err) => {
      console.log(err);
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
          {noBeatByName ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>No public beats with the name of {searchNameCompleteValue}</div> :
            <>
              {publicBeats.map((publicBeat, key) => {
                return (
                  <div className={classes.card} key={key}>
                    <img alt='Public Beat' className={classes.background} src={publicBeat.imageUrl}></img>
                    <div className={classes.bottomLeftCorner}>
                      <div>
                        <div>{publicBeat.name}</div>
                        <div className={classes.playButtonAndBeatInfo}>
                          {/* <div>
                            {publicBeat.isPlaying ? 
                              <img alt ='Pause Button'src={PauseButton}></img> :
                              <img alt ='Play Button'src={PlayButton}></img>
                            }
                          </div> */}
                          <img style={{cursor: 'pointer'}} alt ='Play Button'src={PlayButton} onClick={() => playPublicBeat(publicBeat.id)}></img>
                          <div>
                            <div>Rock</div>
                            <div>{publicBeat.duration}</div>
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
