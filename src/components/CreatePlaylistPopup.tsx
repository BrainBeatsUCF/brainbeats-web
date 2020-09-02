import React, { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { TextField } from '@material-ui/core';

interface CreatePlaylistPopupProps {
  closeCreatePlaylistPopup: any
}

// Todo: implement outside clicking to remove this pop up

const useStyles = makeStyles(() => ({
  container: {
    color: 'black',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  inner: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '25%',
    bottom: '25%',
    margin: 'auto',
    borderRadius: '20px',
    backgroundColor: '#787878'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const CreatePlaylistPopup: React.FC<CreatePlaylistPopupProps> = ({...props}) => {
  const classes = useStyles();
  const [title, setTitle] = useState("My playlist");
  const [type, setType] = useState("Sad");

  const onChangeTitle = (e:any) => {
    setTitle(e.target.value);
  }

  const onChangeType = (e:any) => {
    setType(e.target.value);
  }

  const createButton = () => {
    console.log('create');


    // Todo: await to finish creating and then remove pop up
    props.closeCreatePlaylistPopup();
  }

  return (
    <div className={classes.container}>  
      <div className={classes.inner}>  
        <h1>Create your playlist</h1>
        <form className={classes.form}>
          <TextField
            id="title"
            label="Title:"
            value={title}
            onChange={onChangeTitle}
          />
          <TextField
            id="type"
            label="Type"
            value={type}
            onChange={onChangeType}
          />
          <button onClick={props.closeCreatePlaylistPopup}>Cancel</button>  
          <button onClick={createButton}>Create</button>  
        </form>  
        
      </div>  
    </div>
  );
};

export default CreatePlaylistPopup;
