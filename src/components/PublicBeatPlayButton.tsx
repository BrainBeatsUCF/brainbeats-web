import React, { useState } from 'react';
import { MusicContext } from '../contexts';
import { makeStyles } from '@material-ui/core/styles';

interface PublicBeatPlayButtonProps {
  isPlaying: boolean,
  togglePlayPauseButon: any
}

const useStyles = makeStyles(() => ({
  playButton: {
    cursor: 'pointer'
  }
}));

const PublicBeatPlayButton: React.FC<PublicBeatPlayButtonProps> = ({...props}) => {
  const [isCardPlaying, setIsCardPlaying] = useState(false);
  const musicProvider = React.useContext(MusicContext);
  const classes = useStyles();

  const playOrPause = (event: React.MouseEvent<HTMLImageElement>) => {
    setIsCardPlaying(!props.isPlaying);
    props.togglePlayPauseButon();
  };

  let button;

  if (isCardPlaying) {
    button = (
      <img className={classes.playButton} alt='' src='images/pauseButton.png' onClick={playOrPause}></img>
    );
  } else {
    button = (
      <img className={classes.playButton} alt='' src='images/playButton.png' onClick={playOrPause}></img>
    );
  }

  return (
    <>
    {button}
    </>
  );
}

export default PublicBeatPlayButton;