import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MusicContext } from '../../util/contexts/music';
import clsx from 'clsx';
import { PlaylistObject, PlaylistProps } from '../../util/api/types';
import { useStyles } from './useStyles';

// Todo: only display playlist that has beats/samples
const Playlist: React.FC<PlaylistProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const musicProvider = useContext(MusicContext);

  const [playlists, setPlaylists] = useState([] as PlaylistObject[]);
  const playlistArray = [] as PlaylistObject[];
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net";

  const [searchName, setSearchName] = useState('Test Beat Private');
  const [noBeatByName, setNoBeatByName] = useState(false);
  const [searchNameCompleteValue, setSearchNameCompleteValue] = useState('');

  const loadData = async () => {
    axios.post(url + '/api/user/get_owned_playlists', 
    {
      email: userEmail
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      res.data.forEach(async (item: any) => {
        const newPlaylist = 
        {
          "id": item.id,
          "imageUrl": item.properties['image'][0]['value'],
          "name": item.properties['name'][0]['value'],
        };
        playlistArray.push(newPlaylist);
      });
      musicProvider.setOriginalPlaylistArray(playlistArray);
      setPlaylists(playlistArray);
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
      setPlaylists(musicProvider.getOriginalPlaylistArray());
    } else {
      let playlistArrayByName = [] as PlaylistObject[];

      musicProvider.getOriginalPlaylistArray().forEach((playlist: PlaylistObject) => {
        if (playlist.name.toLowerCase() === searchName.toLowerCase()) {
          playlistArrayByName.push(playlist);
        }
      });

      if (playlistArrayByName.length === 0) {
        setNoBeatByName(true);
      } else {
        setNoBeatByName(false);
      }
      setPlaylists(playlistArrayByName);
    }    
  }

  const playPlaylist = (id:string) => {
    props.setAudioGlobal(id);
    musicProvider.setAudioPlayingType('playlist');
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.header}>
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10px', alignSelf: 'flex-end'}}>
          <h4 className={classes.title}>My Playlists</h4>
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
            {noBeatByName ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>No playlists with the name of {searchNameCompleteValue}</div> :
            <>
              {playlists.map((playlist, key) => {
                return (
                  <div className={classes.card} key={key} onClick={() => playPlaylist(playlist.id)}>
                    <img alt='Playlist' className={classes.background} src={playlist.imageUrl}></img>
                    <div className={classes.cardContent}>
                      <div className={classes.songType}>
                        {/* Vibing, Not a Phone in Sight */}
                        {playlist.name}
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
  )
};

export default Playlist;
