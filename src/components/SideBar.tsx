import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MusicContext } from '../contexts';
import { type } from 'os';
import axios from 'axios';

const song2 = require('../config/audio/song2.mp3');


interface SideBarProps {
  isPlaying: boolean,
  togglePlayPauseButon: any,
  setAudioGlobal: any,
  id: string
}

const useStyles = makeStyles(() => ({
  sidebarColumn: {
    color: 'white',
    backgroundColor: '#1a1919',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
  },
  fixedLeftBottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1a1919',
  },
  sideBarRow: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userStatus: {
    textAlign: 'right',
    color: 'white'
  },
  header: {
    textAlign: 'center',
  }, 
  picture: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    '@media (max-width: 450px)': {
      width: 50,
      height: 50
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
    width: 250,
    height: 38,
    padding: 5,
    '@media (max-width: 960px)': {
      width: '100%'
    }
  },
  statValues: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    fontSize: 14,
    '@media (max-width: 960px)': {
      width: 120,
      fontSize: '2vw'
    },
  },
  statPicture: {
    paddingRight: 10,
    height: 38,
    width: 38
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
    height: 130,
    width: 130,
    border: 'solid rgb(208, 53, 30) 1px',
    borderRadius: '130px',
    '@media (max-width: 450px)': {
      width: 60,
      height: 60
    }
  },
  playButtonArea: {
    display: 'flex',
    flexDirection: 'row'
  },
  audioPlayButton: {
    padding: 5,
    cursor: 'pointer'
  },
}));

let source:AudioBufferSourceNode;
let startedAt: number;
let pausedAt: number;
let audioContext: AudioContext;
let scriptNode: ScriptProcessorNode;
let progressTime: number = 0;
let rate: number;

// to see if an audio is paused, so audio 1 is paused, but audio 2 is clicked to play, then audio should start at 0
let paused: boolean;

