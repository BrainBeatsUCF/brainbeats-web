import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  componentContainer: {
    color: 'white',
  },
  header: {
    alignItems: 'left',
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
    borderRadius: '10px',
    display: 'inline-block',
    textAlign: 'center',
    margin: '20px',
    position: 'relative',
    cursor: 'pointer',
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
  cardContent: {
    width: '100%',
    height: '100%',
  },
  songType: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: '50%',
    fontSize: '13px'
  },
  beatContainer: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    bottom: 5
  },
  sampleInstrument: {
    borderRadius: '5px',
    padding: '2px',
    backgroundColor: 'grey',
    margin: '5px',
    opacity: 0.7,
    fontSize: '10px'
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
  }
}));

export {useStyles};