import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

export default class Personal extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    firstname: PropTypes.string,
    firstnameState: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    lastnameState: PropTypes.string.isRequired,
    inputChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    firstname: undefined,
    lastname: undefined,
  }

  onChangeFirstname = (event) => {
    this.props.inputChange(event, 'firstname', 'name');
  }

  onChangeLastname = (event) => {
    this.props.inputChange(event, 'lastname', 'name');
  }

  render() {
    const {
      firstname,
      firstnameState,
      lastname,
      lastnameState,
    } = this.props;

    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary>
          <h4>Personal information</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={6}>
              <CustomInput
                success={firstnameState === 'success'}
                error={firstnameState === 'error'}
                id="firstname"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeFirstname,
                  type: 'text',
                  placeholder: 'First name (required)'
                }}
                value={firstname}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                success={lastnameState === 'success'}
                error={lastnameState === 'error'}
                id="lastname"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeLastname,
                  type: "text",
                  placeholder: 'Last name (required)'
                }}
                value={lastname}
              />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};
