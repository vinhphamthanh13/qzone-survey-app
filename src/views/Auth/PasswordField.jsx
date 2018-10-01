import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class PasswordField extends PureComponent {
  static propTypes = {
    onChangePassword: PropTypes.func.isRequired,
    onChangeConfirmPwd: PropTypes.func.isRequired,
    passwordState: PropTypes.bool.isRequired,
    confirmPwdState: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { onChangePassword, onChangeConfirmPwd, passwordState, confirmPwdState, classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.inputWrapper}>
          <CustomInput
            labelText="Password (required)"
            success={passwordState === "success"}
            error={passwordState === "error"}
            id="password"
            inputProps={{
              onChange: onChangePassword,
              type: "password",
            }}
          />
          <CustomInput
            labelText="Confirm password (required)"
            success={confirmPwdState === "success"}
            error={confirmPwdState === "error"}
            id="confirmPwd"
            inputProps={{
              onChange: onChangeConfirmPwd,
              type: "password",
            }}
          />
        </div>
        <small>
          Password must be from 8 to 60 characters.<br />
          Password must include at least 1 lowercase character(s), 1 uppercase character(s), 1 digit(s)
          and 1 special character(s) such as #?!@$%^&*-
        </small>
      </React.Fragment>
    )
  }
};

export default withStyles(registerPageStyle)(PasswordField);
