import React from 'react';
import {
  TextField, Dialog, DialogContent, DialogTitle, DialogActions,
} from '@material-ui/core';
import Button from 'components/CustomButtons/Button';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { registerUser } from 'services/api/user';
import { toggleLoading } from 'services/api/assessment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import validateEmail from 'utils/validateEmail';
import { eUserType } from '../../constants';

class Assessor extends React.Component {
  static propTypes = {
    toggleLoading: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    reloadAssessorList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailState: 'error',
      firstname: '',
      lastname: '',
      userType: eUserType.assessor,
      open: false,
      password: 'Test@2018',
    };
  }

  handleAssessor = () => {
    const {
      toggleLoading: toggleLoadingAction, registerUser: registerUserAction,
      reloadAssessorList,
    } = this.props;
    toggleLoadingAction();
    registerUserAction(this.state, (response) => {
      toggleLoadingAction();

      if (response) {
        if (response.status !== 201) {
          Alert.error(<AlertMessage>{response.data.message}</AlertMessage>);
        } else {
          Alert.success(<AlertMessage>Assessor was created successfully</AlertMessage>);
          this.setState({ open: false }, reloadAssessorList);
        }
      }
    });
  };

  handleChange = (event, type) => {
    const newState = {
      [type]: event.target.value,
    };
    if (/^email$/.test(type)) {
      newState.emailState = validateEmail(event.target.value) ? 'success' : 'error';
    }
    this.setState(newState);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };


  render() {
    const { open } = this.state;
    const { firstname, lastname, emailState } = this.state;
    const submitDisabled = !firstname || !lastname || /^error$/.test(emailState);
    return (
      <React.Fragment>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link to="#" style={{ fontWeight: 'bold' }} onClick={this.handleOpen}>Add Assessor</Link>
        <Dialog
          fullWidth
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Assessor</DialogTitle>
          <DialogContent>
            <GridContainer style={{ marginBottom: 10 }}>
              <GridItem md={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  label="Enter first name"
                  onChange={event => this.handleChange(event, 'firstname')}
                />
              </GridItem>
              <GridItem md={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Enter last name"
                  onChange={event => this.handleChange(event, 'lastname')}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem md={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Enter email"
                  onChange={event => this.handleChange(event, 'email')}
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Close
            </Button>
            <Button disabled={submitDisabled} onClick={this.handleAssessor} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default compose(
  connect(null, { registerUser, toggleLoading }),
)(Assessor);
