import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardNavBar from '../components/DashboardNavBar';

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

const HomeView: React.FC = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
          <CssBaseline />
        <DashboardNavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            Home :)
          </Container>
        </main>
      </div>
    );
  };
    
  export default HomeView;