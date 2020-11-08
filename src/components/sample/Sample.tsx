import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MusicContext from '../../util/contexts/music/MusicContext';
import clsx from 'clsx';
import { SampleObject, SampleProps } from '../../util/api/types';
import { useStyles } from './useStyles';
import { ValidateAndRegenerateAccessToken } from '../../util/ValidateRegenerateAccessToken';

// All the public samples, both yours and others
const Sample: React.FC<SampleProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [samples, setSamples] = useState([] as SampleObject[]);
  const musicProvider = React.useContext(MusicContext);

  const sampleArray = [] as SampleObject[];
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const [searchName, setSearchName] = useState('');
  const [isSampleEmpty, setIsSampleEmpty] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    ValidateAndRegenerateAccessToken();
    axios.post(url + 'api/sample/get_all_samples', 
    {
      email: userEmail
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach((item: any) => {
        const newSample = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'], 
          "name": item.properties['name'][0]['value'],
        };
        
        sampleArray.push(newSample);
      });
      musicProvider.setOriginalSampleArray(sampleArray);
      if (sampleArray.length === 0) {
        setMessage('You have 0 sample.');
        setIsSampleEmpty(true);
      } else {
        setIsSampleEmpty(false);
      }
      setSamples(sampleArray);
    }).catch((err) => {
      // console.log(err);
    });
  }

  const loadNumSample = async () => {
    ValidateAndRegenerateAccessToken();
    let numPublicSample: number = 0;
    axios.post(url + 'api/user/get_owned_samples', 
    {
      email: userEmail
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach((sample: any) => {
        if (sample.properties['isPrivate'][0]['value'].toLowerCase() === 'true') {
          numPublicSample++;
        }
      });
      props.setNumSamplesMethod(res.data.length);
      props.setNumPublicSamplesMethod(numPublicSample);
    }).catch((err) => {
      // console.log(err);
    });
  }

  useEffect(() => {
    const getData = async () => {
      await loadData();
      await loadNumSample();
      setLoading(false);
    };
    getData();
  }, []);

  const submitSearch = (e: any) => {
    e.preventDefault();
    if (searchName === '') {
      if (musicProvider.getOriginalSampleArray().length === 0) {
        setMessage(`You have 0 sample.`);
        setIsSampleEmpty(true);
      } else {
        setIsSampleEmpty(false);
      }
      setSamples(musicProvider.getOriginalSampleArray());
    } else {
      let sampleArrayByName = [] as SampleObject[];

      musicProvider.getOriginalSampleArray().forEach((sample: SampleObject) => {
        if (sample.name.toLowerCase() === searchName.toLowerCase()) {
          sampleArrayByName.push(sample);
        }
      });
      
      if (sampleArrayByName.length === 0) {
        setMessage(`You have 0 sample with the name ${searchName}`);
        setIsSampleEmpty(true);
      } else {
        setIsSampleEmpty(false);
      }
      setSamples(sampleArrayByName);
    }    
  }

  const playSample = (id: string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('sample');
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10px', alignSelf: 'flex-end'}}>
          <h4 className={classes.title}>My Samples</h4>
          <form style={{display: 'flex'}} onSubmit={submitSearch}>
            <input className={clsx(classes.formInput, classes.formElement)} onChange={(e: any) => {
            setSearchName(e.target.value);
            }} type="text" placeholder="Search.."></input>
            <button className={classes.formElement}>Search</button>
          </form>
        </div>
        <hr></hr>
      </div>
      {loading ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>Loading...</div> : 
        <div className={classes.scroll}>
          {isSampleEmpty ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>{message}</div> :
            <>
              {samples.map((sample, key) => {
                return (
                  <div className={classes.card} key={key}>
                    {/* Todo: discuss about sample picture */}
                    <img alt='Public Sample' className={classes.samplePicture} src={sample.imageUrl} onClick={() => playSample(sample.id)}></img>
                    <div className={classes.sampleTitle}>{sample.name}</div>
                  </div>
                )
              })}
            </>
          }
        </div>
      }
    </div>
  )
};

export default Sample;