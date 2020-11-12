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
    height: '210px',
    overflowY: 'hidden',
    overflowX: 'scroll',
    marginLeft: '20px',
  },
  card: {
    borderRadius: '10px',
    display: 'inline-block',
    textAlign: 'center',
    margin: '20px',
    position: 'relative',
    minWidth: '150px',
    minHeight: '150px',
  },
  samplePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(53, 53, 53, 0.249)',
      border: 'solid 0.8px',
      transition: '0.2s',
    }
  },
  sampleTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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