import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { List, ListItem, ListItemAvatar, ListItemText, Tooltip, Fade } from '@material-ui/core';
import { BackendContext } from '../util/api';
import { PlaylistDetail, Song } from '../util/api/types';

interface Props {
  playlistId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }),
);

const PlaylistDetails: React.FC<Props> = (props) => {
  const api = React.useContext(BackendContext);
  const classes = useStyles();

  const [picture, setPicture] = useState('');
  const [numSong, setNumSong] = useState(0);
  const [playlist, setPlaylist] = useState({} as PlaylistDetail);
  const [songs, setSongs] = useState([] as Song[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      api.demoGetPlaylist(props.playlistId).then(async (res: PlaylistDetail) => {
        
        let songsList = [] as Song[];
        res.songList.forEach(async (songId) => {
          await api.demoGetSong(songId).then((song) => {
            songsList.push(song);
          });
        });
  
        setPicture(res.playlistImage);
        setNumSong(res.songList.length);
        setPlaylist(res);
        setSongs(songsList);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => console.log(err));
  
      console.log(props.playlistId);
    }
    
  }, []);

  const handleFavorite = () => {
    console.log('Add to playlist');
  };

  const handleSongPlay = (songId: string) => () => {
    console.log('Play this songId: ' + songId);
  };

  if (loading) return (<div>loading...</div>);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Grid container>
          <Grid item xs={5} sm={12}>
            <img alt='Playlist Picture' className={clsx(classes.large)} src={picture}/>
          </Grid>
          <Grid item xs={5} sm={12}>
            <Hidden smUp>
              <h3>Playlist Name: {playlist.playlistName}</h3>
            </Hidden>
            <p>Number of songs: {numSong}</p>
            <p>Creator: {playlist.playlistAuthor}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Grid item xs={12}>
          <Hidden xsDown>
          <h2>Playlist Name: {playlist.playlistName}</h2>
          </Hidden>
        </Grid>
        <Grid item xs={12} style={{overflowY: 'scroll'}}>
          <List>
            {songs.map((song, key) => {
              const labelId = `checkbox-list-secondary-label-${key}`;
              return (
                <Grid container key={key}>
                  <Grid item xs={11}>
                    <ListItem key={song.songId} button onClick={handleSongPlay(song.songId)}>
                      <ListItemAvatar>
                        <p>{key + 1}</p>
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={song.songName} />
                      <Hidden xsDown>
                        <ListItemText id={labelId} primary={song.songAuthor} />
                        <ListItemText id={labelId} primary={song.duration} />
                      </Hidden>
                    </ListItem>
                  </Grid>
                  <Grid style={{paddingTop: 8}} item xs={1}>
                    <Tooltip TransitionComponent={Fade} title='Favorite'>
                      <FavoriteBorderIcon onClick={handleFavorite}/>
                    </Tooltip>
                  </Grid>
                </Grid>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default PlaylistDetails;