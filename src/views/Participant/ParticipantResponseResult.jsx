import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import { fetchSurvey } from "actions/survey.jsx";
import { fetchSurveyParticipantResponse } from "actions/surveyAnswer.jsx"
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
import { sessionService } from 'redux-react-session';
import Button from "components/CustomButtons/Button.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { Poll } from "@material-ui/icons";
import { Route } from 'react-router-dom';
import { fullName } from 'variables/FullName.jsx';

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
        survey: {},
        user: ''
      },
      participantResponse: {
        participantId: '',
        surveyId: '',
        questionAnswers: ''
      },
      token: ''
    }
  }

  componentWillMount(){
    console.log(this.props)
    sid  = this.props.match.params.sid;
    sessionService.loadUser().then(currentUser => {
      pid = currentUser
    })
    sessionService.loadSession().then(currentSession =>{
      this.setState({token: currentSession.token}, () => {
        this.props.fetchSurvey(sid, this.state.token);
        this.props.fetchSurveyParticipantResponse(pid,sid,this.state.token)
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyData: nextProps.survey, participantResponse: nextProps.participantAnswer })
  }

  render() {
    const { classes } = this.props;
    const { surveyData,participantResponse } = this.state
    if (participantResponse === undefined || participantResponse.questionAnswers === "" ||  !surveyData || surveyData.user === "" || participantResponse === "")
      return <div>Participant is not associated with this survey</div>;
    else{
      const {title, description, survey,user} = surveyData
      surveyInfo = new Survey.Model(survey);
      surveyInfo.mode = 'display';
      surveyInfo.data=JSON.parse(participantResponse.questionAnswers)
      return(
        <div className={classes.content}>
          <div className={classes.container} style={{width: '983px'}}>
            <GridContainer>
              <GridItem xs={12}>
                <Card>
                  <CardHeader color="primary" icon>
                    <CardIcon color="rose">
                      <Poll />
                    </CardIcon>
                    <h3 className={classes.cardIconTitle}>Survey Result</h3>
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
                        <img src={surveyData.logo
                        }/>
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
                    <hr/>
                    <GridContainer>
                      <GridItem xs={12} sm={10}>
                        <Survey.Survey model={surveyInfo} />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                  <Route render={({ history}) => (
                    <Button
                      color="rose"
                      onClick={() => { history.push(`/admin/survey/participants/${sid}`) }}
                    >
                      Go To Participant List 
                    </Button>
                  )}/>
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

ParticipantResponseResult.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{survey: state.surveys.data, participantAnswer: state.surveyParticipantAnswer.data}
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurvey,fetchSurveyParticipantResponse}),
)(ParticipantResponseResult);

