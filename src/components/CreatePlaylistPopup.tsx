import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from "@material-ui/styles";
import { TextField, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import axios from 'axios';
import clsx from 'clsx';

interface CreatePlaylistPopupProps {
  closeCreatePlaylistPopup: any
}

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
    padding: '10px',
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '15%',
    margin: 'auto',
    borderRadius: '20px',
    backgroundColor: '#787878'
  },
  header: {
    marginTop: '10px',
    marginBottom: '10px',
    color: '#fff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  profilePictureContainer: {
    height: 100,
    width: 100,
    position: 'relative',
    display: 'inline-block',
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: '50%',
  },
  edit: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  formElement: {
    paddingTop: '10px',
    paddingBottom: '10px',
    color: '#fff'
  },
  button: {
    borderRadius: '10px',
    color: 'black'
  }
}));

const privateOptions = [
  {
    userPrivateOption: 'False'
  },
  {
    userPrivateOption: 'True'
  }
];

const CreatePlaylistPopup: React.FC<CreatePlaylistPopupProps> = ({...props}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [imageRaw, setImageRaw] = useState('');
  const [imageUrlEmpty, setImageUrlEmpty] = useState(true);
  const url = "https://brain-beats-server-docker.azurewebsites.net/";
  const [isUploading, setIsUploading] = useState(false);
  const [isFieldMissing, setIsFieldMissing] = useState(false);

  const handleImageOnchange = (e: any) => {
    setImageUrlEmpty(false);
    if (e.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImageRaw(e.target.files[0]);
    }
  }

  const createButton = async (e: any) => {
    e.preventDefault();
    if (name === '' || imageRaw === '' || isPrivate === '') {
      setIsFieldMissing(true);
      return;
    }

    const formData = new FormData();
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }

    formData.append('email', localStorage.getItem('userEmail')!);
    formData.append('name', name);
    formData.append('image', imageRaw);
    formData.append('isPrivate', isPrivate);

    setIsUploading(true);

    axios.post(url + 'api/playlist/create_playlist', formData, config)
    .then((res) => {
      setIsUploading(false);
      props.closeCreatePlaylistPopup();
    }).catch((err) => {
      // console.log(err);
    }); 
  }

  return (
    <div className={classes.container}>  
      <div className={classes.inner}>  
        <h1 className={classes.header}>Create your playlist</h1>
        <form className={classes.form}>
          <TextField className={classes.formElement}
            id="name"
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Autocomplete className={classes.formElement}
            id="user-private-option"
            onChange={(_, value: any) => {
              setIsPrivate(value['userPrivateOption']);
            }}
            options={privateOptions}
            getOptionLabel={(option: any) => option.userPrivateOption}
            renderInput={(params: any) => (
              <TextField {...params} label="Private" variant="outlined" fullWidth />
            )}
          />
          <label className={classes.formElement} htmlFor='upload-button'>
            <div className={classes.profilePictureContainer}>
              <input
                type="file"
                id="upload-button"
                accept="image/*"
                onChange={handleImageOnchange}
              >
              </input>
              {!imageUrlEmpty ? <>
                <img className={classes.profilePicture} src={imageUrl} alt=""></img> 
                <div className={classes.edit}>
                  <CameraAltIcon style={{fontSize: 25}}/>
                </div>
                </>
                : ""
              }
              {isUploading ? <CircularProgress /> : ""} 
            </div>
          </label>
          {isFieldMissing ? <div style={{color: 'red', display: 'block', width: '100%', marginTop: '5px', marginBottom: '5px'}}>Please complete all the fields</div> : ""}
          <button className={clsx(classes.formElement, classes.button)} onClick={props.closeCreatePlaylistPopup}>Cancel</button>  
          <button className={clsx(classes.formElement, classes.button)} onClick={createButton}>Create</button>  
        </form>  
        
      </div>  
    </div>
  );
};

export default CreatePlaylistPopup;
