import React from 'react';
import { connect } from 'react-redux';
import { TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { changePassword } from "services/api/auth.jsx";
import validatePassword from 'utils/validatePassword';
import verificationPageStyle from 'assets/jss/material-dashboard-pro-react/views/verificationPageStyle';
import PasswordField from './password-field';
import ResendCodeButton from './resend-code-button';

class ChangePassword extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    openChangePassword: PropTypes.bool.isRequired,
    closeChangePassword: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  defaultState = {
    code: '',
    newPassword: undefined,
    newPasswordState: false,
    confirmPwd: undefined,
    confirmPwdState: false,
    countDownResendCode: 30,
  };

  countDownResendCodeId = null;

  componentWillUnmount() {
    this.stopCountDown();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openChangePassword !== nextProps.openChangePassword) {
      if (nextProps.openChangePassword) {
        this.startCountDown();
      } else {
        this.stopCountDown();
        this.setState({ countDownResendCode: 30 });
      }
    }
  }

  startCountDown = () => {
    this.countDownResendCodeId = setInterval(() => {
      this.setState(
        (oldState) => ({ countDownResendCode: oldState.countDownResendCode - 1 }),
        () => {
          if (this.state.countDownResendCode === 0) {
            this.stopCountDown();
          }
        }
      );
    }, 1000);
  }

  stopCountDown = () => {
    if (this.countDownResendCodeId) {
      clearInterval(this.countDownResendCodeId);
    }
  }

  cbAfterResend = () => {
    this.setState({ countDownResendCode: 30 }, this.startCountDown);
  }

  handleChangePassword = () => {
    this.props.changePassword({
      code: this.state.code,
      newPassword: this.state.newPassword,
      email: this.props.email,
    }, (response) => {
      if (response.status === 200) {
        this.props.closeChangePassword();
        Alert.success("Password is successfully updated", { effect: 'bouncyflip' });
      } else {
        Alert.error(response.data.message, { effect: 'bouncyflip' });
      }
    })
  }

  onChangePassword = ({ target: { value } }) => {
    const newState = {
      newPasswordState: value.length >= 8
        && value.length <= 60
        && validatePassword(value) ? 'success' : 'error',
      newPassword: value,
    };

    if (this.state.confirmPwd !== undefined) {
      newState.confirmPwdState = value !== '' && value === this.state.confirmPwd ? 'success' : 'error';
    }

    this.setState(newState);
  }

  onChangeConfirmPwd = ({ target: { value } }) => {
    this.setState({
      confirmPwdState: value !== '' && value === this.state.newPassword ? 'success' : 'error',
      confirmPwd: value,
    });
  }

  onDialogClose = () => {
    this.setState(this.defaultState, this.props.closeChangePassword);
  }

  render() {
    const { classes, openChangePassword, email } = this.props;
    const { countDownResendCode } = this.state;
    return (
      <React.Fragment>
        <Dialog
          open={openChangePassword}
          onClose={this.onDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update password</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your new password
            </DialogContentText>
            <div>
              <GridContainer>
                <GridItem md={12}>
                  <PasswordField
                    onChangePassword={this.onChangePassword}
                    onChangeConfirmPwd={this.onChangeConfirmPwd}
                    passwordState={this.state.newPasswordState}
                    confirmPwdState={this.state.confirmPwdState}
                  />
                </GridItem>
                <GridItem md={12}>
                  <TextField
                    fullWidth
                    id="code"
                    label="Enter code"
                    onChange={(event) => { this.setState({ code: event.target.value }) }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <ResendCodeButton
              classes={classes}
              cbAfterResend={this.cbAfterResend}
              email={email}
              countDownResendCode={countDownResendCode}
            />
            <div>
              <Button onClick={this.onDialogClose} >
                Close
              </Button>
              <Button onClick={this.handleChangePassword} color="rose">
                Submit
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default compose(
  withStyles(verificationPageStyle),
  connect(null, { changePassword }),
)(ChangePassword);