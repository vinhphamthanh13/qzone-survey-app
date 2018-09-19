import React from 'react';
import { TextField,Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { resetPassword } from "actions/auth.jsx";
import { connect } from 'react-redux';
import ChangePassword from 'views/Auth/ChangePassword.jsx'

class ResetPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      open: false,
      openChangePassword: false,
    }
    this.handleResetPassword = this.handleResetPassword.bind(this)
  }

  handleResetPassword(){
    this.props.resetPassword(this.state, (response)=>{
        if(response.status === 200){
          this.setState({open: false,openChangePassword: true})
          Alert.success("Code is successfully send to your email", {
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
    this.setState({open: false,openChangePassword: false})
  }

  handleOpen = () =>{
    this.setState({open: true})
  }

  render() {
    return(
      <React.Fragment>
        <Link to="#" style={{paddingLeft: '195px',fontFamily: 'sans-serif', fontWeight: 'bold'}} onClick={this.handleOpen}>Forgot Password?</Link>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{"Reset Password"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your email Id to reset Password
            </DialogContentText>
            <div>
              <TextField
                margin="dense"
                id="email"
                type="email"
                label="Enter Email"
                onChange={(event) =>{this.setState({email: event.target.value})}}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Cancel
            </Button>
            <Button  onClick={this.handleResetPassword} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ChangePassword openChangePassword={this.state.openChangePassword} closeChangePassword={this.handleClose} email={this.state.email} classes={this.props.classes}/>
      </React.Fragment>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null,{resetPassword})(ResetPassword);