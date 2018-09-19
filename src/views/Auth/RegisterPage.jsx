import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { InputAdornment, Checkbox, FormControlLabel } from "@material-ui/core";
import { Email, Person, Check, Lock } from "@material-ui/icons";
import { compose } from 'redux';
import { connect } from 'react-redux';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardBody from "components/Card/CardBody.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import { registerUser } from "actions/auth.jsx";
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-s-alert';
import VerificationPage from "views/Auth/VerificationPage.jsx";
import 'react-phone-number-input/style.css';
import "assets/scss/material-dashboard-pro-react/views/mobileNumberStyle.css";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import ReactLoader from 'views/ReactLoader.jsx'


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      companyName: "",
      department: "",
      firstnameState: "",
      lastnameState: "",
      email: "",
      password: "",
      emailState: "",
      passwordState: "",
      registerCheckbox: false,
      registerCheckboxState: "",
      phoneNumber: "",
      userType: "PARTICIPANT",
      openVerificationModal: false,
      code: "",
      verifyCode: {
        email: "",
        code: ""
      },
      loading: false
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
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

  registerClick() {
    this.setState({loading: true})
    if (this.state.firstname === "") {
      this.setState({ firstnameState: "error" });
    }
    if (this.state.lastname === "") {
      this.setState({ lastnameState: "error" });
    }
    if (this.state.emailState === "") {
      this.setState({ emailState: "error" });
    }
    if (this.state.passwordState === "") {
      this.setState({ passwordState: "error" });
    }
    if (this.state.registerCheckboxState === "" ) {
      this.setState({ registerCheckboxState: "error" });
    }
    if (this.state.firstname !== "" && this.state.lastname !== "" && this.state.emailState === "success" && this.state.passwordState === "success" && this.state.registerCheckboxState === "success" ) {
      this.props.registerUser(this.state, (response) =>{
        this.setState({loading: false})
        if(response){
          if (response.status === 201)
          {
            this.setState({openVerificationModal: true})
          }
          else
          {
            Alert.error(response.data.message, {
              position: 'bottom-right',
              effect: 'bouncyflip',
            });
          }
        }
      })
    }
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "name":
        this.setState({ [stateName + "State"]: "success" });
        
        this.setState({[stateName]: event.target.value})
        break;
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      case "password":
        if (this.verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      default:
        this.setState({[stateName]: event.target.value})
        break;
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.openVerificationModal)

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          {this.state.loading && <ReactLoader loading={this.state.loading}/>}
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Register</h4>
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
                  <form className={classes.form}>
                    <CustomInput
                      labelText="First Name*"
                      success={this.state.firstnameState === "success"}
                      error={this.state.firstnameState === "error"}
                      id="firstname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "firstname", "name"),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Last Name*"
                      success={this.state.lastnameState === "success"}
                      error={this.state.lastnameState === "error"}
                      id="lastname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "lastname","name"),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email*"
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
                      labelText="Password*"
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
                            <Lock className={classes.inputAdornmentIcon}/>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Company Name"
                      id="companyName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "companyName", "companyName"),
                        type: "text",
                      }}
                    />
                    <CustomInput
                      labelText="Department Name"
                      id="department"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "department", "department"),
                        type: "text",
                      }}
                    />
                    <PhoneInput
                      placeholder="Phone Number"
                      value={ this.state.phoneNumber }
                      onChange={ phoneNumber => this.setState({ phoneNumber }) } />
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "registerCheckbox", "checkbox")
                          }
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label:
                          classes.label +
                          (this.state.registerCheckboxState === "error"
                            ? " " + classes.labelError
                            : "")
                      }}
                      label={
                        <span>
                          I agree to the terms and conditions
                          
                        </span>
                      }
                    />
                    {this.state.openVerificationModal && <VerificationPage page={'register'} email={this.state.email} classes={classes}/>}
                    <Alert stack={true}/>
                  </form>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button  color="rose" onClick={this.registerClick.bind(this)}>
                    Get started
                  </Button>
                </CardFooter>
                <hr/>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(loginPageStyle),
  connect(null,{registerUser})
)(RegisterPage);