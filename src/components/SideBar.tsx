import React, { useState, useEffect, useRef } from 'react';
import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { Link } from 'react-router-dom';
import { useStyles } from './SideBarUseStyles';
import BeatButtonImage from '../images/beatButton.png';
import ShareButtonImage from '../images/shareButton.png';
import SampleButtonImage from '../images/sampleButton.png';
import LogOutImage from '../images/LogoutImage.png'
import CreatePlaylistPopup from './CreatePlaylistPopup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { MusicContext } from '../util/contexts/music';
import { SideBarProps, AudioObject, PlaylistObject } from '../util/api/types';

// Todo: 1. Add icon when audio is successfully/finished added to playlist
//       2. numbeats, samples, share sometimes are not updated even when the beats/sample/playlist are already loaded

const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles(useStyles);
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [playListPopup, setPlaylistPopup] = useState(false);
  const history = useHistory();
  const [playlists, setPlaylists] = useState([] as PlaylistObject[]);
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');

  const [numBeats, setNumBeats] = useState(0);
  const [numSamples, setNumSamples] = useState(0);
  const [numShares, setNumShares] = useState(0);

  // Todo: call /api/user/read_user to get the userPicture
  const [userPicture, setUserPicture] = useState("");

  const url = "https://brain-beats-server-docker.azurewebsites.net";

  // Audio Package
  const setPlayingIndexAudioPackage = (playingIndexAudioPackage: number) => {
    setPlayingIndex(playingIndexAudioPackage);
  };

  const logout = () => {
    // Todo: call log out api

    // remove local storage
    localStorage.removeItem('userEmail');

    // remove access token
    localStorage.removeItem('accessToken');

    // push to login
    history.push('login');
  }

  const openCreatePlaylistPopup = () => {
    setPlaylistPopup(true);
  }

  const closeCreatePlaylistPopup = () => {
    setPlaylistPopup(false);
  }

  const showPlaylistArea = () => {
    setShowPlaylists(true);
  }

  const addToPlaylist = (beatId: string, playlistId: string) => {
    console.log("add beatId: " + beatId + " to playlistId: " + playlistId);
    console.log("current audio id playing: " + playingIndex);
    axios.post(url + '/api/playlist/update_playlist_add_beat', 
    {
      email: userEmail,
      playlistId: playlistId,
      beatId: beatId,
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleClick = (e: any) => {
    if (wrapperRef !== null) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        // inside click
        return;
      }
    }

    // Do not close playlists area if playlist create panel is up
    if (playListPopup) {
      return;
    }
      
    // outside click 
    setShowPlaylists(false);
  };

  // Todo: handle this
  const loadPlaylist = async () => {
    let playlistArrayData = [] as PlaylistObject[];

    axios.post(url + '/api/user/get_owned_playlists', 
    {
      email: localStorage.getItem('userEmail')
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach((item: any) => {
        const newPlaylist = 
        {
          "imageUrl": item.properties['image'][0]['value'],
          "isPrivate": item.properties['isPrivate'][0]['value'],
          "name": item.properties['name'][0]['value'],
          "email": localStorage.getItem('userEmail')!,
          "id": item.id
        };
        
        playlistArrayData.push(newPlaylist);
      });
  
      setPlaylists(playlistArrayData);
    }).catch((err) => {
      console.log(err);
    });    
  }

  const loadData = async () => {
    if (props.id === '0') {
      return;
    }

    let audioArrayData = [] as AudioObject[];

    // reset the data
    setAudioArray([]);

    // Play Playlist Part
    if (musicProvider.getAudioPlayingType() === 'playlist') {
      const playlistResponse = await axios.post(url + '/api/playlist/read_playlist_beats', 
      {
        email: userEmail,
        id: props.id
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });    
  
      playlistResponse.data.forEach((item: any) => {
        console.log(item);
        const newAudio = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "audioUrl": item.properties['audio'][0]['value'],
          "title": item.properties['name'][0]['value'],

          // Todo: ask for api to get author name from a beat
          "authorName": "Hung Nguyen"
        };
        
        audioArrayData.push(newAudio);
      });
    } else if (musicProvider.getAudioPlayingType() === 'beat') {
      console.log(`props.id: ${props.id}`);
      const beatResponse = await axios.post(url + '/api/beat/read_beat', {
        email: userEmail,
        id: props.id
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
  
      beatResponse.data.forEach((item: any) => {
        console.log(item);
        const newAudio = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "audioUrl": item.properties['audio'][0]['value'],
          "title": item.properties['name'][0]['value'],

          // Todo: ask for api to get author name from a beat/sample
          "authorName": "Hung Nguyen"
        };
        audioArrayData.push(newAudio);
      });      
    } else if (musicProvider.getAudioPlayingType() === 'sample') {
      const sampleResponse = await axios.post(url + '/api/sample/read_sample', {
        email: userEmail,
        id: props.id
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      sampleResponse.data.forEach((item: any) => {
        const newAudio = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "audioUrl": item.properties['audio'][0]['value'],
          "title": item.properties['name'][0]['value'],

          // Todo: ask for api to get author name from a beat/sample
          "authorName": "Hung Nguyen"
        };
        audioArrayData.push(newAudio);
      })
    }

    setAudioArray(audioArrayData);
  }

  useEffect(() => {
    const getPlaylist = async () => {
      await loadPlaylist();
    };
    getPlaylist();
  }, [props.id]);

  useEffect(() => {
    const getData = async () => {
      await loadData();
    };
    getData();
  }, [props.id]);

  // playListPopUp 
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [playListPopup]);

  useEffect(() => {
    setNumBeats(musicProvider.getNumBeats());
    setNumSamples(musicProvider.getNumSamples());
    setNumShares(musicProvider.getNumShares());
  }, [musicProvider.getNumBeats(), musicProvider.getNumSamples(), musicProvider.getNumShares()]);

  const loadUser = async () => {
    const userResponse = await axios.post(url + '/api/user/read_user', {
      email: userEmail,
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    console.log(userResponse.data[0].properties['image'][0]['value']);
    setUserPicture(userResponse.data[0].properties['image'][0]['value']);
  }

  // Read user profile picture
  useEffect(() => {
    const getUserData = async () => {
      await loadUser();
    };
    getUserData();
  }, []);

  let audioContent, userStat, isShowAddToPlaylist;  

  userStat = (
    <>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src={BeatButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Beats</h4>
          <h4>{numBeats}</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Sample Icon' src={SampleButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Samples</h4>
          <h4>{numSamples}</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Share Icon' src={ShareButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Shares</h4>
          <h4>{numShares}</h4>
        </div>
      </div>
    </>
  )

  if (musicProvider.getAudioPlayingType() === 'playlist' || musicProvider.getAudioPlayingType() === 'beat' )
    isShowAddToPlaylist = true;
  else
    isShowAddToPlaylist = false;
  
  if (audioArray.length > 0) {
    audioContent = (
      <>
        {isShowAddToPlaylist ? <button className={classes.addPlaylistButton} onClick={showPlaylistArea}>Add to my playlists</button> : ""}
        <BrainBeatsAudioPlayer audioObjectArray={audioArray} setPlayingIndexAudioPackage={setPlayingIndexAudioPackage}/>
      </>
    );
  } else {
    audioContent = <></>;
  }
  
  return (
    <div className={classes.sideBarContainer}>
      <div className={classes.userInfo}>
        <div className={classes.logOut}>
          <div style={{marginRight: '10px'}}>
          Log out
          </div>
          
          <img onClick={() => {
            // Todo: handle log out logic
            logout();
          }} alt='Logout' src={LogOutImage}></img>
        </div>
        <div className={classes.userPictureContainer}>
          <Link to='user/profile'><img className={classes.userPicture} src={userPicture} alt=""></img></Link>
        </div>
        
        <div className={classes.userStatContainer}>
          {userStat}
        </div>

        <div className={classes.playlists} ref={wrapperRef} style={{display: showPlaylists ? 'flex' : 'none'}}>
          <button onClick={openCreatePlaylistPopup}>Create a playlist</button>
          {playlists.map((playlist, key) => {
            return (
              <div className={classes.playlistTitle} key={key} onClick={() => {addToPlaylist(audioArray[playingIndex].id, playlist.id)}}>
                {key + 1}. {playlist.name}
              </div>
            )
          })}
        </div>
        {playListPopup ? <CreatePlaylistPopup closeCreatePlaylistPopup={closeCreatePlaylistPopup}/> : ""}
      </div>

      <div>
        {audioContent}
      </div>
      
    </div>
  );
}

export default SideBar;