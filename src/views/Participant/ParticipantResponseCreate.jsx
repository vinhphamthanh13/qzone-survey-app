import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { fetchSurvey } from "actions/survey.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
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
      }
    }
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  componentWillMount(){
    id  = this.props.match.params.id
    this.props.fetchSurvey(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyData: nextProps.survey})
  }

  sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    this.setState({participantResponse: {participantId: '1', surveyId: id, questionAnswers: resultAsString}},() =>{
      this.props.createSurveyAnswer(this.state.participantResponse, (response) => {
        window.location = "/surveys/result/"+id
        // window.location = "/"
      });
    })
  };

  render() {
    const { classes } = this.props;
    const {title, description, survey} = this.state.surveyData
    surveyInfo = new Survey.Model(survey);
    
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
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <div className={classes.center}>
                        {description}
                      </div>
                      <form className={classes.form}>
                        <Survey.Survey model={surveyInfo} onComplete={this.sendDataToServer} />
                      </form>
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
  withStyles(registerPageStyle),
  connect(mapStateToProps, {fetchSurvey, createSurveyAnswer}),
)(ParticipantResponseCreate);