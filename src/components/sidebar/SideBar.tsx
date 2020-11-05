import React, { useState, useEffect, useRef } from 'react';
import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { useStyles } from './SideBarUseStyles';
import BeatButtonImage from '../../images/beatButton.png';
import ShareButtonImage from '../../images/shareButton.png';
import SampleButtonImage from '../../images/sampleButton.png';
import LogOutImage from '../../images/LogoutImage.png'
import CreatePlaylistPopup from '../CreatePlaylistPopup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { MusicContext } from '../../util/contexts/music';
import { SideBarProps, AudioObject, PlaylistObject, BeatObject } from '../../util/api/types';
import { UserRequestImage } from '../../util/UserRequestImage';

// Todo: 1. Add icon when audio is successfully/finished added to playlist

// Todo: handle next/back button for audio player for example: Beat/Sample/Public Beat component can go next beat
// beats in playlist can go back/next

const SideBar: React.FC<SideBarProps> = ({...props}) => {

  console.log('re-render');

  const classes = useStyles(useStyles);
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [playListPopup, setPlaylistPopup] = useState(false);
  const history = useHistory();
  const [playlists, setPlaylists] = useState([] as PlaylistObject[]);
  const musicProvider = React.useContext(MusicContext);
  const userEmail = localStorage.getItem('userEmail');
  const idToken = localStorage.getItem('idToken');

  const [userPicture, setUserPicture] = useState("");

  const url = "https://brain-beats-server-docker.azurewebsites.net";
  

  const RequestUserProfileImage = () => {
    setUserPicture(UserRequestImage(userEmail, idToken));
  }

  // Audio Package
  const setPlayingIndexAudioPackage = (playingIndexAudioPackage: number) => {
    setPlayingIndex(playingIndexAudioPackage);
  };

  const logout = () => {
    // Todo: call log out api
    localStorage.clear();

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
    console.log('beatId: ' + beatId);
    console.log('playlistId: ' + playlistId);
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
      // console.log(res);
    }).catch((err) => {
      // console.log(err);
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
      // console.log(err);
    });    
  }

  const loadData = async () => {
    console.log('new id');
    // console.log('id:' + props.id);
    // //testing
    let currentId = props.id.substring(0, props.id.indexOf('*'));

    // console.log('currentId:' + currentId);
    // return;


    

    if (props.id === '0') {
      return;
    }

    let audioArrayData = [] as AudioObject[];

    // reset the data
    setAudioArray([]);

    // Play Playlist Part
    // Todo: Handle owner for beats in playlist 

    // TODO: why playlist refresh, but not beat
    if (musicProvider.getAudioPlayingType() === 'playlist') {
      const playlistResponse = await axios.post(url + '/api/playlist/read_playlist_beats', 
      {
        email: userEmail,
        id: currentId
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });    
  
      playlistResponse.data.forEach(async (item: any) => {
        // await axios.post(url + '/api/user/read_user', {
        //   email: userEmail,
        //   id: currentId
        // },
        // {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //   }
        // }).then((res) => {
        //   const newAudio = 
        //   {
        //     "id": item.id,
        //     "imageUrl": item.properties['image'][0]['value'],
        //     "audioUrl": item.properties['audio'][0]['value'],
        //     "title": item.properties['name'][0]['value'],
        //     "authorName": 'Unknown Author'
        //   };
        //   if (res.data[0].properties['name'][0]['value'])
        //     newAudio['authorName'] = res.data[0].properties['name'][0]['value'];
        //   audioArrayData.push(newAudio);
        //   console.log(audioArrayData);
        //   console.log('testing 186');
        //   setAudioArray(audioArrayData);  
        // }).catch((err) => {
        //   // console.log(err);
        // });
        const newAudio = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "audioUrl": item.properties['audio'][0]['value'],
          "title": item.properties['name'][0]['value'],
          "authorName": 'Unknown Author'
        };

        audioArrayData.push(newAudio);
      });
      console.log(audioArrayData);

      setAudioArray(audioArrayData);  
      
    } else if (musicProvider.getAudioPlayingType() === 'beat') {
      // const beatResponse = await axios.post(url + '/api/beat/read_beat', {
      //   email: userEmail,
      //   id: currentId
      // },
      // {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
  
      // beatResponse.data.forEach((item: any) => {
      //   // axios.post(url + '/api/user/read_user', {
      //   //   email: userEmail,
      //   //   id: currentId
      //   // },
      //   // {
      //   //   headers: {
      //   //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      //   //   }
      //   // }).then((res) => {
      //   //   const newAudio = 
      //   //   {
      //   //     "id": item.id,
      //   //     "imageUrl": item.properties['image'][0]['value'],
      //   //     "audioUrl": item.properties['audio'][0]['value'],
      //   //     "title": item.properties['name'][0]['value'],
      //   //     "authorName": 'Unknown Author'
      //   //   };
      //   //   if (res.data[0].properties['name'][0]['value'])
      //   //     newAudio['authorName'] = res.data[0].properties['name'][0]['value'];
      //   //   audioArrayData.push(newAudio);
      //   //   setAudioArray(audioArrayData);
      //   // }).catch((err) => {
      //   //   // console.log(err);
      //   // });
        
      // });    

      // console.log(musicProvider.getOriginalBeatArray());
      // console.log('audioArrayData: ' + audioArrayData);
      musicProvider.getOriginalBeatArray().forEach((beat: BeatObject) => {
        console.log(beat);
        const newAudio = 
        {
          "id": beat.id,
          "imageUrl": beat.imageUrl,
          "audioUrl": beat.audioUrl,
          "title": beat.title,
          "authorName": beat.authorName
        };
        audioArrayData.push(newAudio);
      });

      console.log(audioArrayData);
      // let newAudioArrayData = [] as AudioObject[];

      // newAudioArrayData = audioArrayData.slice(musicProvider.getStartingPlayingIndex()).concat(audioArrayData.slice(0, musicProvider.getStartingPlayingIndex()));
      
      // setAudioArray(newAudioArrayData);
      setAudioArray(audioArrayData);
    } else if (musicProvider.getAudioPlayingType() === 'sample') {
      const sampleResponse = await axios.post(url + '/api/sample/read_sample', {
        email: userEmail,
        id: currentId
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      sampleResponse.data.forEach((item: any) => {
        axios.post(url + '/api/user/read_user', {
          email: userEmail,
          id: currentId
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }).then((res) => {
          const newAudio = 
          {
            "id": item.id,
            "imageUrl": item.properties['image'][0]['value'],
            "audioUrl": item.properties['audio'][0]['value'],
            "title": item.properties['name'][0]['value'],
            "authorName": 'Unknown Author'
          };
          if (res.data[0].properties['name'][0]['value'])
            newAudio['authorName'] = res.data[0].properties['name'][0]['value'];
          audioArrayData.push(newAudio);
          setAudioArray(audioArrayData);
        }).catch((err) => {
          // console.log(err);
        });
      })
    }
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
    RequestUserProfileImage();
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
    const getData = async () => {
      await loadData();
    };
    getData();
    RequestUserProfileImage();
  }, [props.id]);

  let audioContent, userStat, isShowAddToPlaylist;  

  userStat = (
    <>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src={BeatButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Beats</h4>
          <h4>{props.numBeats}</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Sample Icon' src={SampleButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Samples</h4>
          <h4>{props.numSamples}</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Share Icon' src={ShareButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Shares</h4>
          <h4>{props.numShares}</h4>
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
        <div className={classes.logOut} onClick={() => {
            // Todo: handle log out logic
            logout();
          }} >
          <div style={{marginRight: '10px'}}>
          Log out
          </div>
          
          <img alt='Logout' src={LogOutImage}></img>
        </div>
        <div className={classes.userPictureContainer}>
          <img className={classes.userPicture} src={userPicture} alt=""></img>
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