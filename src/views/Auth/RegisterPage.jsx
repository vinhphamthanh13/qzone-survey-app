import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
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
import { registerUser } from "actions/auth";
import VerificationPage from "views/Auth/VerificationPage";
import ReactLoader from 'views/ReactLoader';
import 'react-phone-number-input/style.css';
import "assets/scss/material-dashboard-pro-react/views/mobileNumberStyle.css";

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
      registerCheckbox: false,
      registerCheckboxState: '',
      userType: "PARTICIPANT",
      openVerificationModal: false,
      code: '',
      verifyCode: {
        email: '',
        code: ''
      },
      loading: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimaton: '' });
    }, 200);
  }

  verifyEmail(value) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value);
  }

  verifyLength(value, length) {
    return value.length >= length;
  }

  verifyPassword(pwd) {
    const pwdReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return pwdReg.test(pwd);
  }

  register = () => {
    if (this.state.firstnameState === 'success' && this.state.lastnameState === 'success'
      && this.state.emailState === 'success' && this.state.passwordState === 'success'
      && this.state.confirmPwdState === 'success' && this.state.registerCheckboxState === 'success') {
      this.setState({ loading: true }, () => {
        this.props.registerUser(this.state, (response) => {
          const newState = { loading: false };

          if (response) {
            if (response.status === 201) {
              newState.openVerificationModal = true;
            } else {
              Alert.error('Cannot connect to server', { effect: 'bouncyflip' });
            }
          }

          this.setState(newState);
        });
      });
    }
  }

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
    if (!this.state.registerCheckbox) {
      newState.registerCheckboxState = 'error';
    }

    this.setState(newState, this.register);
  }

  change = (event, stateName, type) => {
    const { value, checked } = event.target;

    switch (type) {
      case 'name':
        this.setState({
          [`${stateName}State`]: value.length > 0 ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      case 'email':
        this.setState({
          [`${stateName}State`]: this.verifyEmail(value) ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      case 'password': {
        const newState = {
          [`${stateName}State`]: value.length >= 8
            && value.length <= 60
            && this.verifyPassword(value) ? 'success' : 'error',
          [stateName]: value,
        };

        if (this.state.confirmPwd !== undefined) {
          newState.confirmPwdState = value !== '' && value === this.state.confirmPwd ? 'success' : 'error';
        }

        this.setState(newState);
        return;
      }
      case 'checkbox':
        this.setState({
          [`${stateName}State`]: checked ? 'success' : 'error',
          [stateName]: checked,
        });
        return;
      case 'confirmPwd':
        this.setState({
          [`${stateName}State`]: value !== '' && value === this.state.password ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      default:
        this.setState({ [stateName]: value })
        return;
    }
  }

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
                    <div className={classes.inputWrapper}>
                      <CustomInput
                        labelText="Password (required)"
                        success={this.state.passwordState === "success"}
                        error={this.state.passwordState === "error"}
                        id="password"
                        inputProps={{
                          onChange: event => this.change(event, "password", "password"),
                          type: "password",
                        }}
                      />
                      <CustomInput
                        labelText="Confirm password (required)"
                        success={this.state.confirmPwdState === "success"}
                        error={this.state.confirmPwdState === "error"}
                        id="confirmPwd"
                        inputProps={{
                          onChange: event => this.change(event, "confirmPwd", "confirmPwd"),
                          type: "password",
                        }}
                      />
                    </div>
                    <small>
                      Password must be from 8 to 60 characters.<br />
                      Password must include at least 1 lowercase character(s), 1 uppercase character(s), 1 digit(s)
                      and 1 special character(s) such as #?!@$%^&*-
                    </small>
                    <FormControlLabel
                      className={classes.registerTermsWrapper}
                      control={
                        <Checkbox
                          onClick={event => this.change(event, "registerCheckbox", "checkbox")}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{ checked: classes.checked }}
                        />
                      }
                      classes={{
                        label: `${classes.label} ${this.state.registerCheckboxState === 'error' ? classes.labelError : ''}`
                      }}
                      label={
                        <span>
                          I agree to the&nbsp;
                          <Link to="#" className={this.state.registerCheckboxState === 'error' ? classes.labelError : ''}>Terms</Link>
                          &nbsp;and&nbsp;
                          <Link to="#" className={this.state.registerCheckboxState === 'error' ? classes.labelError : ''}>Conditions</Link>
                        </span>
                      }
                    />
                    {this.state.openVerificationModal && <VerificationPage page="register" email={this.state.email} classes={classes} history={history} />}
                  </form>
                </CardBody>
                <CardFooter className={classes.footerWrapper}>
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