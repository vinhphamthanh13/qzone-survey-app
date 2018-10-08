import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import EditIcon from "@material-ui/icons/Edit";
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import personalPageStyles from 'assets/jss/material-dashboard-pro-react/modules/personalPageStyles';

class Personal extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    firstname: PropTypes.string,
    firstnameState: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    lastnameState: PropTypes.string.isRequired,
    inputChange: PropTypes.func.isRequired,
    department: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
  }

  onChangeFirstname = (event) => {
    this.props.inputChange(event, 'firstname', 'name');
  }

  onChangeLastname = (event) => {
    this.props.inputChange(event, 'lastname', 'name');
  }

  onChangeDepartment = (event) => {
    this.props.inputChange(event, 'department', 'department');
  }

  onChangeCompanyName = (event) => {
    this.props.inputChange(event, 'companyName', 'companyName');
  }

  onChangePhoneNumber = (event) => {
    this.props.inputChange(event, 'phoneNumber', 'phoneNumber');
  }

  onChangePostCode = (event) => {
    this.props.inputChange(event, 'postCode', 'postCode');
  }

  render() {
    const {
      classes,
      firstname,
      firstnameState,
      lastname,
      lastnameState,
      department,
      companyName,
      phoneNumber,
      postCode,
    } = this.props;

    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary classes={{ content: classes.summary }}>
          <h4>Personal information</h4>
          <IconButton aria-label="Edit" onClick={this.changeEditMode}><EditIcon /></IconButton>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={6}>
              <CustomInput
                labelText="First name (required)"
                success={firstnameState === 'success'}
                error={firstnameState === 'error'}
                id="firstname"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeFirstname,
                  readOnly: true,
                }}
                value={firstname}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Last name (required)"
                success={lastnameState === 'success'}
                error={lastnameState === 'error'}
                id="lastname"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeLastname,
                  readOnly: true,
                }}
                value={lastname}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your department"
                id="department"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeDepartment,
                  readOnly: true,
                }}
                value={department}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your company"
                id="company"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeCompanyName,
                  readOnly: true,
                }}
                value={companyName}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your phone number"
                id="phoneNumber"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangePhoneNumber,
                  readOnly: true,
                }}
                value={phoneNumber}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your postcode"
                id="postCode"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangePostCode,
                  readOnly: true,
                }}
                value={postCode}
              />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};

export default withStyles(personalPageStyles)(Personal);
