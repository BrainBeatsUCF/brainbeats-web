import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import { TextField, Container, Button } from '@material-ui/core'; 
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useHistory, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: '#262626',
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    fixedLeftTop: {
      position: 'fixed',
      top: 0,
      zIndex: 5,
      width: '100%',
      paddingTop: '10px',
      paddingLeft: '20px',
    },
    mainContent: {
      borderColor: 'white',
      borderStyle: 'groove',
      backgroundColor: 'stalegrey'
    },
    textField: {
      margin: 20,
      display: 'flex',
      justifyContent: 'center',
      color: 'white'
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
    submitButtonContainer: {
      margin: 20,
      padding: 0,
    },
    submitButton: {
      backgroundColor: 'grey',
      "&:hover": {
        background: 'white'
      }
    }
  }),
);

const HomeView: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('hn9581@gmail.com');
  const [firstName, setFirstname] = useState('Hung');
  const [lastName, setLastname] = useState('Nguyen');
  const [imageUrl, setImageUrl] = useState('');
  const [imageRaw, setImageRaw] = useState('');
  let history = useHistory();
  let userEmail = localStorage.getItem('userEmail');
  const url = 'https://brain-beats-server-docker.azurewebsites.net';
  const [userPicture, setUserPicture] = useState('');

  // Handle un-logged in user or expired token
  let jwt = localStorage.getItem('accessToken');
  let expired: boolean = false;

  if (jwt != null) {
    let jwtDecoded: any = jwt_decode(jwt);

    if (Date.now() / 1000 >= jwtDecoded.exp) {
      expired = true;
    }
  }

  if (userEmail == null) {
    history.push('/login');
  }

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const onChangeFirstname = (e: any) => {
    setFirstname(e.target.value);
  }

  const onChangeLastname = (e: any) => {
    setLastname(e.target.value);
  }

  const handleImageOnchange = (e: any) => {
    console.log('testing');
    // console.log(e.target.files[0]);

    //raw file: e.target.files[0]
    console.log(e.target.files[0]);
    if (e.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImageRaw(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const formData = new FormData();

    
    formData.append('email', userEmail!);
    formData.append('image', imageRaw);
    // formData.append('lastname', lastName);
    // formData.append('firstname', firstName);
    console.log(formData.get('email'));
    console.log(formData.get('image'));

    axios.post(url + '/api/user/upload_profile_picture', formData,{
      headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  const loadUser = async () => {
    const userResponse = await axios.post(url + '/api/user/read_user', {
      email: userEmail,
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    console.log(userResponse.data[0].properties['image'][0]['value']);
    setUserPicture(userResponse.data[0].properties['image'][0]['value']);
    setImageUrl(userResponse.data[0].properties['image'][0]['value']);
  }

  // Read user profile picture
  useEffect(() => {
    const getUserData = async () => {
      await loadUser();
    };
    getUserData();
  }, []);

  return (
    <>
      {expired ? <Redirect to='login' /> :
        <div className={classes.root}>
          <Grid container>
            <Grid className={classes.fixedLeftTop} item xs={12}>
              <NavBar />
            </Grid>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{
                marginTop: 60
              }}
            >
              <Container className={classes.mainContent} component="main" maxWidth="xs">
                <div className = {classes.paper}>
                  <form>
                    <div className={classes.textField}>
                      <label htmlFor='upload-button'>
                        <div className={classes.profilePictureContainer}>
                          <img className={classes.profilePicture} src={userPicture} alt=""></img>
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
                    </div>
                    <TextField
                      disabled
                      className={classes.textField}
                      id="email"
                      label="Email:"
                      value={email}
                      onChange={onChangeEmail}
                    />
                    <TextField
                    disabled
                      className={classes.textField}
                      id="firstName"
                      label="First Name:"
                      value={firstName}
                      onChange={onChangeFirstname}
                    />
                    <TextField
                    disabled
                      className={classes.textField}
                      id="lastName"
                      label="Last Name:"
                      value={lastName}
                      onChange={onChangeLastname}
                    />
                    <div className={classes.submitButtonContainer}>
                      <Button className={classes.submitButton} onClick={handleSubmit}>Submit</Button>
                    </div>
                  </form>
                </div>
              </Container>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
};
    
export default HomeView;