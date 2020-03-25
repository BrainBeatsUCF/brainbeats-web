import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Playlists from '../components/Playlists';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const PlaylistView: React.FC = () => {
  const classes = useStyles();
  return (
    <Playlists />
  );
};
  
export default PlaylistView;