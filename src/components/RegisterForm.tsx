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

const schema = yup.object({
	email: yup
		.string()
		.email()
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
}

const handleLogin = async (): Promise<void> => {
	console.log("YES");
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

const RegisterForm: React.FC<RegisterProps> = ({ ...props }) => {
  const classes = useStyles();
  
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
              email: props.email || '',
              password: props.password || '',
              confirmPassword: props.confirmPassword || '',
            }}
            onSubmit={async (data: RegisterProps): Promise<void> => {
              handleLogin();
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
                      <Field
                      label="confirmPassword"
                      name="confirmPassword"
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
  