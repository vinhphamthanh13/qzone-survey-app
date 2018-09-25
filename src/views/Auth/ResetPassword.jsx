import React from 'react';
import { TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from "components/CustomButtons/Button";
import { resetPassword } from "actions/auth";
import ChangePassword from 'views/Auth/ChangePassword'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      open: false,
      openChangePassword: false,
    }
  }

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
    this.setState({ open: false, openChangePassword: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.alertWrapper}>
          <Link to="#" className={classes.alertLink} onClick={this.handleOpen}>Did you forget your password?</Link>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your email to reset password
            </DialogContentText>
            <div>
              <TextField
                margin="dense"
                id="email"
                type="email"
                label="Enter email"
                onChange={(event) => { this.setState({ email: event.target.value }) }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Cancel
            </Button>
            <Button onClick={this.handleResetPassword} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ChangePassword openChangePassword={this.state.openChangePassword} closeChangePassword={this.handleClose} email={this.state.email} classes={classes} />
      </React.Fragment>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { resetPassword })(ResetPassword);