import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Email, Lock } from "@material-ui/icons";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import _ from 'lodash';
import VerificationPage from "views/Auth/VerificationPage.jsx";
import Alert from 'react-s-alert';
import { loginUser } from "actions/auth.jsx";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      emailState: "",
      password: "",
      passwordState: "",
      openVerificationCode: false
    };

    this.loginClick = this.loginClick.bind(this);
    this.handleVerificationCode = this.handleVerificationCode.bind(this);

  }
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleVerificationCode(){
    console.log(this.state.openVerificationCode)
    this.setState({openVerificationCode: true})
  }

  handleClose(){
    this.setState({openVerificationCode: false})
  }

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  loginClick() {
    if (this.state.emailState === "") {
      this.setState({ emailState: "error" });
    }
    if (this.state.passwordState === "") {
      this.setState({ passwordState: "error" });
    }
    if (this.state.emailState === "success" && this.state.passwordState === "success") {
      this.props.loginUser(this.state , (response)=>{
        if(response.status === 200)
          window.location = '/dashboard'
        else{
          Alert.error(response.data.message, {
            position: 'bottom-right',
            effect: 'bouncyflip'
          });
        }
      })
    }
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    this.setState({[stateName]: event.target.value})

    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (_.isEmpty(event.target.value))
          this.setState({[stateName + "State"]: "error"})
        else {
          this.setState({ [stateName + "State"]: "success" });
        }
        break;
      default:
        this.setState({[stateName]: event.target.value})
        break;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <form>
                <Card login className={classes[this.state.cardAnimaton]}>
                  <CardHeader
                    className={`${classes.cardHeader} ${classes.textCenter}`}
                    color="rose"
                  >
                    <h4 className={classes.cardTitle}>Log in</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="https://www.twitter.com"
                        target="_blank"
                        color="transparent"
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="https://www.facebook.com"
                        target="_blank"
                        color="transparent"
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="https://www.plus.google.com"
                        target="_blank"
                        color="transparent"

                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      success={this.state.emailState === "success"}
                      error={this.state.emailState === "error"}
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "email", "email"),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      success={this.state.passwordState === "success"}
                      error={this.state.passwordState === "error"}
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "password", "password"),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Link to="#">Forgot Password</Link>
                    <VerificationPage page={"login"} email={this.state.email} classes={classes}/>
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button color="rose"  onClick={this.loginClick}>
                      Let's Go
                    </Button>
                  </CardFooter>
                  
                  <hr/>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
        <Alert stack={true}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(loginPageStyle),
  connect(null,{loginUser})
)(LoginPage);