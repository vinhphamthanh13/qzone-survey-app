import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import { fetchSurvey } from 'services/api/assessment';
import { fetchSurveyParticipantResponse } from 'services/api/assessment-response';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
import { sessionService } from 'redux-react-session';
import Button from 'components/CustomButtons/Button';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter';
import CardHeader from 'components/Card/CardHeader';
import { Poll } from '@material-ui/icons';
import fullName from 'utils/fullName';
import { classesType, matchType, historyType } from 'types/global';

let surveyInfo = '';
class AssessmentResponseResult extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    match: matchType.isRequired,
    history: historyType.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    fetchSurveyParticipantResponse: PropTypes.func.isRequired,
    survey: PropTypes.objectOf(PropTypes.object).isRequired,
    participantAnswer: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  componentWillMount() {
    const {
      match: { params: { sid, pid } }, fetchSurvey: fetchSurveyAction,
      fetchSurveyParticipantResponse: fetchSurveyParticipantResponseAction,
    } = this.props;
    sessionService.loadSession().then((currentSession) => {
      fetchSurveyAction(sid, currentSession.token);
      fetchSurveyParticipantResponseAction(pid, sid, currentSession.token);
    });
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/participant/assessment/answers');
  }

  render() {
    const { classes, survey: surveyDetail, participantAnswer } = this.props;
    if (!participantAnswer || !participantAnswer.questionAnswers
      || !surveyDetail || !surveyDetail.user) {
      return <div>Participant is not associated with this survey</div>;
    }

    const {
      title, description, survey, user,
    } = surveyDetail;
    surveyInfo = new Survey.Model(survey);
    surveyInfo.mode = 'display';
    surveyInfo.data = JSON.parse(participantAnswer.questionAnswers);
    return (
      <div className={classes.content}>
        <div className={classes.container} style={{ width: '983px' }}>
          <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="rose">
                    <Poll />
                  </CardIcon>
                  <h3 className={classes.cardIconTitle}>Assessments result</h3>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Title:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <h4>{title}</h4>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Logo:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <img src={surveyDetail.logo} alt="survey logo" />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Description:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <h4>
                        {description}
                      </h4>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Assessor:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <h4>
                        {fullName(user)}
                      </h4>
                    </GridItem>
                  </GridContainer>
                  <hr />
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <Survey.Survey model={surveyInfo} />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    onClick={this.goBack}
                  >
                    Go To Assessment Response List
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { survey: state.surveys.detail, participantAnswer: state.surveyParticipantAnswer.data };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey, fetchSurveyParticipantResponse }),
)(AssessmentResponseResult);
