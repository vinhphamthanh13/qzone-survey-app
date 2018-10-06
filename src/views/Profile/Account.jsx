import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import CustomInput from 'components/CustomInput/CustomInput';
import PasswordField from '../Auth/PasswordField';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

export default class Account extends PureComponent {
  static propTypes = {
    email: PropTypes.string,
    emailState: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    inputChange: PropTypes.func.isRequired,
    passwordState: PropTypes.string.isRequired,
    confirmPwdState: PropTypes.string.isRequired,
  }

  static defaultProps = {
    email: undefined,
  }

  onChangeEmail = (event) => {
    this.props.inputChange(event, 'email', 'email');
  }

  onChangePassword = (event) => {
    this.props.inputChange(event, 'password', 'password');
  }

  onChangeConfirmPwd = (event) => {
    this.props.inputChange(event, 'confirmPwd', 'confirmPwd');
  }

  render() {
    const {
      email,
      emailState,
      passwordState,
      confirmPwdState,
    } = this.props;

    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary>
          <h4>Account</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={12}>
              <CustomInput
                success={emailState === 'success'}
                error={emailState === 'error'}
                id="email"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeEmail,
                  type: 'email',
                  placeholder: 'Email (required)'
                }}
                value={email}
              />
            </GridItem>
            <GridItem md={12}>
              <PasswordField
                onChangePassword={this.onChangePassword}
                onChangeConfirmPwd={this.onChangeConfirmPwd}
                passwordState={passwordState}
                confirmPwdState={confirmPwdState}
                useLabel={false}
              />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};
