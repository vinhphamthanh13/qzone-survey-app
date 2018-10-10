import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import listPageStyle from "assets/jss/material-dashboard-pro-react/modules/listPageStyle";
import { fetchSurvey } from "services/api/assessment";
import { fetchSurveyParticipantResponse } from "services/api/assessment-response"
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
import { sessionService } from 'redux-react-session';
import Button from "components/CustomButtons/Button";
import CardIcon from "components/Card/CardIcon";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import { Poll } from "@material-ui/icons";
import { fullName } from 'variables/FullName';

var surveyInfo = '';
var sid = ''
var pid = ''

class AssessmentResponseResult extends React.Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }
  goBack(){
    this.props.history.push('/participant/assessment/assessment-responses');
 }
  componentWillMount() {
    sid = this.props.match.params.sid;
    pid = this.props.match.params.pid;
    sessionService.loadSession().then(currentSession => {
      this.props.fetchSurvey(sid, currentSession.token);
      this.props.fetchSurveyParticipantResponse(pid, sid, currentSession.token)
    })
  }

  render() {
    const { classes, survey: surveyDetail, participantAnswer } = this.props;
    if (!participantAnswer || !participantAnswer.questionAnswers || !surveyDetail || !surveyDetail.user)
      return <div>Participant is not associated with this survey</div>;
    else {
      const { title, description, survey, user } = surveyDetail;
      surveyInfo = new Survey.Model(survey);
      surveyInfo.mode = 'display';
      surveyInfo.data = JSON.parse(participantAnswer.questionAnswers)
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
                      onClick={this.goBack}  >
                      Go To Assessment Response List
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      )
    }
  }
}

AssessmentResponseResult.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { survey: state.surveys.detail, participantAnswer: state.surveyParticipantAnswer.data }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey, fetchSurveyParticipantResponse }),
)(AssessmentResponseResult);

