import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import SurveyForm from "views/Survey/SurveyForm";
import { createSurvey } from "actions/survey.jsx";
import { Poll } from "@material-ui/icons";
import _ from 'lodash';
import { sessionService } from 'redux-react-session';
import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class SurveyCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = {
      surveyInfo: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        survey: '',
        userId:''
      },
      isSavedSurvey: false,
      titleState: '',
      loading: true,
      descriptionState: '',
      mode: 'create',
      token: ''
    }
    this.changeQuestions = this.changeQuestions.bind(this)
    this.change = this.change.bind(this)

	}

	handleSurvey(option){
    console.log('option: ' + option);
    const {titleState, descriptionState, surveyInfo, isSavedSurvey} = this.state;
    console.log('this.state.surveyInfo: ' + this.state.surveyInfo.survey);
    const {title, description} = surveyInfo;
    console.log('this.state.surveyInfo: ' + this.state.surveyInfo.survey);
    if (_.isEmpty(title))
      this.setState({titleState: "error"})
    if (_.isEmpty(description))
      this.setState({descriptionState: "error"})
    if (titleState === "success" && descriptionState === "success"){
      this.props.createSurvey(this.state.surveyInfo,this.state.token, (response) => {
        window.location = "/admin/survey/list"
      });
    }
	}

  componentWillMount(){
    setTimeout(() => this.setState({ loading: false }), 1500); 
    sessionService.loadSession().then(currentSession =>{
      this.setState({token: currentSession.token})
    })
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
    surveyInfo['survey']= JSON.stringify(event);
    console.log('surveyInfo : ' + surveyInfo['survey']);
    console.log('event : ' + event);
    this.setState({isSavedSurvey:true});
    this.setState({surveyInfo: surveyInfo})
  }

	render(){
		const { classes } = this.props;
		return(
		  <Card>

          <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={70}
          color={'#123abc'}
          loading={this.state.loading}
        />

		    <CardHeader color="rose" text>
          <CardIcon color="rose">
            <Poll />
          </CardIcon>
          <h3 className={classes.cardIconTitle}>Add Survey</h3>
          <Link  to={'/admin/survey/list'} className={classes.linkDisplay} > 
            <u>Back</u>
          </Link>
        </CardHeader>
		    <CardBody>
          <SurveyForm survey={this.state} change={this.change} classes={this.props.classes} changeQuestions={this.changeQuestions}/>
		    </CardBody>
		    <CardFooter className={classes.justifyContentCenter}>
          <Button disabled = {!this.state.isSavedSurvey} color="rose" onClick={this.handleSurvey.bind(this)}>
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