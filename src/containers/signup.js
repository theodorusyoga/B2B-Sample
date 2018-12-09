import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container, Form, Button, Alert
} from 'reactstrap';
import { Formik } from 'formik';
import Textbox from '../components/textbox';
import Loader from '../components/loader';
import { formValidation } from '../helpers/validation';
import { onSignUpFormSubmit, resetMessages } from '../actions/login';

const initialData = {
  username: '',
  password: ''
};

class Signup extends Component {
  componentWillMount() {
    const { resetMessages } = this.props;
    resetMessages();
  }

  render() {
    const { onSignUpFormSubmit, warning } = this.props;
    return (
      <Container className="login-box">
        <div className="login-header text-center">
          <img className="mb-3" src="/img/stoqo.png" alt="Stoqo" width="75" />
          <h4 className="mb-4">Sign Up</h4>
        </div>
        {
          warning.map((val, i) => (
            <Alert key={i} color="danger">
              {val}
            </Alert>
          ))
        }
        <Formik
          initialValues={initialData}
          validate={formValidation}
          onSubmit={onSignUpFormSubmit}
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
                    Sign Up
                  </Button>
                </div>
                <div className="login-footer text-center">
                  Already have an account?&nbsp;
                  <Link href="/login" to="/login">Login</Link>
                </div>
              </Form>
            ))
        }
        </Formik>

      </Container>
    );
  }
}

Signup.propTypes = {
  onSignUpFormSubmit: PropTypes.func.isRequired,
  warning: PropTypes.array.isRequired,
  resetMessages: PropTypes.func.isRequired
};

const mapStateToProps = ({ login }) => ({
  warning: login.warning
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSignUpFormSubmit,
  resetMessages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
