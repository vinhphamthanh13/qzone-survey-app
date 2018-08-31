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
var id= ''

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
    id  = this.props.match.params.id
    this.props.fetchSurvey(id);
    this.props.fetchSurveyParticipantResponse('1',id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyData: nextProps.survey, participantResponse: nextProps.participantAnswer })
  }

  render() {
    const { classes } = this.props;
    const { surveyData,participantResponse } = this.state
    const {title, description, survey} = surveyData
    surveyInfo = new Survey.Model(survey);
    surveyInfo.mode = 'display';
    if(surveyData === undefined)
      return null
    if (participantResponse === undefined || participantResponse.questionAnswers === '')
      return null;
    else{
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