import React, { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import axios from 'axios';

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
}));

const privateOptions = [
  {
    userPrivateOption: 'false'
  },
  {
    userPrivateOption: 'true'
  }
];

const CreatePlaylistPopup: React.FC<CreatePlaylistPopupProps> = ({...props}) => {
  const classes = useStyles();
  const [name, setName] = useState("My playlist");
  const [isPrivate, setIsPrivate] = useState("false");
  const [imageUrl, setImageUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0AdkwPc3U4twT_LVngZb0XbcbTpJBqqBhZz-kKeTtdwVyS5FhE9DgW4MNrg&usqp=CAc');
  const [imageRaw, setImageRaw] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0AdkwPc3U4twT_LVngZb0XbcbTpJBqqBhZz-kKeTtdwVyS5FhE9DgW4MNrg&usqp=CAc');
  const url = "https://brain-beats-server-docker.azurewebsites.net/";

  const handleImageOnchange = (e: any) => {
    //raw file: e.target.files[0]
    console.log(e.target.files[0]);
    if (e.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImageRaw(e.target.files[0]);
    }
  }

  const createButton = async (e: any) => {
    e.preventDefault();
    // Todo: await to finish creating and then remove pop up
    const formData = new FormData();
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }

    formData.append('email', localStorage.getItem('userEmail')!);
    formData.append('name', name);
    // formData.append('image', imageRaw);
    formData.append('image', "https://www.google.com/search?q=marsh+mallow+pic&sxsrf=ALeKk03iRCGQeCe25pZ5uSeS_pxL1899Fg:1601417792456&tbm=isch&source=iu&ictx=1&fir=wEBY1HaQPO7T6M%252Cchcf76kQ4Dsl0M%252C_&vet=1&usg=AI4_-kTQC1VcNh4xYVrQdI8a-OmOZEfUGQ&sa=X&ved=2ahUKEwi2wZ-Vso_sAhWOg-AKHfs1CrAQ9QF6BAgKEFY#imgrc=wEBY1HaQPO7T6M");
    formData.append('isPrivate', isPrivate);

    console.log(formData.get('email'));
    console.log(formData.get('name'));
    console.log(formData.get('image'));
    console.log(formData.get('isPrivate'));

    // call api with formData
    const response = await axios.post(url + 'api/playlist/create_playlist', formData, config); 

    console.log(response);

    props.closeCreatePlaylistPopup();
  }

  return (
    <div className={classes.container}>  
      <div className={classes.inner}>  
        <h1>Create your playlist</h1>
        <form className={classes.form}>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Autocomplete
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
          <label htmlFor='upload-button'>
            <div className={classes.profilePictureContainer}>
              <img className={classes.profilePicture} src={imageUrl} alt=""></img>
              <input
                type="file"
                id="upload-button"
                accept="image/*"
                onChange={handleImageOnchange}
                style={{display: 'none'}}
              >
              </input>
              <div className={classes.edit}>
                <CameraAltIcon style={{fontSize: 25}}/>
              </div>
            </div>
          </label>
          <button onClick={props.closeCreatePlaylistPopup}>Cancel</button>  
          <button onClick={createButton}>Create</button>  
        </form>  
        
      </div>  
    </div>
  );
};

export default CreatePlaylistPopup;
