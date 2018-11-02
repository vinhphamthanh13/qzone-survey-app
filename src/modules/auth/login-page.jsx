import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import _ from 'lodash';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import loginPageStyle from 'assets/jss/material-dashboard-pro-react/modules/loginPageStyle';
import fontAwesomeIcon from 'assets/jss/material-dashboard-pro-react/layouts/font-awesome-icon';
import { loginUser, toggleLoading, forceResetPasswordStatus } from 'services/api/user';
import { classesType, historyType, locationType } from 'types/global';
import VerificationPage from './verification-page';
import ResetPassword from './reset-password';
import validateEmail from '../../utils/validateEmail';
import { eUserType } from '../../constants';

class LoginPage extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    history: historyType.isRequired,
    forceResetPasswordStatus: PropTypes.func.isRequired,
    location: locationType.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cardAnimation: 'cardHidden',
      email: '',
      emailState: '',
      password: '',
      passwordState: '',
      openVerificationModal: false,
      disabled: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimation: '' });
    }, 200);
  }

  login = () => {
    const { emailState, passwordState } = this.state;

    if (emailState === 'success' && passwordState === 'success') {
      const {
        toggleLoading: toggleLoadingAction, loginUser: loginUserAction,
        history, forceResetPasswordStatus: forceResetPasswordStatusAction,
        location,
      } = this.props;
      toggleLoadingAction();
      this.setState({ disabled: true }, () => {
        const { email, password } = this.state;
        loginUserAction({ email, password }, (response) => {
          if (response) {
            const { data: { challengeNameType, userType } } = response;
            toggleLoadingAction();
            if (challengeNameType && challengeNameType === eUserType.temporary
              && userType === eUserType.assessor) {
              forceResetPasswordStatusAction(true);
            } else {
              forceResetPasswordStatusAction(false);
            }

            if (response.status === 200) {
              history.push((location.state && location.state.from) || '/');
            } else {
              const newState = { disabled: false };
              if (response.data.message === 'User is not confirmed.') {
                newState.openVerificationModal = true;
              }

              Alert.error(
                ['User is not confirmed.', 'User does not exist.', 'Incorrect username or password.']
                  .includes(response.data.message) ? response.data.message : 'Cannot connect to server',
              );

              this.setState(newState);
            }
          }
        });
      });
    }
  };

  loginClick = () => {
    const newState = {};
    const { emailState, passwordState } = this.state;

    if (emailState === '') {
      newState.emailState = 'error';
    }
    if (passwordState === '') {
      newState.passwordState = 'error';
    }
    this.setState(newState, this.login);
  };

  change = (event, stateName) => {
    const { value } = event.target;
    switch (stateName) {
      case 'email':
        this.setState({
          [stateName]: value,
          [`${stateName}State`]: validateEmail(value) ? 'success' : 'error',
        });
        return;
      case 'password':
        this.setState({
          [stateName]: value,
          [`${stateName}State`]: _.isEmpty(value) ? 'error' : 'success',
        });
        break;
      default: {
        break;
      }
    }
  };

  render() {
    const { classes, history } = this.props;
    const {
      cardAnimation, emailState, email, openVerificationModal,
      disabled, passwordState,
    } = this.state;

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center" className={classes.loginPanel}>
            <GridItem xs={12} sm={6} md={5}>
              <form>
                <Card login className={classes[cardAnimation]}>
                  <CardHeader className={classes.headerWrapper}>
                    <div className={classNames(classes.textCenter, classes.headerPanel)}>
                      <h3 className={classes.contrastText}>Log in</h3>
                      <div className={classes.iconsBar}>
                        <div>
                          <Icon
                            className={classNames(fontAwesomeIcon.twitter, classes.socialIcon)}
                          />
                        </div>
                        <div>
                          <Icon
                            className={classNames(fontAwesomeIcon.facebook, classes.socialIcon)}
                          />
                        </div>
                        <div>
                          <Icon
                            className={classNames(fontAwesomeIcon.googlep, classes.socialIcon)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      success={emailState === 'success'}
                      error={emailState === 'error'}
                      id="email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onChange: event => this.change(event, 'email'),
                        type: 'email',
                      }}
                      iconFaName={classNames(fontAwesomeIcon.email, classes.inputIcon)}
                    />
                    <CustomInput
                      labelText="Password"
                      success={passwordState === 'success'}
                      error={passwordState === 'error'}
                      id="password"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onChange: event => this.change(event, 'password'),
                        type: 'password',
                      }}
                      iconFaName={classNames(fontAwesomeIcon.password, classes.inputIcon)}
                    />
                    <ResetPassword classes={classes} />
                    <VerificationPage
                      open={openVerificationModal}
                      email={email}
                      history={history}
                      page="login"
                      actionAfterSubmit={this.login}
                    />
                  </CardBody>
                  <CardFooter className={classes.footerWrapper}>
                    <Button
                      fullWidth
                      color="rose"
                      disabled={disabled}
                      onClick={this.loginClick}
                      className={classes.loginButtonLabel}
                    >
                      let&#39;s go
                    </Button>
                  </CardFooter>
                  <div>
                    <Link to="/register" className={classes.alertLink}>
                      <h5 className={classNames(classes.noMarginTop, classes.textCenter)}>
                        Register
                      </h5>
                    </Link>
                  </div>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(loginPageStyle),
  connect(null, { loginUser, toggleLoading, forceResetPasswordStatus }),
)(LoginPage);
