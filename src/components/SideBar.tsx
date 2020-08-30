import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BrainBeatsAudioPlayer from '@brainbeatsucf/brainbeats-audio-player';
import '@brainbeatsucf/brainbeats-audio-player/src/style.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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

const useStyles = makeStyles(() => ({
  fixedLeftBottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1a1919',
  },
  userInfo: {
    width: '100%',
    alignContent: 'center'
  },
  userStatus: {
    textAlign: 'right',
    color: 'white'
  },
  header: {
    textAlign: 'center',
  }, 
  picture: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    '@media (max-width: 450px)': {
      width: '50px',
      height: '50px'
    }
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statElement: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '38px',
    width: '100%',
    '@media (max-width: 960px)': {
      width: '100%'
    }
  },
  statValues: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: '14px',
    '@media (max-width: 960px)': {
      width: '120px',
      fontSize: '2vw'
    },
  },
  statPicture: {
    paddingRight: '10px',
    height: '38px',
    width: '38px'
  },
  audioArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  audioPictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    width: '130px',
    border: 'solid rgb(208, 53, 30) 1px',
    borderRadius: '130px',
    '@media (max-width: 450px)': {
      width: '60px',
      height: '60px'
    }
  },
  playButtonArea: {
    display: 'flex',
    flexDirection: 'row'
  },
  audioPlayButton: {
    padding: '5px',
    cursor: 'pointer'
  },
  sideBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#1a1919',
    color: 'white',
    '@media (max-width: 959px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      minHeight: '60px'
    },
    '@media (min-width: 960px)': {
      height: '100%'
    } 
  },
  userPicture: {
    height: '120px',
    width: '120px',
    borderRadius: '50%',
    '@media (max-width: 959px)': {
      height: '60px',
      width: '60px'
    },
  },
  userPictureContainer: {
    textAlign: 'center',
    '@media (max-width: 959px)': {
      position: 'absolute',
      left: 0,
      top: 0
    },
  },
  userStatContainer: {
    
    '@media (max-width: 959px)': {
      display: 'none'
    },
  }
}));


const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles();
  const [audioArray, setAudioArray] = useState([] as AudioObject[]);

  const { logout } = useAuth0(); 

  useEffect(() => {
    console.log("props.id : " + props.id);
    console.log("audioArrayLength : " + audioArray.length);
    if (props.id >= 1 && props.id <= 5) {
      setAudioArray([
        {
          'imageUrl': 'https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4',
          'audioUrl': 'http://www.hubharp.com/web_sound/WalloonLilliShort.mp3',
          'title': 'audio 1 title',
          'authorName': 'author 1'
        },
        {
          'imageUrl': 'https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4',
          'audioUrl': 'http://www.hubharp.com/web_sound/BachGavotteShort.mp3',
          'title': 'audio 2 title',
          'authorName': 'author 2'
        }
      ]);
    } else if (props.id >= 6 && props.id <= 9) {
      setAudioArray([
        {
          'imageUrl': 'https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4',
          'audioUrl': 'http://www.hubharp.com/web_sound/BachGavotteShort.mp3',
          'title': 'audio 2 title',
          'authorName': 'author 2'
        },
        {
          'imageUrl': 'https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4',
          'audioUrl': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          'title': 'audio 3 title',
          'authorName': 'author 3'
        }
      ]);
    } else if (props.id >= 10){
      setAudioArray([
        {
          'imageUrl': 'https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4',
          'audioUrl': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          'title': 'audio 3 title',
          'authorName': 'author 3'
              },
        {
          'imageUrl': 'https://qph.fs.quoracdn.net/main-qimg-70d48d9e6d598aa364c13ef739b489d4',
          'audioUrl': 'http://www.hubharp.com/web_sound/WalloonLilliShort.mp3',
          'title': 'audio 1 title',
          'authorName': 'author 1'
        }
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