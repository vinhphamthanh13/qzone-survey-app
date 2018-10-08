import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateEmail from 'utils/validateEmail';
import validatePassword from 'utils/validatePassword';
import Personal from './personal';
import Account from './account';

class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      email: props.user.email,
      password: props.user.password,
      companyName: props.user.companyName,
      department: props.user.department,
      phoneNumber: props.user.phoneNumber,
      postCode: props.user.postCode,
      confirmPwd: undefined,
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
      });
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
    const {
      firstnameState,
      lastnameState,
      firstname,
      lastname,
      email,
      emailState,
      passwordState,
      confirmPwdState,
      companyName,
      department,
      phoneNumber,
      postCode,
    } = this.state;

    return (
      <React.Fragment>
        {firstname !== undefined && <Personal
          firstname={firstname}
          firstnameState={firstnameState}
          lastname={lastname}
          lastnameState={lastnameState}
          inputChange={this.change}
          companyName={companyName}
          department={department}
          phoneNumber={phoneNumber}
          postCode={postCode}
        />}
        {email !== undefined && <Account
          email={email}
          emailState={emailState}
          inputChange={this.change}
          passwordState={passwordState}
          confirmPwdState={confirmPwdState}
        />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.detail,
});

export default connect(mapStateToProps)(Profile);
