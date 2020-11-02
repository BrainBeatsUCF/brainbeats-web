import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Button from '@material-ui/core/Button';
import { History, LocationState } from 'history';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import TextFormField from './FormFields/TextFormField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import axios from 'axios';

// Todo: Add loading icon when click login
//       Show error if account is incorrect

const schema = yup.object({
	email: yup
		.string()
		.email()
		.required(),
	password: yup
		.string()
		.required(),
});

interface LoginProps {
	email?: string;
	password?: string;
}

const useStyles = makeStyles(theme => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
  },
  container: {
    backgroundColor: 'black'
  }
}));

const LoginForm: React.FC<LoginProps> = ({ ...props }) => {
	const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState(false);
  const url = 'https://brain-beats-server-docker.azurewebsites.net';

  const handleLogin = async (
    // Todo: handle the login logic
    data: LoginProps,
    history: History<LocationState>): Promise<void> => {
      setLoading(true);
      setWarningMessage(false);
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      }

      const loginData = {
        'email': data.email!,
        'password': data.password!,
      }

      console.log(loginData);

      axios.post(url + '/api/user/login_user', loginData, config)
      .then((res) => {
        if (res.data.error === 'access_denied') {
          console.log('access denied');
          // handle wrong account
        } else {
          console.log(res);
          console.log(res.data.access_token);
          localStorage.setItem('accessToken', res.data.access_token);
          localStorage.setItem('userEmail', loginData.email);
          localStorage.setItem('idToken', res.data.id_token);
          
          history.push('/');
        }

        setLoading(false);
      })
      .catch((err) => {
        // Todo: handle 500 error
        let errObj = JSON.parse(JSON.stringify(err));
        if (errObj.message === 'Request failed with status code 401') {
          setWarningMessage(true);
        }
        setLoading(false);
      });
  };

	return (
	  <>
    <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Container component="main" maxWidth="xs">
          <div className = {classes.paper}>
            <h1>Login</h1>
            <Formik
            validationSchema = {schema}
            initialValues={{
              email: props.email || 'Your email',
              password: props.password || 'Your password',
            }}
            onSubmit={async (data: LoginProps): Promise<void> => {
              handleLogin(data, history);
            }}
            >
            {(): React.ReactElement => (
              <Form autoComplete="off" className={classes.form}>
                <Card className={classes.container}>
                  <CardContent>
                    <div>
                      <Field
                      label="Email"
                      name="email"
                      component={TextFormField}
                      type="email"
                      />
                    </div>
                    <div>
                      <Field
                      label="Password"
                      name="password"
                      component={TextFormField}
                      type="password"
                      />
                    </div>
                    {loading ? <p style={{color: 'white'}}>Loading... </p> : ""}
                    {warningMessage ? <p style={{color: 'red'}}>Your email or password is incorrect.</p> : ""}
                    <div>
                      <Button 
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color="primary"
                      >
                        Login
                      </Button>
                    </div>
                    {/* <div>
                      <Link href="#" variant="body2">
                        Find my account
                      </Link>
                    </div> */}
                    <div>
                      <Link onClick={(e: any) => {
                        e.preventDefault();
                        console.log('testing');
                        window.open('https://ucfbrainbeats.b2clogin.com/ucfbrainbeats.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signup&client_id=037bbefc-958e-489d-ba61-8c0823284010&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fbrain-beats-server-docker.azurewebsites.net%2F.auth%2Flogin%2Faad%2Fcallback&scope=openid&response_type=id_token&prompt=login');
                      }} href="" variant="body2">
                        {"Create Account"}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Form>
            )}
            </Formik>
          </div>
        </Container>
        <br></br>
      </Grid>
	  </>
	);
};
  
export default LoginForm;