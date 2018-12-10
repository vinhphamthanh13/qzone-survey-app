import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton,
} from '@material-ui/core';
import { Group as GroupIcon } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import { formatPhoneNumber } from 'react-phone-number-input';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Alert from 'react-s-alert';
import { classesType } from 'types/global';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import Button from 'components/CustomButtons/Button';
import {
  fetchMultipleUserType,
  registerUser, fetchUserTypeListActionCreator,
  updateUser, updateUserActionCreator, deleteUser, deleteUserActionCreator,
} from 'services/api/user';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SweetAlert from 'react-bootstrap-sweetalert';
import buttonStyle from 'assets/jss/material-dashboard-pro-react/components/buttonStyle';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import createUserStyle from './create-user.style';
import { eUserType } from '../../constants';
import CreateUserDialog from './create-user-dialog';

class CreateUser extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    userList: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchMultipleUserTypeAction: PropTypes.func.isRequired,
    registerUserAction: PropTypes.func.isRequired,
    fetchUserTypeListAction: PropTypes.func.isRequired,
    updateUserAction: PropTypes.func.isRequired,
    updateUserRequestAction: PropTypes.func.isRequired,
    deleteUserAction: PropTypes.func.isRequired,
    deleteUserRequestAction: PropTypes.func.isRequired,
  };

  rowNames = ['User type', 'First name', 'Last name', 'Email', 'Phone number', 'Actions'];

  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      editedUser: null,
      deletedUser: null,
    };
  }

  componentDidMount = () => {
    const {
      fetchMultipleUserTypeAction,
    } = this.props;
    fetchMultipleUserTypeAction([
      { userType: eUserType.assessor },
      { userType: eUserType.sponsor },
    ]);
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ isDialogOpen: false, editedUser: null });
  };

  onCreateUser = (newUser) => {
    const {
      registerUserAction, fetchUserTypeListAction, updateUserAction, updateUserRequestAction,
    } = this.props;
    const { editedUser } = this.state;

    if (editedUser) {
      updateUserRequestAction(newUser, (response) => {
        if (response) {
          if (response.status !== 200) {
            Alert.error(response.data.message);
          } else {
            Alert.success('User was updated successfully');
            updateUserAction(newUser);
          }
        }
      });
    } else {
      registerUserAction(newUser, (response) => {
        if (response) {
          if (response.status !== 201) {
            Alert.error(response.data.message);
          } else {
            Alert.success('User was created successfully');
            fetchUserTypeListAction({ data: [response.data] });
          }
        }
      });
    }
  };

  editUser = (user) => {
    this.setState({ isDialogOpen: true, editedUser: user });
  };

  deleteUser = (user) => {
    this.setState({ deletedUser: user });
  };

  confirmDelete = () => {
    const {
      deleteUserAction, deleteUserRequestAction,
    } = this.props;
    const { deletedUser } = this.state;

    deleteUserRequestAction({ email: deletedUser.email }, (response) => {
      if (response) {
        if (response.status !== 200) {
          Alert.error(response.data.message);
        } else {
          Alert.success('User was deleted successfully');
          this.setState({ deletedUser: null });
          deleteUserAction(deletedUser);
        }
      }
    });
  };

  cancelDelete = () => {
    this.setState({ deletedUser: null });
  };

  render() {
    const { classes, userList } = this.props;
    const { isDialogOpen, editedUser, deletedUser } = this.state;
    let listUser = null;
    if (Object.is(userList, null) || Object.is(userList, undefined)) {
      listUser = <Loading isLoading />;
    } else if (userList.length === 0) {
      listUser = <CustomInfo content="There is no User added." />;
    } else {
      listUser = (
        <Table>
          <TableHead>
            <TableRow>
              {this.rowNames.map(row => (
                <TableCell key={row}>
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map(user => (
              <TableRow key={user.id}>
                <TableCell className={classes.userTypeCol}>{user.userType}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatPhoneNumber(user.phoneNumber, 'International')}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => this.editUser(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.deleteUser(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>);
    }
    return (
      <React.Fragment>
        <CreateUserDialog
          open={isDialogOpen}
          closeDialog={this.closeDialog}
          onCreateUser={this.onCreateUser}
          editedUser={editedUser}
        />
        <SweetAlert
          title="Delete User"
          warning
          showCancel
          show={deletedUser !== null}
          onConfirm={this.confirmDelete}
          onCancel={this.cancelDelete}
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
          cancelBtnCssClass={`${classes.button} ${classes.danger}`}
          confirmBtnText="Delete anyway"
          cancelBtnText="Cancel"
        >
          {`Do you want to delete ${deletedUser ? deletedUser.userType.toLowerCase() : ''} `}
          <code>{`${deletedUser ? deletedUser.email : ''}`}</code>
          {' ?'}
        </SweetAlert>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="rose"><GroupIcon /></CardIcon>
            <div className={classes.header}>
              <h3 className={classes.cardIconTitle}>Users</h3>
              <Button
                color="rose"
                className={classes.createBtn}
                onClick={this.openDialog}
              >
                New user
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            { listUser }
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userList: state.user.userTypeList,
});

export default compose(
  withStyles({ ...buttonStyle, cardIconTitle: listPageStyle.cardIconTitle, ...createUserStyle }),
  connect(mapStateToProps, {
    fetchMultipleUserTypeAction: fetchMultipleUserType,
    registerUserAction: registerUser,
    fetchUserTypeListAction: fetchUserTypeListActionCreator,
    updateUserRequestAction: updateUser,
    updateUserAction: updateUserActionCreator,
    deleteUserRequestAction: deleteUser,
    deleteUserAction: deleteUserActionCreator,
  }),
)(CreateUser);
