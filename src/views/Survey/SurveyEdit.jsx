import React from 'react';
import { Route } from 'react-router-dom'
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
import SurveyForm from "views/Survey/SurveyForm"
import { fetchSurvey, editSurvey } from "actions/survey.jsx";
import _ from 'lodash';

var SID = ''
class SurveyEdit extends React.Component{
	constructor(props){
    super(props);
    this.state = {
      surveyInfo: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        id: '',
        survey: ''
      },
      titleState: '',
      descriptionState: '',
      mode: 'edit'
    }
    this.changeQuestions = this.changeQuestions.bind(this)
    this.change = this.change.bind(this)
  }

  componentWillMount(){
    SID = this.props.match.params.id
    this.setState({edit: true})
    this.props.fetchSurvey(SID);
  }

  componentWillReceiveProps(nextProps) {
    const { surveyInfo } = this.state;
    for(var key in nextProps.survey) {
      if(key === 'survey' && nextProps.survey.survey !== '')
        surveyInfo[key]= JSON.parse(nextProps.survey.survey)
      else
        surveyInfo[key]= nextProps.survey[key]
    };
    this.setState({surveyInfo: surveyInfo})
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
    surveyInfo['survey']= JSON.stringify(event)
    this.setState({surveyInfo: surveyInfo})
  }


  handleSurveyUpdate(option){
    const {titleState, descriptionState, surveyInfo} = this.state
    const {title, description} = surveyInfo
    surveyInfo['survey']= JSON.stringify(this.state.surveyInfo.survey)
    this.setState({surveyInfo: surveyInfo})
    if (_.isEmpty(title))
      this.setState({titleState: "error"})
    if (_.isEmpty(description))
      this.setState({descriptionState: "error"})
    if (titleState !== "error" && descriptionState !== "error"){
      this.props.editSurvey(this.state.surveyInfo, (response) => {
        window.location = "/admin/survey/list"
      });
    }
  }

	render() {
    const { classes } = this.props;
    if(!this.state.surveyInfo)
      return null;
		return(
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Edit Survey</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <SurveyForm survey={this.state}  change={this.change} changeQuestions={this.changeQuestions} classes={this.props.classes}/>
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
        <Route render={({ history}) => (
            <Button
              color="rose"
              onClick={() => { history.push(`/admin/survey/show/${SID}`) }}
            >
              Back 
            </Button>
          )}/>
        	<Button color="rose" onClick={this.handleSurveyUpdate.bind(this)}>
            Update
          </Button>
        </CardFooter>
      </Card>
		)
	}
}

SurveyEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{survey: state.surveys.data}
} 

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps,{fetchSurvey,editSurvey})
)(SurveyEdit);

