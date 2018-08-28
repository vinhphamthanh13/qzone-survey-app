import React from 'react';
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import SurveyForm from "views/Survey/SurveyForm";
import { createSurvey } from "actions/survey.jsx";
import _ from 'lodash';

class SurveyCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = {
      surveyInfo: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        survey: ''
      },
      titleState: '',
      descriptionState: '',
      mode: 'create'
    }
    this.changeQuestions = this.changeQuestions.bind(this)
    this.change = this.change.bind(this)

	}

	handleSurvey(option){
    const {titleState, descriptionState, surveyInfo} = this.state
    const {title, description} = surveyInfo
		if (_.isEmpty(title))
      this.setState({titleState: "error"})
    if (_.isEmpty(description))
      this.setState({descriptionState: "error"})
    if (titleState === "success" && descriptionState === "success"){
      this.props.createSurvey(this.state.surveyInfo, (response) => {
        window.location = "/admin/survey/list"
      });
    }
	}

	change(event, stateName){
    if (_.isEmpty(event.target.value))
      this.setState({[stateName + "State"]: "error"})
    else {
      this.setState({ [stateName + "State"]: "success" });
    }
    const { surveyInfo } = this.state
    surveyInfo[stateName]= (event.target.value || event.target.checked)
    this.setState({surveyInfo: surveyInfo})
	}

  changeQuestions(event)
  {
    const { surveyInfo } = this.state
    surveyInfo['survey']= event
    this.setState({surveyInfo: surveyInfo})
  }

	render(){
		const { classes } = this.props;
		return(
		  <Card>
		    <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Add a Survey</h4>
          </CardText>
        </CardHeader>
		    <CardBody>
          <SurveyForm survey={this.state} change={this.change} classes={this.props.classes} changeQuestions={this.changeQuestions}/>
		    </CardBody>
		    <CardFooter className={classes.justifyContentCenter}>
          <Button color="rose" onClick={this.handleSurvey.bind(this)}>
            Submit Survey
          </Button>
        </CardFooter>
		  </Card>
		);
	}
}

SurveyCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(validationFormStyle),
  connect(null,{createSurvey})
)(SurveyCreate);