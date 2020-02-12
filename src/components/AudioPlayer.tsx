import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default class Player extends React.Component {
  playAudio() {
    let audioPlayer = document.getElementById("audio-element");

    (audioPlayer as HTMLAudioElement).play()
  }
 
  render() {
    return (
      <AudioPlayer
      autoPlay
      src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"
      onPlay={e => console.log("onPlay")}
      // other props here
    />
    )
  }
}