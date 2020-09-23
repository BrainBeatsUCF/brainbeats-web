import React, { useState, useEffect, useRef } from 'react';
import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { Link } from 'react-router-dom';
import { useStyles } from './SideBarUseStyles';
import BeatButtonImage from '../images/beatButton.png';
import ShareButtonImage from '../images/shareButton.png';
import SampleButtonImage from '../images/sampleButton.png';
import LogOutImage from '../images/LogoutImage.png'
import Playlist from '../data/Playlist.json';
import CreatePlaylistPopup from './CreatePlaylistPopup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { MusicContext } from '../util/contexts/music';

interface SideBarProps {
  setAudioGlobal: any,
  id: string
}

interface AudioObject {
  imageUrl: string,
  audioUrl: string
  title: string,
  authorName: string,
}

// Todo: Add icon when audio is successfully/finished added to playlist
// Todo: handle playlist area responsiveness when it comes to less than 959
// Todo: need to handle to distinguish whether user play sample/beat/ or playlist

const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles(useStyles);
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [audioId, setAudioId] = useState(props.id);
  const [playListPopup, setPlaylistPopup] = useState(false);
  const history = useHistory();
  const musicProvider = React.useContext(MusicContext);

  const [beats, setBeats] = useState([]);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";
  
  // Todo: get playlist from api
  let playlistsData = Playlist;

  const logout = () => {
    // call log out api

      // remove local storage
      localStorage.removeItem('userEmail');

      // push to login
      history.push('login');
  }

  const openCreatePlaylistPopup = () => {
    setPlaylistPopup(true);
  }

  const closeCreatePlaylistPopup = () => {
    console.log("playListPopup in closeCreatePlaylistPopup: " + playListPopup);
    setPlaylistPopup(false);
  }

  const showPlaylistArea = () => {
    setShowPlaylists(true);
  }

  const addToPlaylist = (audioId: string, playlistId: string) => {
    console.log("add audioId: " + audioId + "to playlistId: " + playlistId);
  }

  const handleClick = (e: any) => {
    // Todo: why is playlistpopup is false always in here
    console.log("playListPopup in handleClick: " + playListPopup);
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

  const loadData = async () => {
    console.log('props.id ' + props.id);
    console.log(musicProvider.getAudioPlayingType());
    if (props.id === '0') {
      console.log('id = 0');
      return;
    }
     
    // Play Beat Part
    // const beatResponse = await axios.post(url + 'api/beat/read_beat', {
    //   beatId: props.id
    // });

    // console.log(beatResponse.data);

    // let audioArrayData = [] as AudioObject[];

    // beatResponse.data.forEach((item: any) => {
    //   const newAudio = 
    //   {
    //     "imageUrl": beatResponse.data[0].properties['image'][0]['value'],
    //     "audioUrl": beatResponse.data[0].properties['audio'][0]['value'],
    //     "title": beatResponse.data[0].properties['name'][0]['value'],
    //     "authorName": "Hung Nguyen"
    //   };
      
    //   audioArrayData.push(newAudio);
    // });

    // setAudioArray(audioArrayData);

    let audioArrayData = [] as AudioObject[];
    // Play Playlist Part
    if (musicProvider.getAudioPlayingType() === 'playlist') {
      const playlistResponse = await axios.post(url + 'api/playlist/read_playlist_beats', {
        playlistId: props.id
      });    
  
      playlistResponse.data.forEach((item: any) => {
        const newAudio = 
        {
          "imageUrl": item.properties['image'][0]['value'],
          "audioUrl": item.properties['audio'][0]['value'],
          "title": item.properties['name'][0]['value'],
          "authorName": "Hung Nguyen"
        };
        
        audioArrayData.push(newAudio);
      });
    } else if (musicProvider.getAudioPlayingType() === 'beat') {
      const beatResponse = await axios.post(url + 'api/beat/read_beat', {
        beatId: props.id
      });
  
      beatResponse.data.forEach((item: any) => {
        const newAudio = 
        {
          "imageUrl": beatResponse.data[0].properties['image'][0]['value'],
          "audioUrl": beatResponse.data[0].properties['audio'][0]['value'],
          "title": beatResponse.data[0].properties['name'][0]['value'],
          "authorName": "Hung Nguyen"
        };
        audioArrayData.push(newAudio);
      });      
    }
    // const playlistResponse = await axios.post(url + 'api/playlist/read_playlist_beats', {
    //   playlistId: props.id
    // });

    // let audioArrayData = [] as AudioObject[];

    // playlistResponse.data.forEach((item: any) => {
    //   const newAudio = 
    //   {
    //     "imageUrl": item.properties['image'][0]['value'],
    //     "audioUrl": item.properties['audio'][0]['value'],
    //     "title": item.properties['name'][0]['value'],
    //     "authorName": "Hung Nguyen"
    //   };
      
    //   audioArrayData.push(newAudio);
    // });

    setAudioArray(audioArrayData);
  }

  useEffect(() => {
    const getData = async () => {
      await loadData();
    };
    getData();

    // setBeat here
    // setAudioArray
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

  let audioContent, userStat;  

  userStat = (
    <>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src={BeatButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Beats</h4>
          <h4>23</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Sample Icon' src={SampleButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Samples</h4>
          <h4>15</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Share Icon' src={ShareButtonImage}></img>
        <div className={classes.statValues}>
          <h4>Shares</h4>
          <h4>135</h4>
        </div>
      </div>
    </>
  )
  
  if (audioArray.length > 0) {
    audioContent = (
      <>
        <button className={classes.addPlaylistButton} onClick={showPlaylistArea}>Add to my playlists</button>

        {/* Todo: How to figure out the audioId for next audio in a playlist */}
        {/* Maybe go back to brain beats audio package to export another function to get the current audioId */}
        <BrainBeatsAudioPlayer audioObjectArray={audioArray}/>
      </>
    );
  } else {
    audioContent = <></>;
  }
  
  return (
    <div className={classes.sideBarContainer}>
      <div className={classes.userInfo}>
        <div style={{textAlign: 'right'}}>
          <img onClick={() => {
            // handle log out logic
            logout();
          }} alt='Logout' src={LogOutImage}></img>
        </div>
        <div className={classes.userPictureContainer}>
          <Link to='user/profile'><img className={classes.userPicture} src="https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4" alt=""></img></Link>
        </div>
        
        <div className={classes.userStatContainer}>
          {userStat}
        </div>

        <div className={classes.playlists} ref={wrapperRef} style={{display: showPlaylists ? 'flex' : 'none'}}>
          {/* Todo:  Loop through playlists testing data to populate playlist*/}
          <button onClick={openCreatePlaylistPopup}>Create a playlist</button>
          {playlistsData.map((playlist, key) => {
            return (
              <div className={classes.playlistTitle} key={key} onClick={() => {addToPlaylist(props.id, playlist.id)}}>
                {key + 1}. {playlist.title}
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