import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import TextFormField from './FormFields/TextFormField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { History, LocationState } from 'history';
import axios from 'axios';

const schema = yup.object({
	email: yup
		.string()
		.email()
    .required(),
  firstName: yup
  .string()
  .required(),
  lastName: yup
  .string()
  .required(),
	password: yup
		.string()
    .required(),
  confirmPassword: yup
		.string()
    .required()
    .when('password', {
      is: (val) => (val && val.length),
      then: yup.string().oneOf(
        [yup.ref('password')],
        'Password confirmation does not match.',
      ),
    }),
});

interface RegisterProps {
	email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
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

const RegisterForm: React.FC<RegisterProps> = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const handleRegister = async (data: RegisterProps,
    history: History<LocationState>): Promise<void> => {
  
    // console.log(data);
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    }

    // const formData = new FormData();



    // formData.append('email', data.email!);
    // formData.append('password', data.password!);
    // formData.append('firstName', data.firstName!);
    // formData.append('lastName', data.lastName!);

    const registerData = {
      'email': data.email!,
      'password': data.password!,
      'firstName': data.firstName!,
      'lastName': data.lastName!,
    }

    // const response = await axios.post('https://brain-beats-server-docker.azurewebsites.net/api/user/create_user', registerData, config);
    axios.post('https://brain-beats-server-docker.azurewebsites.net/api/user/create_user', registerData, config)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err)
    });

    // console.log(response);

    // if response is successful
    // setIsSuccessful(true);
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
            <h1>Register</h1>
            <Formik
            validationSchema = {schema}
            initialValues={{
              email: props.email || 'Your email',
              password: props.password || 'Your password',
              confirmPassword: props.confirmPassword || 'Your password',
              firstName: props.firstName || 'Your first name',
              lastName: props.lastName || 'Your last name'
            }}
            onSubmit={async (data: RegisterProps): Promise<void> => {
              handleRegister(data, history);
            }}
            >
            {(): React.ReactElement => (
              <Form className={classes.form}>
                <Card className={classes.container} >
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
                      <Field
                      label="Confirm Password"
                      name="confirmPassword"
                      component={TextFormField}
                      type="password"
                      />
                    </div>
                    <div>
                      <Field
                      label="First Name"
                      name="firstName"
                      component={TextFormField}
                      />
                    </div>
                    <div>
                      <Field
                      label="Last Name"
                      name="lastName"
                      component={TextFormField}
                      />
                    </div>
                    {isSuccessful ? <>You have successfully created an account with us.</> : <></>}
                    <div>
                      <Button 
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color="primary"
                      >
                        Register
                      </Button>
                    </div>
                    <Link href="login" variant="body2">
                      Already have an account with us?
                    </Link>
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
  
export default RegisterForm;