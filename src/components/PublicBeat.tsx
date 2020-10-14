import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MusicContext } from '../util/contexts/music';

interface PublicBeatProps {
  setAudioGlobal: any,
}

interface PublicBeatObject {
  name: string
  // instrumentList: string[],
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
  const [loading, setLoading] = useState(true);
  const [publicBeats, setPublicBeats] = useState([] as PublicBeatObject[]);
  const publicBeatsArray = [] as PublicBeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const loadData = async () => {
    axios.post(url + 'api/beat/get_all_beats', 
    {
      email: userEmail
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach((item: any) => {

        // const instrumentListArray = [] as String[];
  
        // item.properties['instrumentList']
  
        const newPublicBeat = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "name": item.properties['name'][0]['value'],
          // "instrumentList": instrumentListArray
        };
        
        publicBeatsArray.push(newPublicBeat);
      });
      setPublicBeats(publicBeatsArray);
    }).catch((err) => {
      console.log(err);
    });

    
  }

  useEffect(() => {
    const getData = async () => {
      await loadData();
      setLoading(false);
    };
    getData();
  }, []);

  const playPublicBeat = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('beat');
    // console.log(musicProvider.getCurrentId());
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
      {loading ? <div>Loading...</div> : 
        <div className={classes.scroll}>
          {publicBeats.map((publicBeat, key) => {
            return (
              <div className={classes.card} key={key} onClick={() => playPublicBeat(publicBeat.id)}>
                <img alt='Public Beat' className={classes.background} src={publicBeat.imageUrl}></img>
                <div className={classes.bottomLeftCorner}>
                  <img className={classes.beatPicture} src={publicBeat.imageUrl} alt="Beat Picture"></img>
                  <div>
                    <div>{publicBeat.name}</div>
                    <div className={classes.playButtonAndBeatInfo}>
                      <div>
                        <div>Rock</div>
                        <div>1:32</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        }
    </div>
  );
};

export default PublicBeat;
