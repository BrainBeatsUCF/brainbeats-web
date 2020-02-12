import React from 'react'

export default class AudioPlayer extends React.Component {
  playAudio() {
    let audioPlayer = document.getElementById("audio-element");

    (audioPlayer as HTMLAudioElement).play()
  }
 
  render() {
    return (
      <div>
        <button onClick={this.playAudio}>
          <span>Play Audio</span>
        </button>
        <audio id="audio-element">
          <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
        </audio>
      </div>
    )
  }
}