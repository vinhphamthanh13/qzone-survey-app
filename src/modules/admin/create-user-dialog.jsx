import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import PhoneInput from 'react-phone-number-input';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomInput from 'components/CustomInput/CustomInput';
import { classesType } from 'types/global';
import personalPageStyles from 'assets/jss/material-dashboard-pro-react/modules/personalPageStyles';
import validateEmail from 'utils/validateEmail';
import { eUserType } from '../../constants';

class CreateUserDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onCreateUser: PropTypes.func.isRequired,
    classes: classesType.isRequired,
  }

  defaultState = {
    email: undefined,
    emailState: '',
    firstname: undefined,
    firstnameState: '',
    lastname: undefined,
    lastnameState: '',
    department: undefined,
    companyName: undefined,
    phoneNumber: '',
    postCode: undefined,
    userType: eUserType.assessor,
    password: 'Test@2018',
  }

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  handleSubmit = () => {
    const { onCreateUser } = this.props;
    const {
      emailState, firstnameState, lastnameState, ...userInfo
    } = this.state;
    onCreateUser(userInfo);
  }

  handleClose = () => {
    const { closeDialog } = this.props;
    this.setState({ ...this.defaultState });
    closeDialog();
  }

  change = (event, stateName, type) => {
    const { value } = event.target;

    switch (type) {
      case 'name':
        this.setState({
          [`${stateName}State`]: value.length > 0 ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      case 'email':
        this.setState({
          [`${stateName}State`]: validateEmail(value) ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      default:
        this.setState(({ [stateName]: value }));
    }
  }

  render() {
    const { open, classes } = this.props;
    const {
      emailState,
      firstnameState,
      lastnameState,
      userType,
    } = this.state;
    return (
      <Dialog
        fullWidth
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create user</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem md={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="user-type">User type (required)</InputLabel>
                <Select
                  value={userType}
                  onChange={event => this.change(event, 'userType')}
                  inputProps={{
                    name: 'user-type',
                    id: 'user-type',
                  }}
                >
                  <MenuItem
                    value={eUserType.assessor}
                  >
                    {eUserType.assessor}
                  </MenuItem>
                  <MenuItem
                    value={eUserType.sponsor}
                  >
                    {eUserType.sponsor}
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem md={12}>
              <CustomInput
                labelText="Email (required)"
                success={emailState === 'success'}
                error={emailState === 'error'}
                id="email"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: e => this.change(e, 'email', 'email'),
                  type: 'email',
                }}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="First name (required)"
                success={firstnameState === 'success'}
                error={firstnameState === 'error'}
                id="firstname"
                formControlProps={{ fullWidth: true }}
                inputProps={{ onChange: e => this.change(e, 'firstname', 'name') }}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Last name (required)"
                success={lastnameState === 'success'}
                error={lastnameState === 'error'}
                id="lastname"
                formControlProps={{ fullWidth: true }}
                inputProps={{ onChange: e => this.change(e, 'lastname', 'name') }}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your department"
                id="department"
                formControlProps={{ fullWidth: true }}
                inputProps={{ onChange: e => this.change(e, 'department') }}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your company"
                id="company"
                formControlProps={{ fullWidth: true }}
                inputProps={{ onChange: e => this.change(e, 'companyName') }}
              />
            </GridItem>
            <GridItem md={6}>
              <PhoneInput
                placeholder="Your phone number"
                className={classes.phoneNumber}
                onChange={value => this.change({ target: { value: value || '' } }, 'phoneNumber')}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your post code"
                id="postCode"
                formControlProps={{ fullWidth: true }}
                inputProps={{ onChange: e => this.change(e, 'postCode') }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Close
          </Button>
          <Button
            disabled={emailState !== 'success' || firstnameState !== 'success' || lastnameState !== 'success'}
            onClick={this.handleSubmit}
            color="rose"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default compose(
  withStyles({ phoneNumber: personalPageStyles.phoneNumber }),
)(CreateUserDialog);