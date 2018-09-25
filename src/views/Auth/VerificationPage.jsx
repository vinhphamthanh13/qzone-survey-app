import React from 'react';
import { TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from "components/CustomButtons/Button";
import { verifyUser, verifyResendUser } from "actions/auth";

class VerificationPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      verifyCode: {
        email: '',
        code: '',
      },
      open: true,
    }
  }

  componentWillMount() {
    this.setState({ open: true })
  }

  handleVerificationCode = () => {
    const { verifyCode } = this.state;
    verifyCode['email'] = this.props.email;
    verifyCode['code'] = this.state.code;
    this.setState({ verifyCode }, () => {
      this.props.verifyUser(this.state.verifyCode, (response) => {
        if (response.status === 200) {
          this.props.history.push('/login');
          Alert.success('Register successfully!', { effect: 'bouncyflip' });
        } else {
          Alert.error('Please enter correct code!', { effect: 'bouncyflip' });
        }
      })
    })
  }

  handleResendVerificationCode = () => {
    const { verifyCode } = this.state;
    verifyCode['email'] = this.props.email;
    this.setState({ verifyCode }, () => {
      this.props.verifyResendUser(this.state.verifyCode, (response) => {
        if (response.status !== 200) {
          Alert.error(response.data.message, { effect: 'bouncyflip' });
        }
      })
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Verification code</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email at <b><u>{this.props.email}</u></b> and enter verification code.
            </DialogContentText>
            <div>
              <TextField
                margin="dense"
                id="code"
                label="Enter code"
                onChange={(event) => { this.setState({ code: event.target.value }) }}
              />
              {this.props.page === 'login' && <Link to="#" onClick={this.handleResendVerificationCode} style={{ paddingLeft: '64px' }}>Resend</Link>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Cancel
            </Button>
            <Button onClick={this.handleVerificationCode} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

VerificationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { verifyUser, verifyResendUser })(VerificationPage);