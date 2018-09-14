import React from 'react';
import { TextField,Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { verifyUser, verifyResendUser } from "actions/auth.jsx";
import { connect } from 'react-redux';


class VerificationPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      code: "",
      verifyCode:{
        email:"",
        code:""
      },
      open: false
    }
    this.handleVerificationCode = this.handleVerificationCode.bind(this);
    this.handleResendVerificationCode = this.handleResendVerificationCode.bind(this);

  }

  componentWillMount(){
    if (this.props.page === 'register')
      this.setState({open: true})
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

  handleResendVerificationCode(){
    console.log(this.props.email)
    const {verifyCode} = this.state
    verifyCode['email'] = this.props.email
    this.setState({verifyCode},()=>{
      this.props.verifyResendUser(this.state.verifyCode)
    })
  }

  handleClose = () =>{
    this.setState({open: false})
  }

  handleOpen = () =>{
    this.setState({open: true})
  }

  render() {
    return(
      <React.Fragment>
        {this.props.page === 'login' &&<Link to="#" style={{paddingLeft: '125px',fontFamily: 'sans-serif', fontWeight: 'bold'}} onClick={this.handleOpen} >Verification Code</Link>}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{"Verification Code"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email at <b><u>{this.props.email}</u></b> and enter verification code .
            </DialogContentText>
            <div>
              <TextField
                margin="dense"
                id="code"
                label="Enter Code"
                onChange={(event) =>{this.setState({code: event.target.value})}}
              />
              {this.props.page === 'login' && <Link to="#" onClick={this.handleResendVerificationCode} style={{paddingLeft: '64px'}}>Resend</Link>}
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
  classes: PropTypes.object.isRequired
};

export default connect(null,{verifyUser,verifyResendUser})(VerificationPage);