import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MusicContext } from '../util/contexts/music';

interface BeatProps {
  setAudioGlobal: any,
}

interface PlaylistObject {
  name: string
  id: string,
  imageUrl: string,
}

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    alignItems: 'left',
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
    margin: '20px',
    position: 'relative',
    cursor: 'pointer'
  },
  background: {
    backgroundRepeat: 'no-repeat',
    width: '200px',
    height: '150px',
    opacity: 0.4,
  },
  cardContent: {
    width: '100%',
    height: '100%',
  },
  songType: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: '50%',
    fontSize: '13px'
  },
  beatContainer: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    bottom: 0
  },
  sampleInstrument: {
    borderRadius: '5px',
    padding: '2px',
    backgroundColor: 'grey',
    margin: '5px',
    opacity: 0.7,
    fontSize: '10px'
  },
}));

// Todo: only display playlist that has beats/samples
const Playlist: React.FC<BeatProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const musicProvider = useContext(MusicContext);

  const [playlists, setPlaylists] = useState([] as PlaylistObject[]);
  const playlistArray = [] as PlaylistObject[];
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const loadData = async () => {
    let playlistResponse = await axios.post(url + 'api/user/get_owned_playlists', 
    {
      email: userEmail
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    // Todo: only display playlist with have one or more songs
    playlistResponse.data.forEach(async (item: any) => {
      console.log(item);
      const newPlaylist = 
      {
        "id": item.id,
        "imageUrl": item.properties['image'][0]['value'],
        "name": item.properties['name'][0]['value'],
      };
      // const playlistReadResponse = await axios.post(url + 'api/playlist/read_playlist_beats', 
      // {
      //   playlistId: item.id
      // },
      // {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      // console.log(playlistReadResponse);
      // if (playlistReadResponse.data.length > 0) {
      //   console.log("Yeaaaaa");
        
      // }
      playlistArray.push(newPlaylist);
    });
    console.log(playlistArray);
    setPlaylists(playlistArray);
  }

  useEffect(() => {
    const getData = async () => {
      await loadData();
      setLoading(false);
    };
    getData();
  }, []);

  const playPlaylist = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setId(id);
    musicProvider.setAudioPlayingType('playlist');
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div>
          <span style={{marginRight: 10}}>My Playlists</span>
          <input type="text" placeholder="Search.."></input>
        </div>
        <hr></hr>
      </div>
      {loading ? <div>loading...</div> : 
        <div className={classes.scroll}>
          {playlists.map((playlist, key) => {
            return (
              // Todo: change playbeat(id) to playbeat(song.id)
              <div className={classes.card} key={key} onClick={() => playPlaylist(playlist.id)}>
                <img alt='Song' className={classes.background} src={playlist.imageUrl}></img>
                <div className={classes.cardContent}>
                  <div className={classes.songType}>
                    {/* Vibing, Not a Phone in Sight */}
                    {playlist.name}
                  </div>
                </div>
                </div>
            )
          })}
        </div>
      }
      
    </div>
  )
};

export default Playlist;
