import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MusicContext } from '../../util/contexts/music';
import clsx from 'clsx';
import { PlaylistObject, PlaylistProps } from '../../util/api/types';
import { useStyles } from './useStyles';
import { ValidateAndRegenerateAccessToken } from '../../util/ValidateRegenerateAccessToken';

// Todo: all your playlist + others public playlists
const Playlist: React.FC<PlaylistProps> = ({...props}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const musicProvider = useContext(MusicContext);

  const [playlists, setPlaylists] = useState([] as PlaylistObject[]);
  const playlistArray = [] as PlaylistObject[];
  let userEmail = localStorage.getItem('userEmail');
  const url = "https://brain-beats-server-docker.azurewebsites.net";

  const [message, setMessage] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isEmptyPlaylist, setIsPlaylistEmpty] = useState(false);

  const loadData = async () => {
    ValidateAndRegenerateAccessToken();
    axios.post(url + '/api/playlist/get_all_playlists', 
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

        // Todo: only add if length is great than 0
        playlistArray.push(newPlaylist);
      });
      musicProvider.setOriginalPlaylistArray(playlistArray);
      if (playlistArray.length === 0) {
        setMessage('You have 0 playlist.');
        setIsPlaylistEmpty(true);
      } else {
        setIsPlaylistEmpty(false);
      }
      setPlaylists(playlistArray);
    }).catch((err) => {
      // console.log(err);
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
    if (searchName === '') {
      if (musicProvider.getOriginalPlaylistArray().length === 0) {
        setMessage('You have 0 playlist.');
        setIsPlaylistEmpty(true);
      } else {
        setIsPlaylistEmpty(false);
      }
      setPlaylists(musicProvider.getOriginalPlaylistArray());
    } else {
      let playlistArrayByName = [] as PlaylistObject[];

      musicProvider.getOriginalPlaylistArray().forEach((playlist: PlaylistObject) => {
        if (playlist.name.toLowerCase().includes(searchName.toLowerCase())) {
          playlistArrayByName.push(playlist);
        }
      });

      if (playlistArrayByName.length === 0) {
        setMessage(`You have 0 playlist with the name ${searchName}.`);
        setIsPlaylistEmpty(true);
      } else {
        setIsPlaylistEmpty(false);
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
            {isEmptyPlaylist ? <div style={{paddingLeft: '20px', paddingBottom: '10px'}}>{message}</div> :
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
