import React, { Component } from 'react';
import { func, objectOf, any } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  // InputAdornment,
  Icon, TextField,
  Button,
} from '@material-ui/core';
// import { Email, Lock } from '@material-ui/icons';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from 'services/api/user';
import { historyType, locationType } from 'types/global';
import VerificationPage from './verification-page';
// import ResetPassword from './reset-password';
import { userStatus, AUTH_PAGE } from '../../constants';
import s from './LogIn.module.scss';

class Login extends Component {
  static propTypes = {
    values: objectOf(any).isRequired,
    handleChange: func.isRequired,
    handleBlur: func.isRequired,
    handleSubmit: func.isRequired,
    loginUser: func.isRequired,
    history: historyType.isRequired,
    location: locationType.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openVerificationModal: false,
      disabled: false,
    };
  }

  login = (email, password) => {
    const { loginUser: loginUserAction, history, location } = this.props;
    loginUserAction({ email, password }, (response) => {
      if (response) {
        const { data: { challengeNameType } } = response;
        if (response.status === 200) {
          if (challengeNameType && challengeNameType === userStatus.temporary) {
            history.push('/profile');
          } else {
            history.push((location.state && location.state.from) || '/');
          }
        } else {
          const newState = { disabled: false };
          if (response.data.message === 'User is not confirmed.') {
            newState.openVerificationModal = true;
          }

          Alert.error(
            ['User is not confirmed.', 'User does not exist.', 'Incorrect username or password.']
              .includes(response.data.message)
              // eslint-disable-next-line
              ? <AlertMessage>{response.data.message}</AlertMessage>
              : <AlertMessage>Cannot connect to server</AlertMessage>,
          );
          this.setState(newState);
        }
      }
    });
  };

  render() {
    const {
      history, values, handleChange, handleBlur, handleSubmit,
    } = this.props;
    const { openVerificationModal, disabled } = this.state;
    return (
      <div className={s.loginPage}>
        <div>
          <h3>Log in</h3>
          <div>
            <Icon><i className="fab fa-twitter" /></Icon>
            <Icon><i className="fab fa-facebook" /></Icon>
            <Icon><i className="fab fa-google" /></Icon>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              value={values.email}
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
          <VerificationPage
            open={openVerificationModal}
            email={values.email}
            history={history}
            page={AUTH_PAGE.LOGIN}
            actionAfterSubmit={this.login}
          />
          <Button
            fullWidth
            color="rose"
            disabled={disabled}
            type="submit"
          >
            let&#39;s go
          </Button>
        </div>
        <div>
          <Link to="/register">
            <h5>
              Register
            </h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default compose(
  withFormik({
    validationSchema: () => Yup.object().shape({
      email: Yup.email().required(),
      password: Yup.string().matches(/[A-Za-z]/).required(),
    }),
  }),
  connect(null, {
    loginUser,
  }),
)(Login);
