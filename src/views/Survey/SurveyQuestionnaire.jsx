import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import * as Survey from 'survey-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSurvey } from "actions/survey.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';

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
        survey: ''
      }
    }
  }

  componentWillMount(){
    const { id } = this.props.match.params
    this.props.fetchSurvey(id);
    if (window.location.href.indexOf("admin") > -1)
      this.setState({admin: true})
  }

  componentWillReceiveProps(nextProps) {
    const { surveyData } = this.state;
    if(nextProps.survey){
      for(var key in nextProps.survey) {
        if(key === 'survey')
          surveyData[key]= JSON.parse(nextProps.survey.survey)
        else
          surveyData[key]= nextProps.survey[key]
      };
      this.setState({surveyData: surveyData})
    }
  }

  sendDataToServer(survey) {
   var resultAsString = JSON.stringify(survey.data);
   alert(resultAsString); 
  };

  render() {
    const { classes } = this.props;
    const { title, description, survey, logo } = this.state.surveyData
    surveyInfo = new Survey.Model(survey);
    surveyInfo
      .onComplete
        .add(function (result) {
            var resultAsString = JSON.stringify(result.data);
            alert(resultAsString); 
        });

    if (!this.state.admin){
      // survey.data = {"question1":"abc","question2":"item1"}
      surveyInfo.mode = '';
    }
    else{
    surveyInfo.mode = 'display';
    }
    return(
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Survey</h4>
              </CardText>
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
              <hr/>
              <GridContainer>
                <GridItem xs={12} sm={10}>
                  <Survey.Survey model={surveyInfo} />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" href='/admin/survey/list'>
                Back To Survey List
              </Button>
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
  return{survey: state.surveys.data}
} 

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurvey}),
)(SurveyQuestionnaire);



