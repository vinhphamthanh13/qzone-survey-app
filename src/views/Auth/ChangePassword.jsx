import React from 'react';
import { connect } from 'react-redux';
import { TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { changePassword } from "actions/auth.jsx";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      newPassword: '',
    }
  }

  handleChangePassword = () => {
    this.props.changePassword({ ...this.state, email: this.props.email }, (response) => {
      if (response.status === 200) {
        this.props.closeChangePassword();
        Alert.success("Password is successfully updated", { effect: 'bouncyflip' });
      } else {
        Alert.error(response.data.message, { effect: 'bouncyflip' });
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.openChangePassword}
          onClose={this.props.closeChangePassword}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your new Password
            </DialogContentText>
            <div>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="code"
                    type="number"
                    label="Enter Code"
                    onChange={(event) => { this.setState({ code: event.target.value }) }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="password"
                    type="password"
                    label="Enter New Password"
                    onChange={(event) => { this.setState({ newPassword: event.target.value }) }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeChangePassword} >
              Cancel
            </Button>
            <Button onClick={this.handleChangePassword} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { changePassword })(ChangePassword);