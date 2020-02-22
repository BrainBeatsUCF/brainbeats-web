import React from 'react';
import BackendContext from '../util/api/backendContext';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    CardActionArea,
    CardActions,
    CardMedia,
    Button
} from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  },
  card: {
    maxWidth: 345
  }
}))

interface Playlist {
  playlistId: string;
  playlistName: string;
  playlistImage: string;
  ownerId: string;
  songList: string[];
  isPrivate: boolean;
}

const LibraryPage: React.FC = () => {
  const classes = useStyles();
  const api = React.useContext(BackendContext);

  const [playlists, setPlaylists] = React.useState([] as Playlist[]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (loading) {
      api.getSavedPlaylists('', '')
      .then(async (playlistCollection) => {

        let playlistData = [] as Playlist[];

        playlistCollection.forEach(async (playlist) => {
          await api.demoGetPlaylist(playlist)
            .then((info) => {
              playlistData.push(info);
            });
        });

        setPlaylists(playlistData);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [api]);

  if (loading) return (<div>Loading...</div>);
  
  return(
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {playlists !== undefined ? playlists.map((elem: Playlist) => (
          <Grid item xs={12} sm={6} md={3} key={playlists.indexOf(elem)}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="240"
                  image={elem.playlistImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" align="left">
                    {elem.playlistName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" align="left">
                    {elem.playlistName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )) : <div>Loading...</div>}
      </Grid>
    </div>
  );
}

export default LibraryPage;