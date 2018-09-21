import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import * as Survey from 'survey-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSurvey } from "actions/survey.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Poll } from "@material-ui/icons";
import { sessionService } from 'redux-react-session';
import { fullName } from 'variables/FullName.jsx';
import { Route } from 'react-router-dom';

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
var surveyInfo= ''
class SurveyQuestionnaire extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      surveyData: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        id: '',
        survey: '',
        token: '',
        user: ''
      },
      assessorName:''
    }
  }

  componentWillMount(){
    const { id } = this.props.match.params
    sessionService.loadSession().then(currentSession =>{
      this.setState({token: currentSession.token}, () => {
        this.props.fetchSurvey(id,this.state.token)
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    const { surveyData } = this.state;
    if(nextProps.survey){
      for(var key in nextProps.survey) {
        if(key === 'survey' && nextProps.survey.survey !== ''){
          surveyData[key]= JSON.parse(nextProps.survey['survey'])
        }
        else
          surveyData[key]= nextProps.survey[key]
      };
      this.setState({surveyData: surveyData})
    }
  }

  render() {
    const { classes } = this.props;
    const { title, description, survey, logo,user } = this.state.surveyData
    surveyInfo = new Survey.Model(survey);
    surveyInfo.mode = 'display';
    return(
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="rose">
                <Poll />
              </CardIcon>
              <h3 className={classes.cardIconTitle}>Survey</h3>
              <Button size="md" href={`/admin/survey/edit/${this.props.match.params.id}`} className={classes.buttonDisplay}> 
                Edit
              </Button>
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
                  <img src={logo}/>
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
                onClick={() => { history.push('/admin/survey/list') }}
              >
                Back 
              </Button>
            )}/>
            </CardFooter>
          </Card>
        </GridItem>
       </GridContainer>
    )
  }
}

SurveyQuestionnaire.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{survey: state.surveys.data, user: state.user.data}
} 

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurvey}),
)(SurveyQuestionnaire);



