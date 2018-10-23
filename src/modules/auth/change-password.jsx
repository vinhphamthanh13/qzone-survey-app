import React from 'react';
import { connect } from 'react-redux';
import {
  TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText,
} from '@material-ui/core';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { changePassword } from 'services/api/user';
import validatePassword from 'utils/validatePassword';
import verificationPageStyle from 'assets/jss/material-dashboard-pro-react/modules/verificationPageStyle';
import { classesType } from 'types/global';
import PasswordField from './password-field';
import ResendCodeButton from './resend-code-button';

class ChangePassword extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    email: PropTypes.string.isRequired,
    openChangePassword: PropTypes.bool.isRequired,
    closeChangePassword: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
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

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  componentWillReceiveProps(nextProps) {
    const { openChangePassword } = this.props;
    if (openChangePassword !== nextProps.openChangePassword) {
      if (nextProps.openChangePassword) {
        this.startCountDown();
      } else {
        this.stopCountDown();
        this.setState({ countDownResendCode: 30 });
      }
    }
  }

  componentWillUnmount() {
    this.stopCountDown();
  }

  startCountDown = () => {
    this.countDownResendCodeId = setInterval(() => {
      this.setState(
        oldState => ({ countDownResendCode: oldState.countDownResendCode - 1 }),
        () => {
          const { countDownResendCode } = this.state;
          if (countDownResendCode === 0) {
            this.stopCountDown();
          }
        },
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
    const { changePassword: changePasswordAction } = this.props;
    const { code, newPassword, email } = this.state;
    changePasswordAction({ code, newPassword, email }, (response) => {
      if (response.status === 200) {
        const { closeChangePassword } = this.props;
        closeChangePassword();
        Alert.success('Password is successfully updated');
      } else {
        Alert.error(response.data.message);
      }
    });
  }

  onChangePassword = ({ target: { value } }) => {
    const newState = {
      newPasswordState: value.length >= 8
        && value.length <= 60
        && validatePassword(value) ? 'success' : 'error',
      newPassword: value,
    };
    const { confirmPwd } = this.state;

    if (confirmPwd !== undefined) {
      newState.confirmPwdState = value !== '' && value === confirmPwd ? 'success' : 'error';
    }

    this.setState(newState);
  }

  onChangeConfirmPwd = ({ target: { value } }) => {
    this.setState(oldState => ({
      confirmPwdState: value !== '' && value === oldState.newPassword ? 'success' : 'error',
      confirmPwd: value,
    }));
  }

  onDialogClose = () => {
    const { closeChangePassword } = this.props;
    this.setState(this.defaultState, closeChangePassword);
  }

  render() {
    const { classes, openChangePassword, email } = this.props;
    const { countDownResendCode, newPasswordState, confirmPwdState } = this.state;
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
                    passwordState={newPasswordState}
                    confirmPwdState={confirmPwdState}
                  />
                </GridItem>
                <GridItem md={12}>
                  <TextField
                    fullWidth
                    id="code"
                    label="Enter code"
                    onChange={(event) => { this.setState({ code: event.target.value }); }}
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
              <Button onClick={this.onDialogClose}>
                Close
              </Button>
              <Button onClick={this.handleChangePassword} color="rose">
                Submit
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(verificationPageStyle),
  connect(null, { changePassword }),
)(ChangePassword);
