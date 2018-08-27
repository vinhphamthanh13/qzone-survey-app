import React from "react";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import {fetchSurveys} from "actions/survey.jsx"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const rows = ["","Title", "Description"]

class SurveyList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { surveyList: []}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyList: nextProps.surveyList})
  }

  componentWillMount(){
    this.props.fetchSurveys()
  }
  render() {
    const { classes } = this.props;
    if(!(this.state.surveyList.length > 0)){
      return null;
    }
    else{
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
               <CardText color="rose">
                  <h4 className={classes.cardTitle}>Survey List</h4>
                </CardText>
                <Button size="md"  className={classes.buttonDisplay} href="/admin/survey/create"> 
                  New Survey
                </Button>
              </CardHeader>
              <CardBody>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      {rows.map((row,index) => {
                        
                        return (
                          <TableCell
                            key={index}
                          >
                            {row}
                          </TableCell>
                        );
                      }, this)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.surveyList)
                      .map((n,index) => {
                        return(
                          <TableRow
                            hover
                            key={index}
                          >
                            <TableCell >
                              {index+1}
                            </TableCell>
                            <TableCell >{n.title}</TableCell>
                            <TableCell >{n.description}</TableCell>
                            <TableCell><Link to="/admin/survey/show">Show</Link></TableCell>
                          </TableRow>
                        )
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }
  }
}

function mapStateToProps(state) {
  return{surveyList: state.surveys.data}
}  

SurveyList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurveys}),
)(SurveyList);
