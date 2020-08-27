import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { MusicContext } from '../util/contexts/music';

interface PublicBeatProps {
  isPlaying: boolean,
  togglePlayPauseButon: any,
  setAudioGlobal: any,
}

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    paddingLeft: 20,
    margin: 0,
  },
  scroll: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  card: {
    position: 'relative',
    display: 'inline-block',
    margin: 20,
    cursor: 'pointer'
  },
  background: {
    backgroundRepeat: 'no-repeat',
    width: 200,
    height: 150,
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
    width: 75,
    height: 75,
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

  let beats = [
    {
      'id': '6',
      'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg',
      'background': 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      'title': 'guitar testing title',
      'type': 'abcabcabcabcabcabcabcabcabc',
      'numBeats': 10,
      'duration': 2131
    },
    {
      'id': '7',
      'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg',
      'background': 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      'title': 'guitar testing title',
      'type': 'abc',
      'numBeats': 10,
      'duration': 2131
    },
    {
      'id': '8',
      'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg',
      'background': 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      'title': 'guitar testing title',
      'type': 'abc',
      'numBeats': 10,
      'duration': 2131
    },
    {
      'id': '9',
      'background': 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg',
      'title': 'guitar testing title',
      'type': 'abcabcabcabcabcabcabcabcabc',
      'numBeats': 10,
      'duration': 2131
    },
    {
      'id': '10',
      'background': 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg',
      'title': 'guitar testing title',
      'type': 'abc',
      'numBeats': 10,
      'duration': 2131
    },
    {
      'id': '11',
      'background': 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg',
      'title': 'guitar testing title',
      'type': 'abc',
      'numBeats': 10,
      'duration': 2131
    },
  ];

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
              <img alt='' className={classes.background} src={beat.background}></img>
              <div className={classes.bottomLeftCorner}>
                <img className={classes.beatPicture} src={beat.picture} alt=""></img>
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
