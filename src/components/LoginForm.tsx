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

// Todo: log user out after an hour after they log in because the access token is expired in one hour

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
  let userEmail = localStorage.getItem('userEmail');

  const handleLogin = async (
    // Todo: handle the login logic
    data: LoginProps,
    history: History<LocationState>): Promise<void> => {
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

      axios.post('https://brain-beats-server-docker.azurewebsites.net/api/user/login_user', loginData, config)
      .then((res) => {
        if (res.data.error === 'access_denied') {
          console.log('access denied');
          // handle wrong account
        } else {
          console.log(res);
          console.log(res.data.access_token);
          localStorage.setItem('accessToken', res.data.access_token);
          localStorage.setItem('userEmail', loginData.email);

          // not a good way, what if user log in, then quit brower, and go into home page, then this set time out is not executing
          // setTimeout(() => {
          //   localStorage.setItem('accessToken', 'expired');
          //   console.log('expired access token: ' + localStorage.getItem('accessToken'));
          //   console.log('hello world');
          //   history.push('/login');
          // }, 3000);
          history.push('/');
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
              <Form className={classes.form}>
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
                      <Link href="register" variant="body2">
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