import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import { TextField, Container, Button } from '@material-ui/core'; 
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useHistory } from "react-router-dom";
let userEmail = localStorage.getItem('userEmail');

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
  const [imageUrl, setImageUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0AdkwPc3U4twT_LVngZb0XbcbTpJBqqBhZz-kKeTtdwVyS5FhE9DgW4MNrg&usqp=CAc');
  const [imageRaw, setImageRaw] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0AdkwPc3U4twT_LVngZb0XbcbTpJBqqBhZz-kKeTtdwVyS5FhE9DgW4MNrg&usqp=CAc');
  let history = useHistory();
  let userEmail = localStorage.getItem('userEmail');

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

    formData.append('picture', imageRaw);
    formData.append('lastname', lastName);
    formData.append('firstname', firstName);

    console.log(formData.get('lastname'));
    console.log(formData.get('picture'));

    // return await axios.post('', formData,{
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // });
  }

  if (userEmail == null) {
    history.push('/login');
  }

  return (
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
                </div>
                <TextField
                  className={classes.textField}
                  id="email"
                  label="Email:"
                  value={email}
                  onChange={onChangeEmail}
                />
                <TextField
                  className={classes.textField}
                  id="firstName"
                  label="First Name:"
                  value={firstName}
                  onChange={onChangeFirstname}
                />
                <TextField
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
  );
};
    
export default HomeView;