import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Checkbox, FormControlLabel, Button as MaterialButton } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { compose } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { registerUser } from "services/api/auth";
import VerificationPage from "modules/auth/verification-page";
import ReactLoader from 'modules/react-loader';
import 'react-phone-number-input/style.css';
import "assets/scss/material-dashboard-pro-react/views/mobileNumberStyle.css";
import validatePassword from "../../utils/validatePassword";
import validateEmail from "../../utils/validateEmail";
import PasswordField from "./password-field";
import { eUserType, eRegisterPage } from "../../constants";

class RegisterPage extends React.Component {
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
      loading: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimaton: '' });
    }, 200);
  }

  verifyLength(value, length) {
    return value.length >= length;
  }

  register = () => {
    if (this.state.firstnameState === 'success' && this.state.lastnameState === 'success'
      && this.state.emailState === 'success' && this.state.passwordState === 'success'
      && this.state.confirmPwdState === 'success' && this.state.registerTermAndConditionState === 'success') {
      this.setState({ loading: true }, () => {
        this.props.registerUser(this.state, (response) => {
          const newState = { loading: false };

          if (response) {
            if (response.status === 201) {
              newState.openVerificationModal = true;
              Alert.success('Thank you for registering!', { effect: 'bouncyflip' });
            } else {
              Alert.error(response.data.message, { effect: 'bouncyflip' });
            }
          }

          this.setState(newState);
        });
      });
    }
  };

  registerClick = () => {
    const newState = {};

    if (!this.state.firstname) {
      newState.firstnameState = 'error';
    }
    if (!this.state.lastname) {
      newState.lastnameState = 'error';
    }
    if (!this.state.email) {
      newState.emailState = 'error';
    }
    if (!this.state.password) {
      newState.passwordState = 'error';
    }
    if (!this.state.confirmPwd) {
      newState.confirmPwdState = 'error';
    }
    if (!this.state.registerTermAndCondition) {
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

        if (this.state.confirmPwd !== undefined) {
          newState.confirmPwdState = value !== '' && value === this.state.confirmPwd ? 'success' : 'error';
        }

        this.setState(newState);
        return;
      }
      case 'checkbox':
        let boxState = name && name === eRegisterPage.eReceivedInfo ?
            checked ? 'YES' : 'NO' :
            checked;
        this.setState({
          [`${stateName}State`]: checked ? 'success' : 'error',
          [stateName]: boxState,
        });
        return;
      case 'confirmPwd':
        this.setState({
          [`${stateName}State`]: value !== '' && value === this.state.password ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      default:
        this.setState({ [stateName]: value });
        return;
    }
  };

  goToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          {this.state.loading && <ReactLoader loading={this.state.loading} />}
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={5}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader className={classes.headerWrapper}>
                  <h3 className={classes.standardCardTitle}>Register</h3>
                </CardHeader>
                <CardBody>
                  <form>
                    <div className={classes.inputWrapper}>
                      <CustomInput
                        labelText="First name (required)"
                        success={this.state.firstnameState === "success"}
                        error={this.state.firstnameState === "error"}
                        id="firstname"
                        inputProps={{
                          onChange: event => this.change(event, "firstname", "name"),
                          type: "text",
                        }}
                      />
                      <CustomInput
                        labelText="Last name (required)"
                        success={this.state.lastnameState === "success"}
                        error={this.state.lastnameState === "error"}
                        id="lastname"
                        inputProps={{
                          onChange: event => this.change(event, "lastname", "name"),
                          type: "text",
                        }}
                      />
                    </div>
                    <CustomInput
                      labelText="Email (required)"
                      success={this.state.emailState === "success"}
                      error={this.state.emailState === "error"}
                      id="email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onChange: event => this.change(event, "email", "email"),
                        type: "email",
                      }}
                    />
                    <PasswordField
                      onChangePassword={event => this.change(event, "password", "password")}
                      onChangeConfirmPwd={event => this.change(event, "confirmPwd", "confirmPwd")}
                      passwordState={this.state.passwordState}
                      confirmPwdState={this.state.confirmPwdState}
                    />
                    <FormControlLabel
                      className={classes.registerTermsWrapper}
                      control={
                        <Checkbox
                          onClick={event => this.change(event, eRegisterPage.registerTermAndCondition, "checkbox")}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{ checked: classes.checked }}
                        />
                      }
                      classes={{
                        label: `${classes.label} ${this.state.registerTermAndConditionState === 'error' ? classes.labelError : ''}`
                      }}
                      label={
                        <span>
                          I agree to the&nbsp;
                          <Link to="#" className={this.state.registerTermAndConditionState === 'error' ? classes.labelError : ''}>Terms</Link>
                          &nbsp;and&nbsp;
                          <Link to="#" className={this.state.registerTermAndConditionState === 'error' ? classes.labelError : ''}>Conditions</Link>
                        </span>
                      }
                    />
                    <FormControlLabel
                      className={classes.registerTermsWrapper}
                      control={
                        <Checkbox
                          onClick={event => this.change(event, eRegisterPage.eReceivedInfo, "checkbox")}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{ checked: classes.checked }}
                          name={eRegisterPage.eReceivedInfo}
                        />
                      }
                      classes={{ label: `${classes.label}` }}
                      label={
                        <span>Agree to Receive Information About Private Health Insurance</span>
                      }
                    />
                    <VerificationPage
                      open={this.state.openVerificationModal}
                      email={this.state.email}
                      history={history}
                      page="register"
                    />
                  </form>
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
                    onClick={this.registerClick}
                  >
                    Register
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Alert stack={true} />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withStyles(registerPageStyle),
  connect(null, { registerUser })
)(RegisterPage);
