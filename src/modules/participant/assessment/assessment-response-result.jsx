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
import Loading from 'components/Loader/Loading';
import { Poll } from '@material-ui/icons';
import { classesType, matchType, historyType } from 'types/global';
import CustomLogo from 'components/CustomLogo/CustomLogo';

let surveyInfo = '';
class AssessmentResponseResult extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    match: matchType.isRequired,
    history: historyType.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    fetchSurveyParticipantResponse: PropTypes.func.isRequired,
    survey: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    participantAnswer: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  };

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
  };

  render() {
    const { classes, survey: surveyDetail, participantAnswer } = this.props;
    let assessmentResult = null;
    if (!participantAnswer || !participantAnswer.questionAnswers
      || !surveyDetail || !surveyDetail.user) {
      assessmentResult = <Loading isLoading />;
    } else {
      const {
        title, description, survey, logo,
      } = surveyDetail;
      surveyInfo = new Survey.Model(survey);
      surveyInfo.mode = 'display';
      surveyInfo.data = JSON.parse(participantAnswer.questionAnswers);
      assessmentResult = (
        <React.Fragment>
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
              <CustomLogo logo={logo} />
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
          <hr />
          <GridContainer>
            <GridItem xs={12} sm={10}>
              <Survey.Survey model={surveyInfo} />
            </GridItem>
          </GridContainer>
        </React.Fragment>
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
              <h3 className={classes.cardIconTitle}>Assessments result</h3>
            </CardHeader>
            <CardBody>
              {assessmentResult}
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
    );
  }
}

function mapStateToProps(state) {
  return {
    survey: state.surveys.detail,
    participantAnswer: state.surveyParticipantAnswer.data,
  };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey, fetchSurveyParticipantResponse }),
)(AssessmentResponseResult);
