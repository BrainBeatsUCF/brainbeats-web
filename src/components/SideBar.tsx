import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Todo: why cannot import
import { MusicContext } from '../contexts';

const useStyles = makeStyles(() => ({
  sidebarColumn: {
    height: 'calc(100% - 60px)',
    color: 'white',
    backgroundColor: '#1a1919',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  fixedLeftBottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1a1919',
  },
  sideBarRow: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userStatus: {
    textAlign: 'right',
    color: 'white'
  },
  header: {
    textAlign: 'center',
  }, 
  picture: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    '@media (max-width: 450px)': {
      width: 50,
      height: 50
    }
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statElement: {
    display: 'flex',
    flexDirection: 'row',
    width: 250,
    height: 38,
    padding: 5,
    '@media (max-width: 960px)': {
      width: '100%'
    }
  },
  statValues: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    fontSize: 14,
    '@media (max-width: 960px)': {
      width: 120,
      fontSize: '2vw'
    },
  },
  statPicture: {
    paddingRight: 10,
    height: 38,
    width: 38
  },
  audioArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (min-width: 961px)': {
      paddingBottom: 50
    }
  },
  audioPictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: 130,
    border: 'solid rgb(208, 53, 30) 1px',
    borderRadius: '130px',
    '@media (max-width: 450px)': {
      width: 60,
      height: 60
    }
  },
  playButtonArea: {
    display: 'flex',
    flexDirection: 'row'
  },
  audioPlayButton: {
    padding: 5,
    cursor: 'pointer'
  },
}));

const SideBar: React.FC = () => {
  const classes = useStyles();
  const isOverMdBreakPoint = useMediaQuery('(min-width:960px)');

  const [isPlaying, setIsPlay] = useState(false);

  // musicContext
  const musicProvider = React.useContext(MusicContext);

  let audioPlayButtons, sidebar, audioInfo, userStat;

  const togglePlayAndPause = (event: React.MouseEvent<HTMLImageElement>) => {
    setIsPlay(!isPlaying);
  };

  // Todo: if musicContext.getStatus() is true
  if (isPlaying) {
    audioPlayButtons = (
      <>
        <img className={classes.audioPlayButton} alt='Back Button' src='images/backButton.png'></img>
        <img className={classes.audioPlayButton} alt='Pause Button' src='images/pauseButton.png' onClick={togglePlayAndPause}></img>
        <img className={classes.audioPlayButton} alt='Forward Button' src='images/forwardButton.png'></img>
      </>
    );
  } else {
    audioPlayButtons = (
      <>
        <img className={classes.audioPlayButton} alt='Back Button' src='images/backButton.png'></img>
        <img className={classes.audioPlayButton} alt='Play Button' src='images/playButton.png' onClick={togglePlayAndPause}></img>
        <img className={classes.audioPlayButton} alt='Forward Button' src='images/forwardButton.png'></img>
      </>
    )
  }

  audioInfo = (
    <>
      <div>
        Beat Name Here
      </div>
      <div>
        Beat Name's Author
      </div>
    </>
  );

  userStat = (
    <>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src='images/beatButton.png'></img>
        <div className={classes.statValues}>
          <h4>Beats</h4>
          <h4>155</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src='images/sampleButton.png'></img>
        <div className={classes.statValues}>
          <h4>Samples</h4>
          <h4>155</h4>
        </div>
      </div>
      <div className={classes.statElement}>
        <img className={classes.statPicture} alt='Beat Icon' src='images/shareButton.png'></img>
        <div className={classes.statValues}>
          <h4>Shares</h4>
          <h4>155</h4>
        </div>
      </div>
    </>
  )

  if (isOverMdBreakPoint) {
    sidebar = (
      <div className={classes.sidebarColumn}>
        <div className={classes.userInfo}>
          <div className={classes.userStatus}>
            Log out
            <img alt='' src='images/LogoutImage.png'></img>
          </div>
          <div className={classes.header}>
            <img alt='' className={classes.picture} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg"></img>
            <div>Your name here</div>
          </div>

          <div className={classes.statContainer}>
            {userStat}
          </div>
        </div>
        

        <div className={classes.audioArea}>
          <div className={classes.audioPictureContainer}>
            <img alt='' className={classes.picture} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg"></img>
          </div>
          
          <div>
            {audioInfo}
          </div>
          
          <div className={classes.playButtonArea}>
            {audioPlayButtons}
          </div>
        </div>
      </div>
    )
  } else {
    sidebar = (
      <div className={classes.fixedLeftBottom}>
        <div>
          <div className={classes.userStatus}>
            Log out
            <img alt='' src='images/LogoutImage.png'></img>
          </div>
        </div>
        
        <div className={classes.sideBarRow}>
          <div className={classes.statContainer}>
            {userStat}
          </div>
          
          <div className={classes.audioArea}>
            <div className={classes.audioPictureContainer}>
              <img alt='' className={classes.picture} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg"></img>
            </div>
            
            <div>
              {audioInfo}
            </div>
            
            <div className={classes.playButtonArea}>
              {audioPlayButtons}
            </div>
          </div>
        
          <div className={classes.header}>
              <img alt='' className={classes.picture} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/440px-African_Bush_Elephant.jpg"></img>
              <div>Your name here</div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <>
    {sidebar}
    </>
  );
}

export default SideBar;