import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { MusicContext } from '../util/contexts/music';
import PublicBeatData from '../data/PublicBeat.json';

interface PublicBeatProps {
  setAudioGlobal: any,
}

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    paddingLeft: '20px',
    margin: 0,
  },
  scroll: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  card: {
    position: 'relative',
    display: 'inline-block',
    margin: '20px',
    cursor: 'pointer'
  },
  background: {
    backgroundRepeat: 'no-repeat',
    width: '200px',
    height: '150px',
    opacity: 0.4
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  beatPicture: {
    width: '75px',
    height: '75px',
  },
  playButtonAndBeatInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  playButton: {
    cursor: 'pointer'
  }
}));

const PublicBeat: React.FC<PublicBeatProps> = ({...props}) => {
  const classes = useStyles();
  const musicProvider = React.useContext(MusicContext);
  let beats = PublicBeatData;

  const playPublicBeat = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setId(id);
    console.log(musicProvider.getCurrentId());
  }

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div>
          <span style={{marginRight: 10}}>Public Beats</span>
          <input type="text" placeholder="Search.."></input>
        </div>
        <hr></hr>
      </div>
      <div className={classes.scroll}>
        {beats.map((beat, key) => {
          return (
            <div className={classes.card} key={key} onClick={() => playPublicBeat(beat.id)}>
              <img alt='Public Beat Picture' className={classes.background} src={beat.background}></img>
              <div className={classes.bottomLeftCorner}>
                <img className={classes.beatPicture} src={beat.picture} alt="Beat Picture"></img>
                <div>
                  <div>{beat.title}</div>
                  <div className={classes.playButtonAndBeatInfo}>
                    <div>
                      <div>{beat.type}</div>
                      <div>{beat.duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PublicBeat;
