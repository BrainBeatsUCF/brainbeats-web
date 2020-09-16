import React, { useState, useEffect, useRef, useContext } from 'react';
// import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import BrainBeatsAudioPlayer from '../components/audio-player/index';
import '../components/audio-player/style.css'
// import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from './SideBarUseStyles';
import AudioDataTesting from '../data/AudioDataTesting.json';
import BeatButtonImage from '../images/beatButton.png';
import ShareButtonImage from '../images/shareButton.png';
import SampleButtonImage from '../images/sampleButton.png';
import LogOutImage from '../images/LogoutImage.png'
import Playlist from '../data/Playlist.json';
import CreatePlaylistPopup from './CreatePlaylistPopup';

import MusicContext from "../util/contexts/music/MusicContext";

interface SideBarProps {
  setAudioGlobal: any,
  id: string
}

interface AudioObject {
  imageUrl: string,
  audioUrl: string
  title: string,
  authorName: string,
  audioId: string,
}

// Todo: Add icon when audio is successfully/finished added to playlist
// Todo: handle playlist area responsiveness when it comes to less than 959

const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles(useStyles);
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [audioId, setAudioId] = useState(props.id);
  const [playListPopup, setPlaylistPopup] = useState(false);

  const musicContext = useContext(MusicContext);
  
  // Todo: get playlist from api
  let playlistsData = Playlist;

  const { logout } = useAuth0(); 

  const openCreatePlaylistPopup = () => {
    setPlaylistPopup(true);
  }

  const closeCreatePlaylistPopup = () => {
    console.log(" playListPopup in closeCreatePlaylistPopup: " + playListPopup);
    setPlaylistPopup(false);
  }

  const showPlaylistArea = () => {
    setShowPlaylists(true);
  }

  const addToPlaylist = (audioId: string, playlistId: string) => {

    console.log(`The audioId that will be parsed: ${audioId}`)
    var playListName = playlistsData.filter((playlist) => playlist.id == playlistId);

    console.log(" add audioId: " + audioId + " to playlistId: " + playlistId);
    console.log(`musicContext songId: ${musicContext.getSongId()}`)
    console.log(`adding song: ${audioArray[musicContext.getSongId()].title} to playlistName: ${playListName[0].title}`)
    console.log(audioArray)
    // console.log(` TestContext: ${AudioIndex.getId}`)
  }

  const handleClick = (e: any) => {
    // Todo: why is playlistpopup is false always in here
    console.log(" playListPopup in handleClick: " + playListPopup);
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

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [playListPopup]);

  useEffect(() => {
    console.log(" props.id in SideBar: " + props.id);
    setAudioId(props.id);

    if (!musicContext.emptyListCheck()) { musicContext.emptyList() }

    if (parseInt(props.id) >= 1 && parseInt(props.id) <= 6) {
      setAudioArray([
        AudioDataTesting[1], AudioDataTesting[2], AudioDataTesting[3]
      ]);
    } else if (parseInt(props.id) >= 7 && parseInt(props.id) <= 11) {
      setAudioArray([
        AudioDataTesting[2]
      ]);
    } else if (parseInt(props.id) >= 12){
      setAudioArray([
        AudioDataTesting[3]
      ]);
    }
  }, [props.id]);

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
          }} alt='Logout Picture' src={LogOutImage}></img>
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
              <div className={classes.playlistTitle} key={key} onClick={() => {addToPlaylist(audioId, playlist.id)}}>
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