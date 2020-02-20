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

import { BackendContext } from '../util/api';
import Api from '../util/api';

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

const handleLogin = async (
	data: LoginProps,
	history: History<LocationState>): Promise<void> => {
	try {
	  history.replace('/');
	} catch (e) {
	  alert(e.message);
	}
};

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
}));

const LoginForm: React.FC<LoginProps> = ({ ...props }) => {
	const classes = useStyles();
  const history = useHistory();

  const api = React.useContext(BackendContext);
  // api.callGetEndpoint('weatherforecast', '').then((response) => console.log(response.data[0]));
  console.log(api.getSavedPlaylists('nice', 'nice'));

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
              email: props.email || '',
              password: props.password || '',
            }}
            onSubmit={async (data: LoginProps): Promise<void> => {
              handleLogin(data, history);
            }}
            >
            {(): React.ReactElement => (
              <Form className={classes.form}>
                <Card>
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
                    <Link href="#" variant="body2">
                      Find my account
                    </Link>
                  </CardContent>
                </Card>
              </Form>
            )}
            </Formik>
          </div>
        </Container>
        <br></br>
        <Container  maxWidth="xs">
          <Link href="#" variant="body2">
            {"Create Account"}
          </Link>          
        </Container>
      </Grid>
	  </>
	);
};
  
export default LoginForm;
  