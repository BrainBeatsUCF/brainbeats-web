import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    paddingLeft: '20px',
    margin: 0,
  },
  scroll: {
    whiteSpace: 'nowrap',
    height: '193px',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
  card: {
    position: 'relative',
    display: 'inline-block',
    margin: '20px',
    minWidth: '250px',
    minHeight: '150px',
  },
  background: {
    backgroundRepeat: 'no-repeat',
    width: '250px',
    height: '150px',
    opacity: 0.4,
    borderRadius: '10px',
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 10,
    left: 5,
  },
  beatPicture: {
    width: '75px',
    height: '75px',
  },
  playButtonAndBeatInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    fontSize: '1.4em',
    marginRight: '10px',
  },
  formInput: {
    marginRight: '10px'
  },
  formElement: {
    borderRadius: '10px',
    backgroundColor: 'rgb(59, 55, 61)',
    fontSize: '0.8em',
    color: 'white'
  },
  topRightCorner: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  likeButton: {
    height: '30px',
    width: '30px',
    cursor: 'pointer',
  }
}));

export {useStyles};