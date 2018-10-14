import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomInput from 'components/CustomInput/CustomInput';
import registerPageStyle from 'assets/jss/material-dashboard-pro-react/modules/registerPageStyle';

class PasswordField extends PureComponent {
  static propTypes = {
    onChangePassword: PropTypes.func.isRequired,
    onChangeConfirmPwd: PropTypes.func.isRequired,
    passwordState: PropTypes.string.isRequired,
    confirmPwdState: PropTypes.string.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    useLabel: PropTypes.bool,
  }

  static defaultProps = {
    useLabel: true,
  }

  render() {
    const {
      onChangePassword,
      onChangeConfirmPwd,
      passwordState,
      confirmPwdState,
      classes,
      useLabel,
    } = this.props;
    const passwordProps = {
      labelText: useLabel ? 'Password (required)' : undefined,
      inputProps: {
        onChange: onChangePassword,
        type: 'password',
        placeholder: !useLabel ? 'Password (required)' : undefined,
      },
    };

    const confirmPwdProps = {
      labelText: useLabel ? 'Confirm password (required)' : undefined,
      inputProps: {
        onChange: onChangeConfirmPwd,
        type: 'password',
        placeholder: !useLabel ? 'Confirm password (required)' : undefined,
      },
    };

    return (
      <React.Fragment>
        <div className={classes.inputWrapper}>
          <CustomInput
            success={passwordState === 'success'}
            error={passwordState === 'error'}
            id="password"
            {...passwordProps}
          />
          <CustomInput
            success={confirmPwdState === 'success'}
            error={confirmPwdState === 'error'}
            id="confirmPwd"
            {...confirmPwdProps}
          />
        </div>
        <small>
          Password must be from 8 to 60 characters.
          <br />
          {/* eslint-disable-next-line max-len */}
          Password must include at least 1 lowercase character(s), 1 uppercase character(s), 1 digit(s)
          and 1 special character(s) such as #?!@$%^&*-
        </small>
      </React.Fragment>
    );
  }
}

export default withStyles(registerPageStyle)(PasswordField);
