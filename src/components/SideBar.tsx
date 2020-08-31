import React, { useState, useEffect } from 'react';
import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from './SideBarUseStyles';
import AudioDataTesting from './AudioDataTesting.json';

interface SideBarProps {
  isPlaying: boolean,
  togglePlayPauseButon: any,
  setAudioGlobal: any,
  id: number
}

interface AudioObject {
  imageUrl: string,
  audioUrl: string
  title: string,
  authorName: string,
}

const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles(useStyles);
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);

  const { logout } = useAuth0(); 

  useEffect(() => {
    console.log("props.id : " + props.id);
    console.log("audioArrayLength : " + audioArray.length);
    if (props.id >= 1 && props.id <= 5) {
      setAudioArray([
        AudioDataTesting[1]
      ]);
    } else if (props.id >= 6 && props.id <= 9) {
      setAudioArray([
        AudioDataTesting[2]
      ]);
    } else if (props.id >= 10){
      setAudioArray([
        AudioDataTesting[3]
      ]);
    }
  }, [props.id]);

  let audioContent, userStat;  

  userStat = (
    <>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src='images/beatButton.png'></img>
        <div className={classes.statValues}>
          <h4>Beats</h4>
          <h4>23</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src='images/sampleButton.png'></img>
        <div className={classes.statValues}>
          <h4>Samples</h4>
          <h4>15</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src='images/shareButton.png'></img>
        <div className={classes.statValues}>
          <h4>Shares</h4>
          <h4>135</h4>
        </div>
      </div>
    </>
  )
  
  if (audioArray.length > 0) {
    audioContent = <BrainBeatsAudioPlayer audioObjectArray={audioArray}/>;
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
          }} alt='' src='images/LogoutImage.png'></img>
        </div>
        <div className={classes.userPictureContainer}>
          <Link to='user/profile'><img className={classes.userPicture} src="https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4" alt=""></img></Link>
        </div>
        
        <div className={classes.userStatContainer}>
          {userStat}
        </div>
      </div>
      {audioContent}
    </div>
  );
}

export default SideBar;