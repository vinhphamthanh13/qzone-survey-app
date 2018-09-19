import React from 'react';
import { TextField,Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { changePassword } from "actions/auth.jsx";
import { connect } from 'react-redux';


class ChangePassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      code:'',
      newPassword:'',
      open: false,
      openChangePassword: false
    }
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleChangePassword(){
    this.props.changePassword(this.state, (response)=>{
        if(response.status === 200){
          this.setState({open: false})
          Alert.success("Password is successfully updated", {
            position: 'bottom-right',
            effect: 'bouncyflip'
          });
        }
        else{
          Alert.error(response.data.message, {
            position: 'bottom-right',
            effect: 'bouncyflip'
          });
        }
      })
  }

  handleClose = () =>{
    this.setState({open: false})
    this.props.closeChangePassword()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.openChangePassword,email: nextProps.email})
  }
  

  render() {

    return(
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{"Update Password"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your new Password
            </DialogContentText>
            <div>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="email"
                    type="email"
                    label="Enter Email"
                    onChange={(event) =>{this.setState({email: event.target.value})}}
                    value={this.state.email}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="code"
                    type="number"
                    label="Enter Code"
                    onChange={(event) =>{this.setState({code: event.target.value})}}
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
                    onChange={(event) =>{this.setState({newPassword: event.target.value})}}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Cancel
            </Button>
            <Button  onClick={this.handleChangePassword} color="rose">
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

export default connect(null,{changePassword})(ChangePassword);