import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateEmail from 'utils/validateEmail';
import { updateProfile } from 'services/api/profile';
import { resetPassword, forceResetPasswordStatus } from 'services/api/user';
import ForceChangePassword from 'modules/auth/force-change-password';
import { userDetailType } from 'types/global';
import Account from './account';
import Personal from './personal';

class Profile extends React.Component {
  static defaultProps = {
    forceResetPasswordStatus: null,
    isDefaultPwdChanged: false,
  };

  static propTypes = {
    user: userDetailType.isRequired,
    updateProfile: PropTypes.func.isRequired,
    forceResetPasswordStatus: PropTypes.func,
    isDefaultPwdChanged: PropTypes.bool,
  };

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

  componentDidMount() {
    const { isDefaultPwdChanged } = this.props;
    this.setState({
      openResetPasswordStatus: isDefaultPwdChanged,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { account: { email } } = this.state;
    const { isDefaultPwdChanged } = this.props;
    if (email === undefined && nextProps.user.email) {
      this.setState(prevState => ({
        openResetPasswordStatus: isDefaultPwdChanged,
        id: nextProps.user.id,
        personal: {
          ...prevState.personal,
          firstname: nextProps.user.firstname,
          lastname: nextProps.user.lastname,
          companyName: nextProps.user.companyName,
          department: nextProps.user.department,
          phoneNumber: nextProps.user.phoneNumber,
          postCode: nextProps.user.postCode,
        },
        account: {
          ...prevState.account,
          email: nextProps.user.email,
        },
      }));
    } else {
      this.setState({
        openResetPasswordStatus: isDefaultPwdChanged,
      });
    }
  }

  change = (event, stateName, type) => {
    const { value } = event.target;

    switch (type) {
      case 'name':
        this.setState(prevState => ({
          personal: {
            ...prevState.personal,
            [`${stateName}State`]: value.length > 0 ? 'success' : 'error',
            [stateName]: value,
          },
        }));
        return;
      case 'email':
        this.setState(prevState => ({
          account: {
            ...prevState.account,
            [`${stateName}State`]: validateEmail(value) ? 'success' : 'error',
            [stateName]: value,
          },
        }));
        return;
      default:
        this.setState(prevState => ({ personal: { ...prevState.personal, [stateName]: value } }));
    }
  };

  saveProfile = () => {
    const {
      id,
      account: { ...accountInfo },
      personal: { ...personalInfo },
    } = this.state;
    const { updateProfile: updateProfileAction, toggleLoading: toggleLoadingAction } = this.props;
    updateProfileAction({ id, ...accountInfo, ...personalInfo });
    toggleLoadingAction();
  };

  resetPersonalInfo = (oldPersonalInfo) => {
    this.setState({ personal: oldPersonalInfo });
  };

  resetAccount = (oldAccount) => {
    this.setState({ account: oldAccount });
  };

  handleClose = () => {
    const { forceResetPasswordStatus: forceResetAction } = this.props;
    forceResetAction(false);
  };

  render() {
    const {
      personal,
      account,
      account: { email },
      openResetPasswordStatus,
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
        {email !== undefined && (
          <Account
            {...account}
            inputChange={this.change}
            saveProfile={this.saveProfile}
            resetAccount={this.resetAccount}
            resetPassword={resetPasswordAction}
          />
        )}
        {email !== undefined && (
          <ForceChangePassword
            openChangePassword={openResetPasswordStatus}
            closeChangePassword={this.handleClose}
            email={email}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.detail,
  isDefaultPwdChanged: state.user.isDefaultPwdChanged,
});

export default connect(mapStateToProps, {
  updateProfile,
  resetPassword,
  forceResetPasswordStatus,
})(Profile);
