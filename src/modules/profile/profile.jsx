import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import profileStyle from '../../assets/jss/material-dashboard-pro-react/views/profileStyle';
import Personal from './personal';
import Account from './account';

class Profile extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      confirmPwd: undefined,
      companyName: undefined,
      department: undefined,
      phoneNumber: undefined,
      postCode: undefined,
      firstnameState: '',
      lastnameState: '',
      emailState: '',
      passwordState: '',
      confirmPwdState: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email && this.state.email === undefined) {
      this.setState({
        firstname: nextProps.user.firstname,
        lastname: nextProps.user.lastname,
        email: nextProps.user.email,
        password: nextProps.user.password,
        companyName: nextProps.user.companyName,
        department: nextProps.user.department,
        phoneNumber: nextProps.user.phoneNumber,
        postCode: nextProps.user.postCode,
      })
    }
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
      case 'password': {
        const newState = {
          [`${stateName}State`]: value.length >= 8
            && value.length <= 60
            && validatePassword(value) ? 'success' : 'error',
          [stateName]: value,
        };

        if (this.state.confirmPwd !== undefined) {
          newState.confirmPwdState = value !== '' && value === this.state.confirmPwd ? 'success' : 'error';
        }

        this.setState(newState);
        return;
      }
      case 'confirmPwd':
        this.setState({
          [`${stateName}State`]: value !== '' && value === this.state.password ? 'success' : 'error',
          [stateName]: value,
        });
        return;
      default:
        this.setState({ [stateName]: value })
        return;
    }
  }

  render() {
    const { classes } = this.props;
    const {
      firstnameState,
      lastnameState,
      firstname,
      lastname,
      email,
      emailState,
      passwordState,
      confirmPwdState,
    } = this.state;

    return (
      <React.Fragment>
        <Personal
          classes={classes}
          firstname={firstname}
          firstnameState={firstnameState}
          lastname={lastname}
          lastnameState={lastnameState}
          inputChange={this.change}
        />
        <Account
          email={email}
          emailState={emailState}
          classes={classes}
          inputChange={this.change}
          passwordState={passwordState}
          confirmPwdState={confirmPwdState}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.detail,
});

export default compose(
  connect(mapStateToProps),
  withStyles(profileStyle),
)(Profile);
