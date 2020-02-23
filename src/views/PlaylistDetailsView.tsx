import LibraryNavBar from '../components/LibraryNavBar';
import DashboardNavBar from '../components/DashboardNavBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlaylistDetails from '../components/PlaylistDetails';

interface Props {
  match: any
}

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

const PlaylistDetailsView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { match: { params } } = props;

  return (
    <div className={classes.root}>
		<CssBaseline />
      <DashboardNavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <LibraryNavBar />
        <Container maxWidth="lg" className={classes.container}>
          <PlaylistDetails playlistId={params.playlistId} />
        </Container>
      </main>
    </div>
  );
};
  
export default PlaylistDetailsView;