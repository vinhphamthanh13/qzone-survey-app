import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { sessionService } from 'redux-react-session';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/registerPageStyle';
import { fetchSurvey } from 'services/api/assessment';
import * as Survey from 'survey-react';
import { createSurveyResponse, fetchResponseByAssessmentAndParticipantId } from 'services/api/assessment-response';
import { classesType, historyType, matchType } from 'types/global';
import { eSurveyStatus } from '../../../constants';

let surveyInfo = '';

class AssessmentResponseCreate extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    match: matchType.isRequired,
    surveyData: PropTypes.objectOf(PropTypes.any).isRequired,
    history: historyType.isRequired,
    fetchSurveyAction: PropTypes.func.isRequired,// eslint-disable-line
    createSurveyResponseAction: PropTypes.func.isRequired,
    assessmentResponse: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired, // eslint-disable-line
    fetchResponseByAssessmentAndParticipantIdAction: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,// eslint-disable-line
  };

  constructor(props) {
    super(props);
    this.state = {
      participantResponse: {
        participantId: '',
        surveyId: '',
        questionAnswers: '',
        status: 'COMPLETED',
      },
      userId: '',
    };
  }

  componentDidMount() {
    const {
      match: { params: { id } },
      fetchResponseByAssessmentAndParticipantIdAction,
    } = this.props;
    sessionService.loadUser().then((currentUser) => {
      this.setState({ userId: currentUser.userId });
      fetchResponseByAssessmentAndParticipantIdAction(id, currentUser.userId);
    });
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      match: { params: { id } },
      fetchSurveyAction,
      assessmentResponse,
      surveyData,
    } = nextProps;
    const { history } = this.props;

    if (assessmentResponse && assessmentResponse.status
      && assessmentResponse.status === eSurveyStatus.completed) {
      history.push('/');
    } else if (Object.keys(surveyData).length === 0) {
      fetchSurveyAction(id);
    }
  };

  sendDataToServer = (survey) => {
    let resultAsString = survey.data;
    if (typeof (resultAsString) !== 'string') {
      resultAsString = JSON.stringify(survey.data);
    }

    const {
      match: { params: { id } },
      createSurveyResponseAction,
    } = this.props;
    this.setState(oldState => ({
      participantResponse: {
        participantId: oldState.userId, status: 'COMPLETED', surveyId: id, questionAnswers: resultAsString,
      },
    }), () => {
      const { participantResponse, userId } = this.state;
      createSurveyResponseAction(participantResponse, (response) => {
        if (response.status === 201) {
          window.location = `/assessment/result/${id}/${userId}`;
        } else {
          window.location = '/participant/assessment/answers';
        }
      });
    });
  };

  render() {
    const { classes, surveyData } = this.props;
    if (!surveyData) { return null; }
    const { title, description, survey } = surveyData;
    surveyInfo = new Survey.Model(survey);
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>{title}</h2>
                <CardBody>
                  <div className={classes.center}>
                    {description}
                  </div>
                  <hr />
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <Survey.Survey
                        model={surveyInfo}
                        className={classes.buttonDisplay}
                        onComplete={this.sendDataToServer}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveyData: state.surveys.detail,
    loading: state.user.loading,
    assessmentResponse: state.surveyParticipantAnswer.assessmentResponse,
  };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {
    fetchSurveyAction: fetchSurvey,
    createSurveyResponseAction: createSurveyResponse,
    fetchResponseByAssessmentAndParticipantIdAction: fetchResponseByAssessmentAndParticipantId,
  }),
)(AssessmentResponseCreate);
