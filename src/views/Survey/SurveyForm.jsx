import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import * as Survey from 'survey-react';
import CardFooter from "components/Card/CardFooter.jsx";

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
var survey= ''
class SurveyForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      data: {
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
      }
    }
  }

  sendDataToServer(survey) {
   var resultAsString = JSON.stringify(survey.data);
   alert(resultAsString); 
  };

  render() {
    const { classes } = this.props;

    survey = new Survey.Model(this.state.data);
    survey
      .onComplete
        .add(function (result) {
            var resultAsString = JSON.stringify(result.data);
            alert(resultAsString); 
        });

    survey.mode = 'display';
    // survey.data = {"question1":"abc","question2":"item1"}
    return(
      <GridContainer>
       <GridItem xs={12}>
         <Card>
            <CardHeader color="primary" icon>
             <CardText color="rose">
                <h4 className={classes.cardTitle}>Survey</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <h4>Title:</h4>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <p>
                    
                  </p>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <h4>Logo:</h4>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <p>
                    
                  </p>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <h4>Description:</h4>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <p>
                    
                  </p>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <h4>Assesor Category:</h4>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <p>
                    
                  </p>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <h4>Assesor: </h4>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <p>
                    
                  </p>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={7}>
                  <Survey.Survey model={survey} />
                </GridItem>
              </GridContainer>
             </CardBody>
             <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" >
                Update
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
       </GridContainer>
    )
  }
}


SurveyForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(listPageStyle)(SurveyForm);





