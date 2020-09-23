import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface PublicSampleProps {
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
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [samples, setSamples] = useState([] as SampleObject[]);

  const sampleArray = [] as SampleObject[];
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const loadData = async () => {
    // Todo: change this api to sample apis
    let sampleResponse = await axios.post(url + 'api/user/get_owned_beats', {
        email: userEmail
    });

    console.log(sampleResponse.data);
    // let userResponse = await axios.post(url + 'api/user/read_user', {
    //   email: userEmail
    // });

    // console.log(userResponse);

    sampleResponse.data.forEach((item: any) => {
      const newSample = 
      {
        "id": item.id,
        "imageUrl": item.properties['image'][0]['value'],
        "name": item.properties['name'][0]['value'],
        // "instrumentList": instrumentListArray
      };
      
      sampleArray.push(newSample);
    });
    setSamples(sampleArray);
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
      {loading ? <div>loading...</div> : 
        <div className={classes.scroll}>
          {samples.map((sample, key) => {
            return (
              <div className={classes.card} key={key}>
                {/* Todo: discuss about sample picture */}
                <img alt='Public Sample' className={classes.samplePicture} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-By0yPUMOuSRY2S6yxiA8-k6bTgraIUqUqbNvKN4E4z7N75iuC4bWj3aDNi_5SCEzrYQx34iu&usqp=CAc" onClick={() => playSample(sample.id)}></img>
                <div className={classes.sampleTitle}>{sample.name}</div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
};

export default PublicSample;