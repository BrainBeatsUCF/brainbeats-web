import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MusicContext } from '../../util/contexts/music';
import clsx from 'clsx';
import { PublicBeatObject, PublicBeatProps } from '../../util/api/types';
import { useStyles } from './PublicBeatUseStyles';

// const useStyles = makeStyles(() => ({
//   componentContainer: {
//     color: 'white',
//   },
//   header: {
//     paddingLeft: '20px',
//     margin: 0,
//   },
//   scroll: {
//     whiteSpace: 'nowrap',
//     height: '193px',
//     overflowY: 'hidden',
//     overflowX: 'scroll',
//   },
//   card: {
//     position: 'relative',
//     display: 'inline-block',
//     margin: '20px',
//     cursor: 'pointer',
//     minWidth: '200px',
//     minHeight: '150px'
//   },
//   background: {
//     backgroundRepeat: 'no-repeat',
//     width: '200px',
//     height: '150px',
//     opacity: 0.4
//   },
//   bottomLeftCorner: {
//     position: 'absolute',
//     bottom: 0,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'flex-end'
//   },
//   beatPicture: {
//     width: '75px',
//     height: '75px',
//   },
//   playButtonAndBeatInfo: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   title: {
//     margin: 0,
//     padding: 0,
//     fontWeight: 'bold',
//     fontSize: '1.4em',
//     marginRight: '10px',
//   },
//   formInput: {
//     marginRight: '10px'
//   },
//   formElement: {
//     borderRadius: '10px',
//     backgroundColor: 'rgb(59, 55, 61)',
//     fontSize: '0.8em',
//     color: 'white'
//   }
// }));

const PublicBeat: React.FC<PublicBeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [publicBeats, setPublicBeats] = useState([] as PublicBeatObject[]);
  const publicBeatArray = [] as PublicBeatObject[];
  const musicProvider = React.useContext(MusicContext);
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const [searchName, setSearchName] = useState('Test Beat Private');
  const [noBeatByName, setNoBeatByName] = useState(false);
  const [searchNameCompleteValue, setSearchNameCompleteValue] = useState('');

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
        
        publicBeatArray.push(newPublicBeat);
      });
      musicProvider.setOriginalPublicBeatArray(publicBeatArray);
      setPublicBeats(publicBeatArray);
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

  const submitSearch = (e: any) => {
    e.preventDefault();
    setSearchNameCompleteValue(searchName);
    if (searchName === '') {
      setNoBeatByName(false);
      setPublicBeats(musicProvider.getOriginalPublicBeatArray());
    } else {
      let publicBeatArrayByName = [] as PublicBeatObject[];

      musicProvider.getOriginalPublicBeatArray().forEach((publicBeat: PublicBeatObject) => {
        if (publicBeat.name.toLowerCase() === searchName.toLowerCase()) {
          publicBeatArrayByName.push(publicBeat);
        }
      })

      if (publicBeatArrayByName.length === 0) {
        setNoBeatByName(true);
      } else {
        setNoBeatByName(false);
      }

      setPublicBeats(publicBeatArrayByName);
    }    
  }

  const playPublicBeat = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('beat');
  }

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10px', alignSelf: 'flex-end'}}>
          <h4 className={classes.title}>Public Beats</h4>
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
          {noBeatByName ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>No public beats with the name of {searchNameCompleteValue}</div> :
            <>
              {publicBeats.map((publicBeat, key) => {
                return (
                  <div className={classes.card} key={key} onClick={() => playPublicBeat(publicBeat.id)}>
                    <img alt='Public Beat' className={classes.background} src={publicBeat.imageUrl}></img>
                    <div className={classes.bottomLeftCorner}>
                      {/* <img className={classes.beatPicture} src={publicBeat.imageUrl} alt="Beat Picture"></img> */}
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
            </>
          }
        </div>
      }
    </div>
  );
};

export default PublicBeat;
