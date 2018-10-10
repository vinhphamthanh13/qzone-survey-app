import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Button,
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import SaveIcon from '@material-ui/icons/CheckCircleOutlined';
import withStyles from "@material-ui/core/styles/withStyles";
import Alert from 'react-s-alert';
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import accountPageStyles from 'assets/jss/material-dashboard-pro-react/modules/accountPageStyles';
import ChangePassword from 'modules/auth/change-password';

class Account extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    inputChange: PropTypes.func.isRequired,
    email: PropTypes.string,
    emailState: PropTypes.string.isRequired,
    saveProfile: PropTypes.func.isRequired,
    resetAccount: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      openChangePassword: false,
      email: props.email,
      emailState: props.emailState,
    };
  }

  onChangeEmail = (event) => {
    this.props.inputChange(event, 'email', 'email');
  }

  changeEditMode = () => {
    this.setState({ isEditMode: true });
  }

  cancelEdit = () => {
    const { isEditMode, ...oldAccount } = this.state;
    this.setState(
      { isEditMode: false },
      () => { this.props.resetAccount(oldAccount); }
    );
  }

  saveEdit = () => {
    this.setState({ isEditMode: false }, this.props.saveProfile);
  }

  onCloseChangePassword = () => {
    this.setState({ openChangePassword: false });
  }

  onOpenChangePassword = () => {
    this.props.resetPassword({ email: this.state.email }, (response) => {
      if (response.status === 200) {
        this.setState({ openChangePassword: true })
        Alert.success("Code is successfully send to your email", { effect: 'bouncyflip' });
      } else {
        Alert.error(response.data.message, { effect: 'bouncyflip' });
      }
    });
  }

  render() {
    const {
      classes,
      email,
      emailState,
    } = this.props;
    const { isEditMode, openChangePassword, ...oldAccount } = this.state;
    let isAccountModified = false;
    for (const key in oldAccount) {
      if (oldAccount.hasOwnProperty(key) && !key.includes('State')) {
        if (oldAccount[key] !== this.props[key]) {
          isAccountModified = true;
          break;
        }
      }
    }

    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary classes={{ content: classes.summary }}>
          <h4>Account</h4>
          <div>
            <Button onClick={this.onOpenChangePassword}>Change password</Button>
            {!isEditMode && <IconButton aria-label="Edit" onClick={this.changeEditMode}><EditIcon /></IconButton>}
            {isEditMode &&
              <IconButton
                aria-label="Cancel"
                color="secondary"
                onClick={this.cancelEdit}
              >
                <CancelIcon />
              </IconButton>
            }
            {isEditMode &&
              <IconButton
                aria-label="Save"
                color="primary"
                onClick={this.saveEdit}
                disabled={emailState === 'error' || !isAccountModified}
              >
                <SaveIcon />
              </IconButton>
            }
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={12}>
              <CustomInput
                labelText="Email (required)"
                success={emailState === 'success'}
                error={emailState === 'error'}
                id="email"
                formControlProps={{ fullWidth: true, disabled: !isEditMode }}
                inputProps={{
                  onChange: this.onChangeEmail,
                  type: 'email',
                }}
                value={email}
              />
            </GridItem>
          </GridContainer>
          <ChangePassword
            openChangePassword={openChangePassword}
            closeChangePassword={this.onCloseChangePassword}
            email={email}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};

export default withStyles(accountPageStyles)(Account);
