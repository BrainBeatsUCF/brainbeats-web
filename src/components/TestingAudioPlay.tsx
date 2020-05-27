import * as React from 'react';
import axios from 'axios';

interface AudioObject {
  title: string,
  authorName: string,
  imageUrl: string,
  audioUrl: string
}

interface AudioPlayerProps { 
  audioObjectArrays: AudioObject[],
  id: number
}

let source:AudioBufferSourceNode;
let startedAt: number;
let pausedAt: number;
let audioContext: AudioContext;
let scriptNode: ScriptProcessorNode;

// Progress bar
let rate: number;
let progressTime: number = 0;
let xPosition: number = 0;

// Audio Time
let minutes: number = 0;
let seconds: number = 0;

// to see if an audio is paused, so audio 1 is paused, but audio 2 is clicked to play, then audio should start at 0
let paused: boolean;

// isNew to determine whether an audio should play at start, for example, play forward or backward should has isNew as true.
// or an audio is paused and then play again, isNew should be false;
let isNew: boolean = true;

const AudioPlayer: React.FC<AudioPlayerProps> = ({...props}) => {
  const [playingIndex, setPlayingIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [progressRate, setProgressRate] = React.useState(0);

  // audio info
  const [title, setTitle] = React.useState('');
  const [authorName, setAuthorName] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [audioUrl, setAudioUrl] = React.useState('');

  // TIMER
  const [secondRunning, setSecondRunning] = React.useState(1);
  const [minuteRunning, setMinuteRunning] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const toggleActivateForTimer = () => {
    setIsActive(!isActive);
  }

  const resetTimer = () => {
    setSecondRunning(1);
    setProgressRate(0);
    setIsActive(false);
  }

  const pauseAudio = () => {

    isNew = false;

    console.log('id: ' + props.id);
    source.stop();
    setIsActive(false);
    pausedAt = Date.now() - startedAt;
    setIsPlaying(false);
    paused = true;
  }

  const playAudio = async () => {
    console.log('isNew ' + isNew);
    const url = 'https://cors-anywhere.herokuapp.com/' + props.audioObjectArrays[playingIndex].audioUrl;
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    setAudioUrl(props.audioObjectArrays[playingIndex].audioUrl);
    setTitle(props.audioObjectArrays[playingIndex].title);
    setAuthorName(props.audioObjectArrays[playingIndex].authorName);
    setImageUrl(props.audioObjectArrays[playingIndex].imageUrl);
    
    audioContext = getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(response.data);
    setAudioDuration(Math.ceil(audioBuffer.duration));
    console.log('audioBuffer Duration: ' + audioBuffer.duration);

    minutes = Math.floor(Math.ceil(audioBuffer.duration) / 60);
    seconds = Math.ceil(audioBuffer.duration) % 60;

    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    if (isNew) {
      startedAt = Date.now();
      source.start();
      setIsActive(false);
      setSecondRunning(1);
      setMinuteRunning(0);

      // progress rate always start at 0 for new audio
      setProgressRate(0);

      progressTime = 0;
      
    } else if (pausedAt && paused) {
      console.log('testing');
      startedAt = Date.now() - pausedAt;
      console.log('start after pausing at: ' + pausedAt / 1000);
      source.start(0, pausedAt / 1000);
      console.log('testing');
      // toggleActivateForTimer();
      progressTime = progressRate;
    }

    setIsActive(true);
    setIsPlaying(true);
    paused = false;

    // progress bar
    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer. numberOfChannels);
    scriptNode.connect(audioContext.destination);
    
    // setCurrentTime(progressTime);
    scriptNode.onaudioprocess = (e) => {
      // console.log((e.playbackTime * 100) / audioBuffer.duration);
      rate = progressTime + (e.playbackTime * 100) / audioBuffer.duration;
      console.log('rate : ' + rate);
      console.log('progressTime: ' + progressTime);
      setProgressRate(rate);
    }

    // executed when audio is pause or finished
    source.onended = () => {
      console.log('testing on ended');
      setIsPlaying(false);
      scriptNode.onaudioprocess = null;
    }
  }

  const playBackward = () => {
    stopPrevAudio();
    console.log('play backward with index: ' + playingIndex);

    // testing forward backward
    isNew = true;

    let nextIndex = playingIndex - 1;
    if (nextIndex < 0)
      setPlayingIndex(props.audioObjectArrays.length - 1);
    else
      setPlayingIndex(nextIndex);
  }

  const stopPrevAudio = () => {
    setIsActive(false);
    setSecondRunning(1);
    if (source != null) {
      source.stop();
      scriptNode.onaudioprocess = null;
      rate = 0;
    }
  }

  const playForward = () => {
    stopPrevAudio();

    isNew = true;

    let nextIndex = playingIndex + 1;
    if (nextIndex >= props.audioObjectArrays.length)
      setPlayingIndex(0);
    else
      setPlayingIndex(nextIndex);
  }

  const getAudioContext = () => {
    AudioContext = window.AudioContext;
    return new AudioContext();
  }

  const rewindTimer = async (e: any) => {
    console.log('running second: ' + secondRunning);

    const rate:number = ((e.clientX - xPosition) * 100) / e.target.offsetWidth;
    console.log('rate: ' + rate);
    const playbackTime:number = (audioDuration * rate) / 100;
    console.log('playBackTime: ' + playbackTime);

    source.stop();

    const url = 'https://cors-anywhere.herokuapp.com/' + props.audioObjectArrays[playingIndex].audioUrl;
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    audioContext = getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(response.data);

    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    let progressTimeLocal = (playbackTime / audioDuration) * 100;    
    console.log('progressTimeLocal: ' + progressTimeLocal);
    setProgressRate(0);

    setIsActive(true);
    setIsPlaying(true);
    paused = false;

    setSecondRunning(Math.ceil(playbackTime%60));
    setMinuteRunning(Math.floor(playbackTime / 60));


    source.start(0, playbackTime);

    startedAt = Date.now() - playbackTime * 1000;

    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer. numberOfChannels);
    scriptNode.connect(audioContext.destination);

    scriptNode.onaudioprocess = (e) => {
      // console.log((e.playbackTime * 100) / audioBuffer.duration);
      // let newRate = progressTimeLocal + (e.playbackTime * 100) / audioBuffer.duration;
      console.log(e.playbackTime);
      let newRate = progressTimeLocal + (e.playbackTime * 100) / audioBuffer.duration;
      // console.log('rate ' + rate);
      console.log('newRate : ' + newRate);
      setProgressRate(newRate);
    }

    // executed when audio is pause or finished
    source.onended = () => {
      console.log('testing on ended');
      setIsPlaying(false);
      scriptNode.onaudioprocess = null;
    }
  }
  
  // why does this render keep rendering 
  const getXPosition = (el: any) => {
    // console.log('testing get x postiion: ' + el.getBoundingClientRect().x);
    xPosition = el.getBoundingClientRect().x;
  }

  // TIMER
  React.useEffect(() => {
    let interval: any;
    if (secondRunning >= 60) {
      setSecondRunning(0);
      setMinuteRunning(minuteRunning + 1);
    }
    if (audioDuration !== 0) {
      if (audioDuration === secondRunning + minuteRunning * 60) {
        console.log('secondRunning: ' + secondRunning);
        console.log('audioDuration: ' + audioDuration);
        clearInterval(interval);
        isNew = true;
        resetTimer();

        if (playingIndex == props.audioObjectArrays.length - 1)
          setPlayingIndex(0);
        else 
          setPlayingIndex(playingIndex + 1);
      }
    }  
    if (isActive) {
      interval = setInterval(() => {
        setSecondRunning(second => second + 1);
      }, 1000);
    } else if (!isActive && secondRunning !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, secondRunning]);

  React.useEffect(() => {
    // play audio
    console.log('playing new');
    isNew = true;
    playAudio();

  }, [playingIndex]); // starts at 0 index when users click an audio
  let audioPlayButtons;

  if (isPlaying) {
    audioPlayButtons = (
      <>
        <img alt='Back Button' src='images/backButton.png' onClick={playBackward}></img>
        <img alt='Pause Button' src='images/pauseButton.png' onClick={pauseAudio}></img>
        <img alt='Forward Button' src='images/forwardButton.png' onClick={playForward}></img>
      </>
    );
  } else {
    audioPlayButtons = (
      <>
        <img alt='Back Button' src='images/backButton.png' onClick={playBackward}></img>
        <img alt='Play Button' src='images/playButton.png' onClick={playAudio}></img>
        <img alt='Forward Button' src='images/forwardButton.png' onClick={playForward}></img>
      </>
    )
  }

  return (

    // render picture, title, author name
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', color: 'white'}}>
      <img src={imageUrl}></img>
      <div>Author name: {authorName}</div>
      <progress
        ref={el => {
          // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
          if (!el) return;

          getXPosition(el);
        }}
       onClick={rewindTimer} id="timebar" value={progressRate} max='100' style={{width: 200}}
       >
       </progress>
      <div>Time: {minuteRunning.toString().padStart(2, '0')}:{secondRunning.toString().padStart(2, '0')} / {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:' center', alignContent: 'center'}}>
        {audioPlayButtons}  
      </div>
      
    </div>
  );
};

export default AudioPlayer;

