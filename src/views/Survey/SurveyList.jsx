import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";

class SurveyList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { surveyList: []}
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
             <CardText color="rose">
                <h4 className={classes.cardTitle}>Survey List</h4>
              </CardText>
              <Button size="sm"  className={classes.buttonDisplay} href="/survey/create"> 
                New Survey
              </Button>
            </CardHeader>
            <CardBody>
              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(listPageStyle)(SurveyList);