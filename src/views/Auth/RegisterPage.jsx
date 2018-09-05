import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { InputAdornment, Checkbox, FormControlLabel, MenuItem, Select,FormControl, InputLabel } from "@material-ui/core";
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
const userTypes = ['ADMIN', 'ASSESSOR','CUSTOMER']
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      login: "",
      userType:"",
      userTypeState:"",
      loginState: "",
      emailState: "",
      passwordState: "",
      registerCheckbox: false,
      registerCheckboxState: ""
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
    if (this.state.loginState === "") {
      this.setState({ loginState: "error" });
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
    if (this.state.userType === "" ) {
      this.setState({ userTypeState: "error" });
    }
    if (this.state.loginState === "success" && this.state.emailState === "success" && this.state.passwordState === "success" && this.state.registerCheckboxState === "success" && this.state.userTypeState !== "error") {
      this.props.registerUser(this.state, (response) =>{
      })
    }
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    
    switch (type) {
      case "login":
        if (this.verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
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
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.center}>
                      <Button justIcon round color="twitter" >
                        <i className="fab fa-twitter" />
                      </Button>
                      {` `}
                      <Button justIcon round color="dribbble">
                        <i className="fab fa-dribbble" />
                      </Button>
                      {` `}
                      <Button justIcon round color="facebook">
                        <i className="fab fa-facebook-f" />
                      </Button>
                      {` `}
                      <h4 className={classes.socialTitle}>or be classical</h4>
                    </div>
                    <form className={classes.form}>
                      <CustomInput
                        labelText="UserName"
                        success={this.state.loginState === "success"}
                        error={this.state.loginState === "error"}
                        id="login"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "login", "login"),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Person className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Email"
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
                              <Lock className={classes.inputAdornmentIcon}/>
                            </InputAdornment>
                          )
                        }}
                      />
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel error={this.state.userTypeState === "error"}>UserType</InputLabel>
                        <Select
                          value={this.state.userType}
                          onChange={event =>
                            this.change(event, "userType")}
                          classes={{ select: classes.select }}
                        > 
                          {userTypes.map(userType => (
                            <MenuItem
                              key={userType}
                              value={userType}
                              
                            >
                              {userType}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                        <Button round color="primary" onClick={this.registerClick.bind(this)}>
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
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