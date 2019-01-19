import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Checkbox,
} from '@material-ui/core';
import { GroupOutlined as GroupOutlinedIcon } from '@material-ui/icons';
import { formatPhoneNumber } from 'react-phone-number-input';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import { fetchUserTypeList } from 'services/api/user';
import { classesType } from 'types/global';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import participantListStyle from './participant-list.style';
import ParticipantListExcel from './participant-list-excel';
import { eUserType, userStatus } from '../../constants';
import sortBy from '../../utils/sort';

const rows = ['#', 'First name', 'Last name', 'Email', 'Phone number'];

class ParticipantList extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    fetchUserTypeList: PropTypes.func.isRequired,
    participantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkList: [],
      cachedParticipantList: null,
    };
  }

  componentDidMount() {
    const { fetchUserTypeList: fetchUserTypeListAction } = this.props;
    fetchUserTypeListAction({ userType: eUserType.participant });
  }

  componentWillReceiveProps(nextProps) {
    const { participantList } = nextProps;
    this.setState({ cachedParticipantList: participantList });
  }

  checkAll = () => {
    const { participantList } = this.props;
    const { checkList } = this.state;
    const listLen = checkList.length;
    let newCheckList = participantList.map(user => user.id);
    if (listLen === newCheckList.length) {
      newCheckList = [];
    }
    this.setState({ checkList: newCheckList });
  };

  checkParticipant = (id) => {
    this.setState(oldState => ({
      checkList: oldState.checkList.includes(id)
        ? oldState.checkList.filter(checkedUserId => checkedUserId !== id)
        : [...oldState.checkList, id],
    }));
  };

  render() {
    const { classes } = this.props;
    const { checkList, cachedParticipantList } = this.state;
    let listParticipant = null;
    if (Object.is(cachedParticipantList, null) || Object.is(cachedParticipantList, undefined)) {
      listParticipant = <Loading isLoading />;
    } else if (cachedParticipantList.length === 0) {
      listParticipant = <CustomInfo content="There is no Participant in list." />;
    } else {
      listParticipant = (
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  className={classes.deleteAllChecked}
                  checked={checkList.length === cachedParticipantList.length}
                  indeterminate={checkList.length > 0
                  && checkList.length !== cachedParticipantList.length}
                  onChange={this.checkAll}
                />
              </TableCell>
              {rows.map(row => (
                <TableCell key={row}>
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortBy(cachedParticipantList, 'firstname').map(({
              id, firstname, lastname, email, phoneNumber,
            }, index) => (
              <TableRow key={id}>
                <TableCell>
                  <Checkbox
                    className={classes.deleteAllChecked}
                    checked={checkList.includes(id)}
                    onChange={() => this.checkParticipant(id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {firstname}
                </TableCell>
                <TableCell>{lastname}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{formatPhoneNumber(phoneNumber, 'International')}</TableCell>
              </TableRow>))
            }
          </TableBody>
        </Table>);
    }
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="rose"><GroupOutlinedIcon /></CardIcon>
              <div className={`${classes.header} ${checkList.length === 0 ? classes.disabledDownload : ''}`}>
                <h3 className={classes.cardIconTitle}>Participants</h3>
                <ParticipantListExcel
                  checkList={checkList}
                  classes={classes}
                  participantList={cachedParticipantList || []}
                />
              </div>
            </CardHeader>
            <CardBody>
              {listParticipant}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  const participantList = state.user.userTypeList.filter(
    user => user.userStatus !== userStatus.unconfirmed,
  );
  return { participantList };
}

export default compose(
  withStyles({ ...listPageStyle, ...participantListStyle }),
  connect(mapStateToProps, { fetchUserTypeList }),
)(ParticipantList);
