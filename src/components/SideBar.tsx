import React, { useState, useEffect, useRef } from 'react';
import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from './SideBarUseStyles';
import AudioDataTesting from '../data/AudioDataTesting.json';
import BeatButtonImage from '../images/beatButton.png';
import ShareButtonImage from '../images/shareButton.png';
import SampleButtonImage from '../images/sampleButton.png';
import LogOutImage from '../images/LogoutImage.png'
import Playlist from '../data/Playlist.json';

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

const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles(useStyles);
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [audioId, setAudioId] = useState(props.id);
  
  // Todo: get playlist from api
  let playlistsData = Playlist;

  const { logout } = useAuth0(); 

  const showPlaylistArea = () => {
    setShowPlaylists(true);
  }

  const addToPlaylist = (audioId: string, playlistId: string) => {
    console.log("add audioId: " + audioId + "to playlistId: " + playlistId);
  }

  const handleClick = (e: any) => {
    if (wrapperRef !== null) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        // inside click
        return;
      }
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
  }, []);

  useEffect(() => {
    console.log("props.id in SideBar: " + props.id);
    setAudioId(props.id);

    if (parseInt(props.id) >= 1 && parseInt(props.id) <= 6) {
      setAudioArray([
        AudioDataTesting[1]
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
        <button onClick={showPlaylistArea}>Add to playlist</button>

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
        <div className={classes.playlists} ref={wrapperRef} style={{display: showPlaylists ? 'flex' : 'none'}}>
          {/* Todo:  Loop through playlists testing data to populate playlist*/}
          <button>Create a playlist</button>
          {playlistsData.map((playlist, key) => {
            return (
              <div style={{cursor: 'pointer', padding: '5px'}} key={key} onClick={() => {addToPlaylist(audioId, playlist.id)}}>
                {key + 1}. {playlist.title}
              </div>
            )
          })}
          
        </div>

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
      </div>

      <div>
        {audioContent}
      </div>
      
    </div>
  );
}

export default SideBar;