import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from 'components/CustomInput/CustomInput';
import PasswordField from '../auth/password-field';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import accountPageStyles from 'assets/jss/material-dashboard-pro-react/modules/accountPageStyles';

class Account extends PureComponent {
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
      classes,
      email,
      emailState,
      passwordState,
      confirmPwdState,
    } = this.props;

    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary classes={{ content: classes.summary }}>
          <h4>Account</h4>
          <IconButton aria-label="Edit" onClick={this.changeEditMode}><EditIcon /></IconButton>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={12}>
              <CustomInput
                labelText="Email (required)"
                success={emailState === 'success'}
                error={emailState === 'error'}
                id="email"
                formControlProps={{ fullWidth: true, readOnly: true }}
                inputProps={{
                  onChange: this.onChangeEmail,
                  type: 'email',
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

export default withStyles(accountPageStyles)(Account);
