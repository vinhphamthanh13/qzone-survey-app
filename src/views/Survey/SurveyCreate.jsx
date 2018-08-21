import React from 'react';
import PropTypes from "prop-types";
// import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, MenuItem, FormControl, Select }  from "@material-ui/core";  
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox.jsx';
import SurveyEditor from 'views/Survey/SurveyEditor.jsx';
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
// import { createProvider } from 'actions/provider';
import _ from 'lodash';

class SurveyCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = {
      survey: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        assessorCategory: '',
        assessor: '',
        questions: ''
      },
      titleState: '',
      descriptionState: '' 
    }
    this.changeQuestions = this.changeQuestions.bind(this)
	}

	handleService(option){
    console.log(this.state)
    const {titleState, descriptionState, survey} = this.state
    const {title, description} = survey
		if (_.isEmpty(title))
      this.setState({titleState: "error"})
    if (_.isEmpty(description))
      this.setState({descriptionState: "error"})
    if (titleState === "success" && descriptionState === "success")
      window.location = "/survey/list"
	}

	change(event, stateName){
    if (_.isEmpty(event.target.value))
      this.setState({[stateName + "State"]: "error"})
    else {
      this.setState({ [stateName + "State"]: "success" });
    }
    const { survey } = this.state
    survey[stateName]= (event.target.value || event.target.checked)
    this.setState({survey: survey})
	}

  changeQuestions(event)
  {
    const { survey } = this.state
    survey['questions']= event
    this.setState({survey: survey})
  }

	render(){
		const { classes } = this.props;
    const categoryList = []
		return(
		  <Card>
		    <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Add a Survey</h4>
          </CardText>
        </CardHeader>
		    <CardBody>
		    	<form>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <FormLabel className={classes.labelHorizontal}>
                  *Title
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <CustomInput
                	labelText="Title"
                  success={this.state.titleState === "success"}
                  error={this.state.titleState === "error"}
                  id="title"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                  	onChange: event =>
                    	this.change(event, "title"),
                    type: "text"
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <FormLabel className={classes.labelHorizontal}>
                	*Description
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <CustomInput
                  labelText="Description"
                  success={this.state.descriptionState === "success"}
                  error={this.state.descriptionState === "error"}
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "description"),
                    type: "text"
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <FormLabel className={classes.labelHorizontal}>
                  Logo
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <CustomInput
                  id="address1"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "logo"),
                    type: "file"
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <FormLabel
                  className={
                    classes.labelHorizontal +
                    " " +
                    classes.labelHorizontalRadioCheckbox
                  }
                >
                  Privacy
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <CustomCheckbox 
                  value=""
                  checked={this.state.survey.privacy || false}
                  label="" 
                  onClick={event =>this.change(event, "privacy")}
                  classes={classes}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <FormLabel className={classes.labelHorizontal}>
                  Assessor Category
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                >
                  <Select
                    value={this.state.survey.assessorCategory}
                    onChange={event =>
                      this.change(event, "assessorCategory")}
                    classes={{ select: classes.select }}
                  > 
                    {categoryList.map(category => (
                      <MenuItem
                        key={category}
                        value={category}
                        
                      >
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>                  
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <FormLabel className={classes.labelHorizontal}>
                  Assessor
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <CustomInput
                	labelText="Assessor"
                  id="assessor"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                  	onChange: event =>
                    	this.change(event, "assessor"),
                    type: "text"
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
            </GridContainer>
          </form>
		    </CardBody>
		    <CardFooter className={classes.justifyContentCenter}>
          <Button color="rose" onClick={this.handleService.bind(this)}>
            Save & Exit
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
  withStyles(validationFormStyle)
)(SurveyCreate);