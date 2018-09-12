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
import CardBody from "components/Card/CardBody.jsx";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { registerUser } from "actions/auth.jsx";
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-s-alert';
import VerificationPage from "views/Auth/VerificationPage.jsx";
import 'react-phone-number-input/style.css';
import "assets/scss/material-dashboard-pro-react/views/mobileNumberStyle.css";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        firstname: "",
        lastname: ""
      },
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
      mobile: {
        countrycode: "",
        mobilenumber: ""
      },
      phone: "",
      openVerificationModal: false,
      code: "",
      verifyCode: {
        email: "",
        code: ""
      }
    };
    this.change = this.change.bind(this);

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
    const {mobile,phone} = this.state
    mobile['mobilenumber']= phone.substr(phone.length-10)
    mobile['countrycode'] = phone.substr(0,phone.length-10)
    this.setState({mobile})
    if (this.state.name.firstname === "") {
      this.setState({ firstnameState: "error" });
    }
    if (this.state.name.lastname === "") {
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
    if (this.state.name.firstname !== "" && this.state.name.lastname !== "" && this.state.emailState === "success" && this.state.passwordState === "success" && this.state.registerCheckboxState === "success" ) {
      this.props.registerUser(this.state, (response) =>{
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
      })
    }
  }

  

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "name":
        this.setState({ [stateName + "State"]: "success" });
        const {name} = this.state
        name[stateName] = event.target.value
        this.setState({name})
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
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Survey Registration</h2>
              <CardBody>
                <div className={classes.center}>
                  <p>Please provide all required Details to register yourself with us</p>
                </div>
                <hr/>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <form className={classes.form}>
                      <GridContainer>
                        <GridItem xs={12} sm={6}>
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
                        </GridItem>
                        <GridItem xs={12} sm={6}>
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
                        </GridItem>
                      </GridContainer>
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
                        value={ this.state.phone }
                        onChange={ phone => this.setState({ phone }) } />
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
                      <div className={classes.center}>
                        <Button round color="rose" onClick={this.registerClick.bind(this)}>
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
                {this.state.openVerificationModal && <VerificationPage email={this.state.email} classes={classes}/>}
                <Alert stack={true}/>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(registerPageStyle),
  connect(null,{registerUser})
)(RegisterPage);