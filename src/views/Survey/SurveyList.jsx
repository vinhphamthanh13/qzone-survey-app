import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";
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
    console.log(classes)
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
             <CardText color="rose">
                <h4 className={classes.cardTitle}>Survey List</h4>
              </CardText>
              <Button size="md"  className={classes.buttonDisplay} href="/survey/create"> 
                New Survey
              </Button>
            </CardHeader>
            <CardBody>
              <Table
                striped
                tableHead={[
                  "#",
                  "Title",
                  "Description"
                ]}
                tableData={[]}
                // customCellClasses={[
                //   classes.center,
                //   classes.right,
                //   classes.right
                // ]}
                // customClassesForCells={[0, 5, 6]}
                // customHeadCellClasses={[
                //   classes.center,
                //   classes.right,
                //   classes.right
                // ]}
                // customHeadClassesForCells={[0, 5, 6]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

SurveyList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(listPageStyle)(SurveyList);