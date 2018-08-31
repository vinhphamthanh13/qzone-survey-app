import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {fetchSurveys, deleteSurvey,deleteAllSurvey} from "actions/survey"

const rows = ["#","Name", "Description", "", ""]
class ParticipantList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { participantList: [],
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({surveyList: nextProps.surveyList})
  // }

  // componentWillMount(){
  //   this.props.fetchSurveys()
  // }

  render() {
    const { classes } = this.props;
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
               <CardText color="rose">
                  <h4 className={classes.cardTitle}>Participant List</h4>
                </CardText>
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
                  
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    
  }
}

function mapStateToProps(state) {
  return{surveyList: state.surveys.data}
}  

ParticipantList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurveys, deleteSurvey, deleteAllSurvey}),
)(ParticipantList);
 