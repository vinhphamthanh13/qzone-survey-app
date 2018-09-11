import React from 'react';
import { TextField,Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { verifyUser } from "actions/auth.jsx";
import { connect } from 'react-redux';


class VerificationPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      code: "",
      verifyCode:{
        email:"",
        code:""
      }
    }
    this.handleVerificationCode = this.handleVerificationCode.bind(this);

  }

  handleVerificationCode(){
    const {verifyCode} = this.state
    verifyCode['email'] = this.props.email
    verifyCode['code'] = this.state.code
    this.setState({verifyCode},()=>{
      this.props.verifyUser(this.state.verifyCode,(response)=>{
        if(response.status === 200)
          window.location = "/login"
        else{
          Alert.error('Please enter correct code!', {
            position: 'bottom-right',
            effect: 'bouncyflip'
          });
        }
      })
    })
    
  }

  render() {
    const {classes} = this.props
    return(
      <React.Fragment>
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Verification Code"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email at <b><u>{this.props.email}</u></b> and enter verification code .
            </DialogContentText>
            <TextField
              id="with-placeholder"
              label="Enter Code"
              placeholder="Code"
              className={classes.textField}
              margin="normal"
              onChange={(event) =>{this.setState({code: event.target.value})}}
            />
          </DialogContent>
          <DialogActions>
            <Link to="#" onClick={this.handleVerificationCode} color="rose" autoFocus>
              Submit
            </Link>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

VerificationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null,{verifyUser})(VerificationPage);