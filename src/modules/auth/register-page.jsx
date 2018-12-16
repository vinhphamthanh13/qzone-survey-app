import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Checkbox, FormControlLabel, Button as MaterialButton } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';
import { Link } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import registerPageStyle from 'assets/jss/material-dashboard-pro-react/modules/registerPageStyle';
import { registerUser } from 'services/api/user';
import VerificationPage from 'modules/auth/verification-page';
import ReactLoader from 'components/Loader/react-loader';
import validatePassword from 'utils/validatePassword';
import validateEmail from 'utils/validateEmail';
import { classesType, historyType } from 'types/global';
import PasswordField from './password-field';
import { eUserType, eRegisterPage } from '../../constants';

class RegisterPage extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    history: historyType.isRequired,
    registerUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: 'cardHidden',
      firstname: undefined,
      lastname: undefined,
      firstnameState: '',
      lastnameState: '',
      email: undefined,
      password: undefined,
      confirmPwd: undefined,
      emailState: '',
      passwordState: '',
      confirmPwdState: '',
      registerTermAndCondition: false,
      eReceivedInfo: 'NO',
      eReceivedInfoState: null,
      registerTermAndConditionState: null,
      userType: eUserType.participant,
      openVerificationModal: false,
      code: '',
      loading: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimaton: '' });
    }, 200);
  }

  register = () => {
    const {
      firstnameState, lastnameState,
      emailState, passwordState, confirmPwdState, registerTermAndConditionState,
    } = this.state;

    if (firstnameState === 'success' && lastnameState === 'success'
      && emailState === 'success' && passwordState === 'success'
      && confirmPwdState === 'success' && registerTermAndConditionState === 'success') {
      this.setState({ loading: true }, () => {
        const { registerUser: registerUserAction } = this.props;
        registerUserAction(this.state, (response) => {
          const newState = { loading: false };

          if (response) {
            if (response.status === 201) {
              newState.openVerificationModal = true;
              Alert.success(<AlertMessage>Thank you for registering!</AlertMessage>);
            } else {
              Alert.error(<AlertMessage>{response.data.message}</AlertMessage>);
            }
          }

          this.setState(newState);
        });
      });
    }
  };

  registerClick = (event) => {
    event.preventDefault();
    const newState = {};
    const {
      firstname, lastname, email, password, confirmPwd, registerTermAndCondition,
    } = this.state;

    if (!firstname) {
      newState.firstnameState = 'error';
    }
    if (!lastname) {
      newState.lastnameState = 'error';
    }
    if (!email) {
      newState.emailState = 'error';
    }
    if (!password) {
      newState.passwordState = 'error';
    }
    if (!confirmPwd) {
      newState.confirmPwdState = 'error';
    }
    if (!registerTermAndCondition) {
      newState.registerTermAndConditionState = 'error';
    }

    this.setState(newState, this.register);
  };

  change = (event, stateName, type) => {
    const { value, checked, name } = event.target;

    switch (type) {
      case 'name':
        this.setState({
          [`${stateName}State`]: value.length > 0 ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      case 'email':
        this.setState({
          [`${stateName}State`]: validateEmail(value) ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      case 'password': {
        const newState = {
          [`${stateName}State`]: value.length >= 8
            && value.length <= 60
            && validatePassword(value) ? 'success' : 'error',
          [stateName]: value,
        };
        const { confirmPwd } = this.state;

        if (confirmPwd !== undefined) {
          newState.confirmPwdState = value !== '' && value === confirmPwd ? 'success' : 'error';
        }

        this.setState(newState);
        return;
      }
      case 'checkbox': {
        let boxState = checked;
        if (name && name === eRegisterPage.eReceivedInfo) {
          boxState = checked ? 'YES' : 'NO';
        }
        this.setState({
          [`${stateName}State`]: checked ? 'success' : 'error',
          [stateName]: boxState,
        });
        return;
      }
      case 'confirmPwd':
        this.setState(oldState => ({
          [`${stateName}State`]: value !== '' && value === oldState.password ? 'success' : 'error',
          [stateName]: value,
        }));
        return;
      default:
        this.setState({ [stateName]: value });
    }
  };

  goToLogin = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    const { classes, history } = this.props;
    const {
      loading, cardAnimaton,
      firstnameState, lastnameState,
      emailState, confirmPwdState, passwordState, registerTermAndConditionState,
      openVerificationModal, email,
    } = this.state;

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          {loading && <ReactLoader loading={loading} />}
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={8} lg={6}>
              <Card login className={classes[cardAnimaton]}>
                <CardHeader className={classes.headerWrapper}>
                  <h3 className={classes.standardCardTitle}>Register</h3>
                </CardHeader>
                <form onSubmit={this.registerClick}>
                  <CardBody>
                    <div className={classes.inputWrapper}>
                      <CustomInput
                        labelText="First name (required)"
                        success={firstnameState === 'success'}
                        error={firstnameState === 'error'}
                        id="firstname"
                        inputProps={{
                          autoFocus: true,
                          onChange: event => this.change(event, 'firstname', 'name'),
                          type: 'text',
                        }}
                      />
                      <CustomInput
                        labelText="Last name (required)"
                        success={lastnameState === 'success'}
                        error={lastnameState === 'error'}
                        id="lastname"
                        inputProps={{
                          onChange: event => this.change(event, 'lastname', 'name'),
                          type: 'text',
                        }}
                      />
                    </div>
                    <CustomInput
                      labelText="Email (required)"
                      success={emailState === 'success'}
                      error={emailState === 'error'}
                      id="email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onChange: event => this.change(event, 'email', 'email'),
                        type: 'email',
                      }}
                    />
                    <PasswordField
                      onChangePassword={event => this.change(event, 'password', 'password')}
                      onChangeConfirmPwd={event => this.change(event, 'confirmPwd', 'confirmPwd')}
                      passwordState={passwordState}
                      confirmPwdState={confirmPwdState}
                    />
                    <div>
                      <FormControlLabel
                        className={classes.registerTermsWrapper}
                        control={(
                          <Checkbox
                            onClick={event => this.change(event, eRegisterPage.registerTermAndCondition, 'checkbox')}
                            checkedIcon={<Check className={classes.checkedIcon} />}
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        )}
                        classes={{
                          label: `${classes.label} ${registerTermAndConditionState === 'error' ? classes.labelError : ''}`,
                        }}
                        label={(
                          <span>
                          I agree to the&nbsp;
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link to="#" className={registerTermAndConditionState === 'error' ? classes.labelError : ''}>Terms</Link>
                            &nbsp;and&nbsp;
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link to="#" className={registerTermAndConditionState === 'error' ? classes.labelError : ''}>Conditions</Link>
                          </span>
                        )}
                      />
                      <FormControlLabel
                        className={classes.registerTermsWrapper}
                        control={(
                          <Checkbox
                            onClick={event => this.change(event, eRegisterPage.eReceivedInfo, 'checkbox')}
                            checkedIcon={<Check className={classes.checkedIcon} />}
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                            name={eRegisterPage.eReceivedInfo}
                          />
                        )}
                        classes={{ label: `${classes.label}` }}
                        label={
                          <span>Agree to Receive Information About Private Health Insurance</span>
                        }
                      />
                    </div>
                    <VerificationPage
                      open={openVerificationModal}
                      email={email}
                      history={history}
                      page="register"
                    />
                  </CardBody>
                  <CardFooter className={classes.footerWrapper}>
                    <MaterialButton
                      className={classes.loginButton}
                      onClick={this.goToLogin}
                    >
                      Log in
                    </MaterialButton>
                    <Button
                      color="rose"
                      type="submit"
                    >
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(registerPageStyle),
  connect(null, { registerUser }),
)(RegisterPage);
