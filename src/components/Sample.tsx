import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MusicContext from '../util/contexts/music/MusicContext';
import clsx from 'clsx';

interface SampleProps {
  setAudioGlobal: any,
}

interface SampleObject {
  name: string
  id: string,
  imageUrl: string,
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
    whiteSpace: 'nowrap',
    height: '193px',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
  card: {
    borderRadius: '10px',
    display: 'inline-block',
    textAlign: 'center',
    margin: '20px',
    position: 'relative',
    cursor: 'pointer',
    minWidth: '150px',
    minHeight: '150px'
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
  title: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    fontSize: '1.4em',
    marginRight: '10px',
  },
  formInput: {
    marginRight: '10px'
  },
  formElement: {
    borderRadius: '10px',
    backgroundColor: 'rgb(59, 55, 61)',
    fontSize: '0.8em',
    color: 'white'
  }
}));

const Sample: React.FC<SampleProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [samples, setSamples] = useState([] as SampleObject[]);
  const musicProvider = React.useContext(MusicContext);

  const sampleArray = [] as SampleObject[];
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const loadData = async () => {
    // Todo: change this api to sample apis
    axios.post(url + 'api/user/get_owned_samples', 
    {
      email: userEmail
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      musicProvider.setNumSamples(res.data.length);
      res.data.forEach((item: any) => {
        const newSample = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'], 
          "name": item.properties['name'][0]['value'],
        };
        
        sampleArray.push(newSample);
      });
      setSamples(sampleArray);
    }).catch((err) => {
      console.log(err);
    });

    // let userResponse = await axios.post(url + 'api/user/read_user', {
    //   email: userEmail
    // });

    // console.log(userResponse);

    
  }

  useEffect(() => {
    const getData = async () => {
      await loadData();
      setLoading(false);
    };
    getData();
  }, []);

  const playSample = (id: string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('sample');
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10px', alignSelf: 'flex-end'}}>
          <h4 className={classes.title}>My Samples</h4>
          <form style={{display: 'flex'}}>
            <input className={clsx(classes.formInput, classes.formElement)} onChange={(e: any) => {
            // setSearchName(e.target.value);
            }} type="text" placeholder="Search.."></input>
            <button className={classes.formElement}>Search</button>
          </form>
        </div>
        <hr></hr>
      </div>
      {loading ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>Loading...</div> : 
        <div className={classes.scroll}>
          {samples.map((sample, key) => {
            return (
              <div className={classes.card} key={key}>
                {/* Todo: discuss about sample picture */}
                <img alt='Public Sample' className={classes.samplePicture} src={sample.imageUrl} onClick={() => playSample(sample.id)}></img>
                <div className={classes.sampleTitle}>{sample.name}</div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
};

export default Sample;