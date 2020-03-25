import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  sidebar: {
    height: '100%',
    color: 'white',
    backgroundColor: '#1a1919',
  },
  userStatus: {
    textAlign: 'right'
  },
  header: {
    paddingTop: 20,
    textAlign: 'center'
  }, 
  picture: {
    width: 120,
    height: 120,
    borderRadius: '50%'
  },
  stat: {
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 150
  },
  playArea: {
    textAlign: 'center',
    bottom: 0,
    paddingBottom: 20,
  },
  beatPictureContainer: {
    width: 200,
    borderColor: 'red',
  }
}));

const SideBar: React.FC = () => {
  const classes = useStyles();
  
  return(
    <div className={classes.sidebar}>
      <div className={classes.userStatus}>
        Log out
        <span> Put icon Here</span>
      </div>
      <div className={classes.header}>
        <img alt='' className={classes.picture} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg"></img>
        <div>Your name here</div>
      </div>

      <div className={classes.stat}>
        <div>
          Beats: 155
        </div>
        <div>
          Samples: 155
        </div>
        <div>
          Shares: 155
        </div>
      </div>

      <div className={classes.playArea}>
        <img alt='' className={classes.picture} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg"></img>
        <div>
          Beat Name Here
        </div>
        <div>
          Beat Name's Author
        </div>
        <span>Button</span>
        <span>Button</span>
        <span>Button</span>
      </div>
    </div>
  );
}

export default SideBar;