const SideBar: React.FC<SideBarProps> = ({...props}) => {
  const classes = useStyles();
  const isOverMdBreakPoint = useMediaQuery('(min-width:960px)');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);



  const getAudioContext = () => {
    AudioContext = window.AudioContext;
    return new AudioContext();
  }

  let audioPlayButtons, sidebar, audioInfo, userStat, header, audioPlayAreaUI;

  // const loadAudio = async () => {
  //   console.log('testing');
  //   const url = 'https://cors-anywhere.herokuapp.com/' + 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  //   const response = await axios.get(url, {
  //     responseType: 'arraybuffer'
  //   });

  //   const audioContext = getAudioContext();

  //   const audioBuffer = await audioContext.decodeAudioData(response.data);

  //   const source = audioContext.createBufferSource();
  //   source.buffer = audioBuffer;
  //   source.connect(audioContext.destination);

  //   console.log();
  // }

  const playAudio = async () => {

    console.log('currentTime: ' + currentTime);


    const url = 'https://cors-anywhere.herokuapp.com/' + 'http://www.hubharp.com/web_sound/WalloonLilliShort.mp3';
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    
    audioContext = getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(response.data);
    setAudioDuration(audioBuffer.duration);

    // const source = audioContext.createBufferSource();
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    if (pausedAt && paused) {
      console.log('testing');
      startedAt = Date.now() - pausedAt;
      source.start(0, pausedAt / 1000);
      console.log('testing');
      progressTime = currentTime;
    } else {
      startedAt = Date.now();
      source.start();
      progressTime = 0;
    }

    setIsPlaying(true);
    paused = false;

    // testing progress time
    // progressTime = currentTime;

    // progress is 0 if new audio, or currentTime if same audio
    // progressTime = 0;

    // console.log('progresTime: ' + progressTime);
    // console.log('currentTime: ' + currentTime);

    // progress bar
    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer. numberOfChannels);
    scriptNode.connect(audioContext.destination);


    // Todo: stop progress time when it finished
    
    // setCurrentTime(progressTime);
    scriptNode.onaudioprocess = (e) => {
      console.log((e.playbackTime * 100) / audioBuffer.duration);
      // const rate = parseInt((e.playbackTime * 100) / audioBuffer.duration, 10);
      rate = progressTime + (e.playbackTime * 100) / audioBuffer.duration;
      setCurrentTime(rate);
    }

    source.addEventListener('ended', () => {
      setIsPlaying(false);
      scriptNode.disconnect(audioContext.destination);
      scriptNode.onaudioprocess = null;
      rate = 0;
    });
  }

  const pauseAudio = () => {
    source.stop();
    source.disconnect(audioContext.destination);
    scriptNode.onaudioprocess = null;
    pausedAt = Date.now() - startedAt;
    setIsPlaying(false);
    paused = true;
  }
  const backwardPlay = () => {

  }

  const forwardPlay = () => {

  }
  

  if (isPlaying) {
    audioPlayButtons = (
      <>
        <img className={classes.audioPlayButton} alt='Back Button' src='images/backButton.png'></img>
        <img className={classes.audioPlayButton} alt='Pause Button' src='images/pauseButton.png' onClick={pauseAudio}></img>
        <img className={classes.audioPlayButton} alt='Forward Button' src='images/forwardButton.png'></img>
      </>
    );
  } else {
    audioPlayButtons = (
      <>
        <img className={classes.audioPlayButton} alt='Back Button' src='images/backButton.png'></img>
        <img className={classes.audioPlayButton} alt='Play Button' src='images/playButton.png' onClick={playAudio}></img>
        <img className={classes.audioPlayButton} alt='Forward Button' src='images/forwardButton.png'></img>
      </>
    )
  }

  audioInfo = (
    <>
      <div>
        Living a Life
      </div>
      <div>
        Hung Nguyen
      </div>
      <progress id="timebar" value={currentTime} max='100' style={{width: 200}}></progress>
      <div>Time: {currentTime} / {audioDuration}</div>
    </>
  );

  audioPlayAreaUI = (
    <>
    <div className={classes.audioPictureContainer}>
      <img alt='' className={classes.picture} src="data:image/jpeg;base64,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"></img>
    </div>
    
    <div>
      {audioInfo}
    </div>
    
    <div className={classes.playButtonArea}>
      {audioPlayButtons}
    </div>
    </>
  );

  header = (
    <>
      <img alt='' className={classes.picture} src="data:image/jpeg;base64,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"></img>
      <div>Hung</div>
    </>
  );

  

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

          {/* Todo: 
          3 number format
          Use padStart to fill it, for example: 5 should be 005, for consistent format 
          */}
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

  if (isOverMdBreakPoint) {
    sidebar = (
      <div className={classes.sidebarColumn}>
        <div className={classes.userInfo}>
          <div className={classes.userStatus}>
            Log out
            <img alt='' src='images/LogoutImage.png'></img>
          </div>
          <div className={classes.header}>
            {header}
          </div>

          <div className={classes.statContainer}>
            {userStat}
          </div>
        </div>
        

        <div className={classes.audioArea}>
          {audioPlayAreaUI}
        </div>
      </div>
    )
  } else {
    sidebar = (
      <div className={classes.fixedLeftBottom}>
        <div>
          <div className={classes.userStatus}>
            Log out
            <img alt='' src='images/LogoutImage.png'></img>
          </div>
        </div>
        
        <div className={classes.sideBarRow}>
          <div className={classes.statContainer}>
            {userStat}
          </div>
          
          <div className={classes.audioArea}>
            {audioPlayAreaUI}
          </div>
        
          <div className={classes.header}>
              {header}
          </div>
        </div>
      </div>
    )
  }


  // users have to load song first
  // only new song gets to load and play at start
  // current song is only able to play and pause/ resume
  React.useEffect(() => {
    console.log(props.id);

    if (props.id == '')
      return;

    // stop another source before loading and play another one if props.id changes
    if (source != null) {
      source.stop();
      scriptNode.onaudioprocess = null;
      rate = 0;
    }
      
    paused = false;
    console.log('set current time back to 0');
    setCurrentTime(0);

    playAudio();
    
  }, [props.id]);
  
  return (
    <>
    {sidebar}
    </>
  );
}

export default SideBar;