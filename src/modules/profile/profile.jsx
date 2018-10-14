import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateEmail from 'utils/validateEmail';
import { updateProfile } from 'services/api/profile';
import { resetPassword } from 'services/api/auth';
import { toggleLoading } from 'services/api/assessment';
import Account from './account';
import Personal from './personal';

class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.object, PropTypes.string,
    ])).isRequired,
    updateProfile: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id,
      personal: {
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        companyName: props.user.companyName,
        department: props.user.department,
        phoneNumber: props.user.phoneNumber,
        postCode: props.user.postCode,
        firstnameState: '',
        lastnameState: '',
      },
      account: {
        email: props.user.email,
        emailState: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { account: { email } } = this.state;
    if (email === undefined && nextProps.user.email) {
      this.setState(oldState => ({
        id: nextProps.user.id,
        personal: {
          ...oldState.personal,
          firstname: nextProps.user.firstname,
          lastname: nextProps.user.lastname,
          companyName: nextProps.user.companyName,
          department: nextProps.user.department,
          phoneNumber: nextProps.user.phoneNumber,
          postCode: nextProps.user.postCode,
        },
        account: {
          ...oldState.account,
          email: nextProps.user.email,
        },
      }));
    }
  }

  change = (event, stateName, type) => {
    const { value } = event.target;

    switch (type) {
      case 'name':
        this.setState(oldState => ({
          personal: {
            ...oldState.personal,
            [`${stateName}State`]: value.length > 0 ? 'success' : 'error',
            [stateName]: value,
          },
        }));
        return;
      case 'email':
        this.setState(oldState => ({
          account: {
            ...oldState.account,
            [`${stateName}State`]: validateEmail(value) ? 'success' : 'error',
            [stateName]: value,
          },
        }));
        return;
      default:
        this.setState(oldState => ({ personal: { ...oldState.personal, [stateName]: value } }));
    }
  }

  saveProfile = () => {
    const {
      id,
      account: { emailState, ...accountInfo },
      personal: { firstnameState, lastnameState, ...personalInfo },
    } = this.state;
    const { updateProfile: updateProfileAction, toggleLoading: toggleLoadingAction } = this.props;
    updateProfileAction({ id, ...accountInfo, ...personalInfo });
    toggleLoadingAction();
  }

  resetPersonalInfo = (oldPersonalInfo) => {
    this.setState({ personal: oldPersonalInfo });
  }

  resetAccount = (oldAccount) => {
    this.setState({ account: oldAccount });
  }

  render() {
    const {
      personal,
      account,
    } = this.state;
    const { resetPassword: resetPasswordAction } = this.props;

    return (
      <React.Fragment>
        {personal.firstname !== undefined && (
          <Personal
            {...personal}
            inputChange={this.change}
            saveProfile={this.saveProfile}
            resetPersonalInfo={this.resetPersonalInfo}
          />
        )}
        {account.email !== undefined && (
          <Account
            {...account}
            inputChange={this.change}
            saveProfile={this.saveProfile}
            resetAccount={this.resetAccount}
            resetPassword={resetPasswordAction}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.detail,
});

export default connect(mapStateToProps, { updateProfile, resetPassword, toggleLoading })(Profile);
