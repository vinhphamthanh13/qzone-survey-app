import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from "components/CustomButtons/Button";
import { resetPassword } from "actions/auth";
import ChangePassword from 'views/Auth/ChangePassword'
import CustomInput from "components/CustomInput/CustomInput";
import validateEmail from '../../utils/validateEmail';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  defaultState = {
    email: '',
    emailState: false,
    open: false,
    openChangePassword: false,
  };

  handleResetPassword = () => {
    this.props.resetPassword(this.state, (response) => {
      if (response.status === 200) {
        this.setState({ open: false, openChangePassword: true })
        Alert.success("Code is successfully send to your email", { effect: 'bouncyflip' });
      } else {
        Alert.error(response.data.message, { effect: 'bouncyflip' });
      }
    })
  }

  handleClose = () => {
    this.setState(this.defaultState);
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
      emailState: validateEmail(event.target.value) ? 'success' : 'error',
    });
  }

  render() {
    const { classes } = this.props;
    const { open, emailState, openChangePassword } = this.state;
    return (
      <React.Fragment>
        <div className={classes.alertWrapper}>
          <Link to="#" className={classes.alertLink} onClick={this.handleOpen}>Did you forget your password?</Link>
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your email to reset password
            </DialogContentText>
            <div>
              <CustomInput
                labelText="Enter email"
                success={emailState === "success"}
                error={emailState === "error"}
                id="email"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeEmail,
                  type: "email"
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Close
            </Button>
            <Button onClick={this.handleResetPassword} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ChangePassword
          openChangePassword={openChangePassword}
          closeChangePassword={this.handleClose}
          email={this.state.email}
        />
      </React.Fragment>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { resetPassword })(ResetPassword);