import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Checkbox, Button,
} from '@material-ui/core';
import { Poll, CloudDownloadOutlined } from '@material-ui/icons';
import { formatPhoneNumber } from 'react-phone-number-input';
import {
  PDFDownloadLink, Document,
  Page, Text, View,
} from '@react-pdf/renderer';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import { fetchUserTypeList } from 'services/api/user';
import { classesType } from 'types/global';
import participantListStyle, { docStyles } from './participant-list.style';
import { eUserType, userStatus } from '../../constants';

const rows = ['#', 'First name', 'Last name', 'Phone number'];
const mapRowToUser = ['', 'firstname', 'lastname', 'phoneNumber'];

class ParticipantList extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    fetchUserTypeList: PropTypes.func.isRequired,
    participantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      checkList: [],
    };
  }

  componentDidMount() {
    const { fetchUserTypeList: fetchUserTypeListAction } = this.props;
    fetchUserTypeListAction({ userType: eUserType.participant });
  }

  checkAll = () => {
    const { participantList } = this.props;
    this.setState(oldState => ({
      checkList: oldState.checkList.length === 0
        ? participantList.map(user => user.id)
        : [],
    }));
  }

  checkParticipant = (id) => {
    this.setState(oldState => ({
      checkList: oldState.checkList.includes(id)
        ? oldState.checkList.filter(checkedUserId => checkedUserId !== id)
        : [...oldState.checkList, id],
    }));
  }

  generateDoc = () => {
    const { participantList } = this.props;
    const { checkList } = this.state;
    console.log('object');
    return (
      <Document>
        <Page style={docStyles.docPage}>
          <View
            style={docStyles.docRow}
            render={() => (
              <React.Fragment>
                {rows.map(row => (
                  <Text key={`doc-${row}`}>
                    {row}
                  </Text>
                ))}
                {checkList.length > 0 && mapRowToUser.map((row, index) => {
                  const user = participantList.find(u => u.id === checkList[0]);
                  return (
                    <Text key={`doc-${checkList[0]}-${row}`}>
                      {row ? user[row] : index + 1}
                    </Text>
                  );
                })}
              </React.Fragment>
            )}
          />
        </Page>
      </Document>
    );
  }


  render() {
    const { classes, participantList } = this.props;
    const { checkList } = this.state;

    return (
      participantList && participantList.length >= 0
      && (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="rose"><Poll /></CardIcon>
                <div className={classes.header}>
                  <h3 className={classes.cardIconTitle}>Participants</h3>
                  <PDFDownloadLink
                    className={`${checkList.length === 0 ? classes.disabledDownload : ''}`}
                    document={this.generateDoc()}
                    fileName="participants.pdf"
                  >
                    {({ loading }) => (
                      !loading && (
                        <Button
                          disabled={checkList.length === 0}
                          className={classes.downloadBtn}
                        >
                          <CloudDownloadOutlined className={classes.downloadIcon} />
                          Download participants
                        </Button>
                      )
                    )}
                  </PDFDownloadLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={checkList.length === participantList.length}
                          indeterminate={checkList.length > 0
                            && checkList.length !== participantList.length}
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
                    {
                      participantList.map(({
                        id, firstname, lastname, phoneNumber,
                      }, index) => (
                        <TableRow key={id}>
                          <TableCell>
                            <Checkbox
                              checked={checkList.includes(id)}
                              onChange={() => this.checkParticipant(id)}
                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {firstname}
                          </TableCell>
                          <TableCell>{lastname}</TableCell>
                          <TableCell>{formatPhoneNumber(phoneNumber, 'International')}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )
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
