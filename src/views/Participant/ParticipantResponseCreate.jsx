import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { fetchSurvey } from "actions/survey.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
import { sessionService } from 'redux-react-session';
import { createSurveyAnswer } from 'actions/surveyAnswer.jsx';

var surveyInfo= '';
var id= ''

class ParticipantResponseCreate extends React.Component {
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
      },
      userId:''
    }
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  componentWillMount(){
    id  = this.props.match.params.id
    this.props.fetchSurvey(id);
    sessionService.loadUser().then(currentUser => {
      console.log(currentUser)
      console.log("**************ww")
      this.setState({userId: currentUser})})
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyData: nextProps.survey})
  }

  sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    this.setState({participantResponse: {participantId: this.state.userId, surveyId: id, questionAnswers: resultAsString}},() =>{
      this.props.createSurveyAnswer(this.state.participantResponse, (response) => {
        console.log("0000000000000")
        console.log(response)
        // window.location = "/surveys/result/"+id
      });
    })
  };

  render() {
    const { classes } = this.props;
    const {title, description, survey} = this.state.surveyData
    surveyInfo = new Survey.Model(survey);
    console.log("*************")
    console.log(this.state.userId)
    if(!this.state.surveyData)
      return null
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
                  <hr/>
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <Survey.Survey model={surveyInfo} className={classes.buttonDisplay} onComplete={this.sendDataToServer}/>
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

ParticipantResponseCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{survey: state.surveys.data}
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurvey, createSurveyAnswer}),
)(ParticipantResponseCreate);