import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  fixedLeftBottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#28252b',
  },
  userInfo: {
    width: '100%',
    alignContent: 'center'
  },
  userStatus: {
    textAlign: 'right',
    color: 'white'
  },
  header: {
    textAlign: 'center',
  }, 
  picture: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    '@media (max-width: 450px)': {
      width: '50px',
      height: '50px'
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
    justifyContent: 'space-around',
    height: '38px',
    margin: 'auto',
    width: '50%',
    textAlign: 'center',
    padding: '10px',
  },
  statValues: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: '14px',
    '@media (max-width: 960px)': {
      width: '120px',
      fontSize: '2vw'
    },
  },
  statPicture: {
    paddingRight: '10px',
    height: '38px',
    width: '38px'
  },
  audioArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  audioPictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    width: '130px',
    border: 'solid rgb(208, 53, 30) 1px',
    borderRadius: '130px',
    '@media (max-width: 450px)': {
      width: '60px',
      height: '60px'
    }
  },
  playButtonArea: {
    display: 'flex',
    flexDirection: 'row'
  },
  audioPlayButton: {
    padding: '5px',
    cursor: 'pointer'
  },
  sideBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#28252b',
    color: 'white',
    '@media (max-width: 959px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      minHeight: '60px'
    },
    '@media (min-width: 960px)': {
      height: '100%'
    } 
  },
  userPicture: {
    height: '120px',
    width: '120px',
    borderRadius: '50%',
    '@media (max-width: 959px)': {
      height: '60px',
      width: '60px'
    },
  },
  userPictureContainer: {
    textAlign: 'center',
    clear: 'both',
    '@media (max-width: 959px)': {
      position: 'absolute',
      left: 0,
      top: 0
    },
  },
  userStatContainer: {
    '@media (max-width: 959px)': {
      display: 'none'
    },
  },
  playlists: {
    color: 'red',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '150px',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  playlistTitle: {
    cursor: 'pointer',
    padding: '5px',
  },
  addPlaylistButton: {
    backgroundColor: '#D0351E',
    borderRadius: '5px',
  },
  logOut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100px',
    float: 'right',
    padding: '5px',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'rgb(208, 53, 30, 1)'
    },
    margin: '10px',
  }
}));

export {useStyles};