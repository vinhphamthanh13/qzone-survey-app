import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { Poll } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import { formatPhoneNumber } from 'react-phone-number-input';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { classesType } from 'types/global';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import Button from 'components/CustomButtons/Button';
import { toggleLoading } from 'services/api/assessment';
import { fetchMultipleUserType } from 'services/api/user';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import createUserStyle from './create-user.style';
import { eUserType } from '../../constants';
import CreateUserDialog from './create-user-dialog';

class CreateUser extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    userList: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleLoading: PropTypes.func.isRequired,
    fetchMultipleUserType: PropTypes.func.isRequired,
  }

  rowNames = ['#', 'User type', 'First name', 'Last name', 'Email', 'Phone number'];

  constructor(props) {
    super(props);
    this.state = { isDialogOpen: false };
  }

  componentDidMount = () => {
    const {
      toggleLoading: toggleLoadingAction,
      fetchMultipleUserType: fetchMultipleUserTypeAction,
      userList,
    } = this.props;
    if (userList.length === 0) toggleLoadingAction();
    fetchMultipleUserTypeAction([
      { userType: eUserType.assessor },
      { userType: eUserType.sponsor },
    ]);
  }

  componentWillReceiveProps = (nextProps) => {
    const { userList, toggleLoading: toggleLoadingAction } = this.props;
    if (userList.length === 0 && userList.length !== nextProps.userList.length) {
      toggleLoadingAction();
    }
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  }

  onCreateUser = (newUser) => {
    console.log(newUser);
  }

  render() {
    const { classes, userList } = this.props;
    const { isDialogOpen } = this.state;

    return (
      <React.Fragment>
        <CreateUserDialog
          open={isDialogOpen}
          closeDialog={this.closeDialog}
          onCreateUser={this.onCreateUser}
        />
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="rose"><Poll /></CardIcon>
            <div className={classes.header}>
              <h3 className={classes.cardIconTitle}>Users</h3>
              <Button
                color="rose"
                className={classes.createBtn}
                onClick={this.openDialog}
              >
                Create user
              </Button>
            </div>
          </CardHeader>
          <CardBody>
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
                {
                  userList.map(({
                    id, userType, firstname, lastname, email, phoneNumber,
                  }, index) => (
                    <TableRow key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className={classes.userTypeCol}>{userType}</TableCell>
                      <TableCell>{firstname}</TableCell>
                      <TableCell>{lastname}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{formatPhoneNumber(phoneNumber, 'International')}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userList: state.user.userTypeList.map(
    user => ({ ...user, userType: user.userType.toLowerCase() }),
  ),
});

export default compose(
  withStyles({ cardIconTitle: listPageStyle.cardIconTitle, ...createUserStyle }),
  connect(mapStateToProps, { toggleLoading, fetchMultipleUserType }),
)(CreateUser);
