import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { fetchSurvey } from "actions/survey.jsx";
import { fetchSurveyParticipantResponse } from "actions/surveyAnswer.jsx"
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';

var surveyInfo= '';
var sid= ''
var pid= ''
class ParticipantResponseResult extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      surveyData: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        id: '',
        survey: {}
      },
      participantResponse: {
        participantId: '',
        surveyId: '',
        questionAnswers: ''
      }
    }
  }

  componentWillMount(){
    sid  = this.props.match.params.sid;
    pid = this.props.match.params.pid || '5'
    this.props.fetchSurvey(sid);
    this.props.fetchSurveyParticipantResponse(pid,sid)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyData: nextProps.survey, participantResponse: nextProps.participantAnswer })
  }

  render() {
    const { classes } = this.props;
    const { surveyData,participantResponse } = this.state
    
    if (participantResponse === undefined || participantResponse.questionAnswers === "" || !surveyData || participantResponse === "")
      return <h1>Not Available</h1>;
    else{
      const {title, description, survey} = surveyData
      surveyInfo = new Survey.Model(survey);
      surveyInfo.mode = 'display';
      surveyInfo.data=JSON.parse(participantResponse.questionAnswers)
      return(
        <div className={classes.content}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>{title}</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        <div className={classes.center}>
                          {description}
                        </div>
                        <form className={classes.form}>
                          <Survey.Survey model={surveyInfo} />
                        </form>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      )
    }
  }
}

ParticipantResponseResult.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{survey: state.surveys.data, participantAnswer: state.surveyParticipantAnswer.data}
}

export default compose(
  withStyles(registerPageStyle),
  connect(mapStateToProps, {fetchSurvey,fetchSurveyParticipantResponse}),
)(ParticipantResponseResult);