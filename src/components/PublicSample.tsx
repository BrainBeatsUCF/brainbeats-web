import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import MusicContext from '../util/contexts/music/MusicContext';
import PublicSampleData from '../data/PublicSample.json';

interface PublicSampleProps {
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
    borderRadius: '10px',
    display: 'inline-block',
    textAlign: 'center',
    width: '200px',
    height: '150px',
    textDecoration: 'none',
  },
  samplePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  sampleTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const PublicSample: React.FC<PublicSampleProps> = ({...props}) => {
  const musicProvider = React.useContext(MusicContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const samples = PublicSampleData;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return (<div>loading...</div>);

  const playSample = (id: string) => {
    props.setAudioGlobal(id);
    musicProvider.setId(id);
    console.log(musicProvider.getCurrentId());
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div>
          <span style={{marginRight: 10}}>Public Samples</span>
          <input type="text" placeholder="Search.."></input>
        </div>
        <hr></hr>
      </div>
      <div className={classes.scroll}>
        {samples.map((sample, key) => {
          return (
            <div className={classes.card} key={key}>
              <img alt='Public Sample Picture' className={classes.samplePicture} src={sample.picture} onClick={() => playSample(sample.id)}></img>
              <div className={classes.sampleTitle}>{sample.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default PublicSample;