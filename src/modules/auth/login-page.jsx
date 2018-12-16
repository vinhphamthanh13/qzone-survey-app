import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';
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
import { Email, Lock } from '@material-ui/icons';
import { loginUser } from 'services/api/user';
import { classesType, historyType, locationType } from 'types/global';
import SocialLogin from 'modules/auth/social-login';
import VerificationPage from './verification-page';
import ResetPassword from './reset-password';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import { userStatus, AUTH_PAGE } from '../../constants';

class LoginPage extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    loginUser: PropTypes.func.isRequired,
    history: historyType.isRequired,
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
        loginUser: loginUserAction,
        history,
        location,
      } = this.props;
      this.setState({ disabled: true }, () => {
        const { email, password } = this.state;
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
                  ? <AlertMessage>{response.data.message}</AlertMessage>
                  : <AlertMessage>Cannot connect to server</AlertMessage>,
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
          disabled: false,
        });
        return;
      case 'password':
        this.setState({
          [stateName]: value,
          [`${stateName}State`]: validatePassword(value) ? 'success' : 'error',
          disabled: false,
        });
        break;
      default: {
        break;
      }
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.loginClick();
  };

  render() {
    const { classes, history } = this.props;
    const {
      cardAnimation, emailState, email, openVerificationModal,
      disabled, passwordState,
    } = this.state;
    const adornmentEmailClass = `inputAdornmentIcon${emailState}`;
    const adornmentPasswordClass = `inputAdornmentIcon${passwordState}`;

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center" className={classes.loginPanel}>
            <GridItem xs={12} sm={6} md={5}>
              <form onSubmit={this.handleSubmit}>
                <Card login className={classes[cardAnimation]}>
                  <CardHeader className={classes.headerWrapper}>
                    <div className={classNames(classes.textCenter, classes.headerPanel)}>
                      <h3 className={classes.contrastText}>Log in</h3>
                      <div className={classes.iconsBar}>
                        <SocialLogin />
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes[adornmentEmailClass]} />
                          </InputAdornment>
                        ),
                      }}
                      iconAppend={false}
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes[adornmentPasswordClass]} />
                          </InputAdornment>
                        ),
                      }}
                      iconAppend={false}
                    />
                    <ResetPassword classes={classes} />
                    <VerificationPage
                      open={openVerificationModal}
                      email={email}
                      history={history}
                      page={AUTH_PAGE.LOGIN}
                      actionAfterSubmit={this.login}
                    />
                  </CardBody>
                  <CardFooter className={classes.footerWrapper}>
                    <Button
                      fullWidth
                      color="rose"
                      disabled={disabled}
                      className={classes.loginButtonLabel}
                      type="submit"
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
  connect(null, {
    loginUser,
  }),
)(LoginPage);
