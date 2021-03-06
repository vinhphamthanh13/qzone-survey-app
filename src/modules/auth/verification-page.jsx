import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/CustomButtons/Button';
import { verifyUser } from 'services/api/auth';
import verificationPageStyle from 'assets/jss/material-dashboard-pro-react/modules/verificationPageStyle';
import { classesType, historyType } from 'types/global';
import ResendCodeButton from './resend-code-button';

class VerificationPage extends React.PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    history: historyType.isRequired,
    email: PropTypes.string,
    open: PropTypes.bool.isRequired,
    page: PropTypes.string.isRequired,
    actionAfterSubmit: PropTypes.func,
    verifyUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    email: undefined,
    actionAfterSubmit: undefined,
  }

  countDownResendCodeId = null;

  constructor(props) {
    super(props);
    this.state = { code: '', errorCode: false, countDownResendCode: 30 };
  }

  componentWillReceiveProps(nextProps) {
    const { open } = this.props;
    if (open !== nextProps.open) {
      if (nextProps.open) {
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

  handleVerificationCode = () => {
    const { code } = this.state;
    const {
      email, page, actionAfterSubmit,
      verifyUser: verifyUserAction, history,
    } = this.props;

    verifyUserAction({ email, code }, (response) => {
      if (response.status === 200) {
        if (page === 'login') {
          actionAfterSubmit();
        } else {
          history.push('/login');
          Alert.success('Register successfully! Please login with your new account', { effect: 'bouncyflip' });
        }
      } else {
        this.setState({ errorCode: true });
      }
    });
  }

  cbAfterResend = () => {
    this.setState({ errorCode: false, countDownResendCode: 30 }, this.startCountDown);
  }

  render() {
    const { email, classes, open } = this.props;
    const { countDownResendCode, errorCode } = this.state;

    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Verification code</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email
              {' '}
              <b><u>{email}</u></b>
              {' '}
              and enter verification code.
            </DialogContentText>
            <FormControl
              fullWidth
              error={errorCode}
              aria-describedby="code-input-wrapper"
            >
              <InputLabel htmlFor="code-input">Enter code</InputLabel>
              <Input
                fullWidth
                id="code-input"
                onChange={(event) => { this.setState({ code: event.target.value }); }}
              />
              {errorCode && <FormHelperText id="code-input-wrapper">Please enter correct code!</FormHelperText>}
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <ResendCodeButton
              classes={classes}
              cbAfterResend={this.cbAfterResend}
              email={email}
              countDownResendCode={countDownResendCode}
            />
            <div>
              <Button onClick={this.handleVerificationCode} color="rose">
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
  connect(null, { verifyUser }),
)(VerificationPage);
