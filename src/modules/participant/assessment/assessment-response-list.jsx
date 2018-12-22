import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import {
  Poll,
  OpenInNew,
  CheckCircleOutlined,
  ErrorOutline,
} from '@material-ui/icons';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import { fetchSurveyAnswerByParticipantId } from 'services/api/assessment-response';
import fullName from 'utils/fullName';
import { classesType } from 'types/global';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import { getUserFromSession, getTokenFromSession } from '../../../utils/session';
import { eSurveyStatus } from '../../../constants';

const rows = ['#', 'Title', 'Pariticipant name', 'Pariticipant email', 'Action', 'Status'];

class AssessmentResponseList extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    fetchSurveyAnswerByParticipantId: PropTypes.func.isRequired,
    surveyAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  async componentDidMount() {
    const { userId } = await getUserFromSession();
    const { token } = await getTokenFromSession();
    const { fetchSurveyAnswerByParticipantId: fetchSurveyAnswerByParticipantIdAction } = this.props;
    fetchSurveyAnswerByParticipantIdAction(userId, token);
  }

  render() {
    const { classes, surveyAnswers } = this.props;
    let surveyAnswerList = null;
    if (Object.is(surveyAnswers, null) || Object.is(surveyAnswers, undefined)) {
      surveyAnswerList = <Loading isLoading />;
    } else if (surveyAnswers.length === 0) {
      surveyAnswerList = <CustomInfo content="You have no Assessment at the moment!" />;
    } else {
      surveyAnswerList = (
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {rows.map(row => (
                <TableCell key={row}>
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              surveyAnswers.map(({ participant, status, surveyId }, index) => (
                <TableRow key={surveyId}>
                  <TableCell padding="checkbox" className={classes.order}>{index + 1}</TableCell>
                  <TableCell>
                    {surveyAnswers[index].surveyDTO.title}
                  </TableCell>
                  <TableCell>{fullName(participant)}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>
                    <Link to={status === eSurveyStatus.completed
                    || status === eSurveyStatus.expired
                      ? `/assessment/result/${surveyId}/${participant.id}`
                      : `/participant/assessment/${surveyId}`
                    }
                    >
                      <OpenInNew titleAccess="Open survey" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {status === eSurveyStatus.completed
                      ? <CheckCircleOutlined style={{ color: '#4caf50' }} titleAccess="Completed" />
                      : <ErrorOutline color="error" titleAccess="Not available" /> }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      );
    }
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="rose">
                <Poll />
              </CardIcon>
              <h3 className={classes.cardIconTitle}>Assessments</h3>
            </CardHeader>
            <CardBody>
              {surveyAnswerList}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>);
  }
}

function mapStateToProps(state) {
  return { surveyAnswers: state.surveyParticipantAnswer.sResponseByParticipant };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurveyAnswerByParticipantId }),
)(AssessmentResponseList);
