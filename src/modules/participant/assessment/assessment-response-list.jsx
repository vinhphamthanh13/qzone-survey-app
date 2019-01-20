import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReactTooltip from 'react-tooltip';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import {
  Poll,
  OpenInNew,
  CheckCircleOutlined,
  ErrorOutline,
  Cancel as CancelIcon,
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
import { successColor, infoColor, dangerColor } from 'assets/jss/color-theme';
import { getUserFromSession, getTokenFromSession } from '../../../utils/session';
import { eSurveyStatus } from '../../../constants';

const rows = ['#', 'Title', 'Pariticipant name', 'Pariticipant email', 'Action', 'Status'];

class AssessmentResponseList extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    fetchSurveyAnswerByParticipantId: PropTypes.func.isRequired,
    surveyAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    cachedAnswerList: null,
  };

  async componentDidMount() {
    const { userId } = await getUserFromSession();
    const { token } = await getTokenFromSession();
    const { fetchSurveyAnswerByParticipantId: fetchSurveyAnswerByParticipantIdAction } = this.props;
    fetchSurveyAnswerByParticipantIdAction(userId, token);
  }

  componentWillReceiveProps(nextProps) {
    const { surveyAnswers } = nextProps;
    this.setState({ cachedAnswerList: surveyAnswers });
  }

  render() {
    const { classes } = this.props;
    const { cachedAnswerList } = this.state;
    let surveyAnswerList = null;
    if (Object.is(cachedAnswerList, null) || Object.is(cachedAnswerList, undefined)) {
      surveyAnswerList = <Loading isLoading />;
    } else if (cachedAnswerList.length === 0) {
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
              cachedAnswerList.map(({ participant, status, surveyId }, index) => (
                <TableRow key={surveyId}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell>
                    {cachedAnswerList[index].surveyDTO.title}
                  </TableCell>
                  <TableCell>{fullName(participant)}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>
                    {
                      (status === eSurveyStatus.completed || status === eSurveyStatus.expired)
                      && (
                        <Link
                          data-tip="Show Result"
                          to={`/assessment/result/${surveyId}/${participant.id}`}
                        >
                          <OpenInNew style={{ color: `${infoColor}` }} />
                        </Link>
                      )
                    }
                    { status !== eSurveyStatus.completed && <CancelIcon style={{ color: `${dangerColor}` }} />}
                  </TableCell>
                  <TableCell>
                    {status === eSurveyStatus.completed
                      ? <CheckCircleOutlined style={{ color: `${successColor}` }} data-tip="Completed" />
                      : <ErrorOutline color="error" data-tip="Not available" /> }
                  </TableCell>
                  <TableCell>
                    <ReactTooltip className={classes.assessTooltip} />
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
  return { surveyAnswers: state.surveyParticipantAnswer.sResponseByParticipant || [] };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurveyAnswerByParticipantId }),
)(AssessmentResponseList);
