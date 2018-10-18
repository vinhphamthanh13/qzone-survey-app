import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/registerPageStyle';
import { fetchSurvey } from 'services/api/assessment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
import { sessionService } from 'redux-react-session';
import { createSurveyResponse } from 'services/api/assessment-response';
import { Storage } from 'react-jhipster';
import { classesType, historyType, matchType } from 'types/global';

const SURVEY_ID = 'SurveyId';
let surveyInfo = '';

class AssessmentResponseCreate extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    match: matchType.isRequired,
    survey: PropTypes.objectOf(PropTypes.object).isRequired,
    history: historyType.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    createSurveyResponse: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      surveyData: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        id: '',
        survey: {},
      },
      participantResponse: {
        participantId: '',
        surveyId: '',
        questionAnswers: '',
        status: 'COMPLETED',
      },
      userId: '',
      token: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchSurvey: fetchSurveyAction } = this.props;
    if (id !== '' || id !== null) {
      Storage.local.set(SURVEY_ID, id);
    }
    sessionService.loadUser().then((currentUser) => {
      this.setState({ userId: currentUser.userId });
    });
    sessionService.loadSession().then((currentSession) => {
      this.setState({ token: currentSession.token }, () => {
        fetchSurveyAction(id, currentSession.token);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ surveyData: nextProps.survey });
  }

  sendDataToServer = (survey) => {
    let resultAsString = survey.data;
    if (typeof (resultAsString) !== 'string') {
      resultAsString = JSON.stringify(survey.data);
    }

    const {
      match: { params: { id } },
      createSurveyResponse: createSurveyResponseAction, history,
    } = this.props;
    this.setState(oldState => ({
      participantResponse: {
        participantId: oldState.userId, status: 'COMPLETED', surveyId: id, questionAnswers: resultAsString,
      },
    }), () => {
      const { participantResponse, token, userId } = this.state;
      createSurveyResponseAction(participantResponse, token, (response) => {
        if (response.status === 201) {
          history.push(`/assessment/result/${id}/${userId}`);
        } else {
          // back to assessment response list
          history.push('/participant/assessment/assessment-responses');
        }
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { surveyData } = this.state;
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
  return { survey: state.surveys.detail };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey, createSurveyResponse }),
)(AssessmentResponseCreate);
