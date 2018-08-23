import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import * as Survey from 'survey-react';

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
var survey= ''
class SurveyQuestionnaire extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      "title": "Dummy Survey",
      "description": "Dummy json is used to show survey page",
      "logo": "",
      "data": {
       "pages": [
          {
           "name": "page1",
           "elements": [
            {
             "type": "dropdown",
             "name": "question1",
             "choices": [
              "item1",
              "item2",
              "item3"
             ]
            },
            {
             "type": "radiogroup",
             "name": "question2",
             "choices": [
              "item1",
              "item2",
              "item3"
             ]
            }
           ]
          }
        ]
      },
      admin: false
    }
  }

  componentWillMount(){
    if (window.location.href.indexOf("admin") > -1)
      this.setState({admin: true})
  }

  sendDataToServer(survey) {
   var resultAsString = JSON.stringify(survey.data);
   alert(resultAsString); 
  };

  render() {
    const { classes } = this.props;
    const { title, description, data, logo } = this.state
    survey = new Survey.Model(data);
    survey
      .onComplete
        .add(function (result) {
            var resultAsString = JSON.stringify(result.data);
            alert(resultAsString); 
        });

    if (!this.state.admin){
      // survey.data = {"question1":"abc","question2":"item1"}
      survey.mode = '';
    }
    else{
    survey.mode = 'display';
    }
    return(
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Survey</h4>
              </CardText>
              <Button size="md" href="/" className={classes.buttonDisplay}> 
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
                  <Survey.Survey model={survey} />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
       </GridContainer>
    )
  }
}

SurveyQuestionnaire.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(listPageStyle)(SurveyQuestionnaire);





