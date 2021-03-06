import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container, Form, Button, Alert
} from 'reactstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Textbox from '../components/textbox';
import Loader from '../components/loader';
import { formValidation } from '../helpers/validation';
import { onLoginFormSubmit, resetMessages } from '../actions/login';

const initialData = {
  username: '',
  password: ''
};

class Login extends Component {
  componentWillMount() {
    const { resetMessages } = this.props;
    resetMessages();
  }

  render() {
    const { onLoginFormSubmit, warning, success } = this.props;
    return (
      <Container className="login-box">
        <div className="login-header text-center">
          <img className="mb-3" src="/img/stoqo.png" alt="Stoqo" width="75" />
          <h4 className="mb-4">Login with your account</h4>
        </div>
        {
          warning.map((val, i) => (
            <Alert key={i} color="danger">
              {val}
            </Alert>
          ))
        }
        {
          success !== '' && (
          <Alert color="success">
            {success}
          </Alert>
          )
        }
        <Formik
          initialValues={initialData}
          validate={formValidation}
          onSubmit={onLoginFormSubmit}
        >
          {
          ({
            values, errors, touched, handleChange, handleBlur,
            handleSubmit, isSubmitting
          }) => (isSubmitting ? (
            <Loader />
          )
            : (
              <Form className="login-form" onSubmit={handleSubmit}>
                <Textbox
                  label="Username"
                  id="username"
                  name="username"
                  value={values.username}
                  touched={touched.username}
                  error={errors && errors.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Textbox
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  touched={touched.password}
                  error={errors && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="form-group text-center">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="login-btn"
                  >
                    Login
                  </Button>
                </div>
                <div className="login-footer text-center">
                  Don&#39;t have an account?&nbsp;
                  <Link href="/sign-up" to="/sign-up">Sign up</Link>
                </div>
              </Form>
            ))
        }
        </Formik>

      </Container>
    );
  }
}

Login.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired,
  warning: PropTypes.array.isRequired,
  success: PropTypes.string.isRequired,
  resetMessages: PropTypes.func.isRequired
};

const mapStateToProps = ({ login }) => ({
  warning: login.warning,
  success: login.success
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoginFormSubmit,
  resetMessages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
