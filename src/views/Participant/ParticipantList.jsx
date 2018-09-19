import React from "react";
import { Route } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import CardFooter from "components/Card/CardFooter.jsx";
import {fetchSurveyParticipantList} from "actions/surveyAnswer";
import { Poll } from "@material-ui/icons";

const rows = ["#","Name", "Description", "", ""]
var sid=''
class ParticipantList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { participantList: [],
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({surveyList: nextProps.surveyList})
  // }

  componentWillMount(){
    sid  = this.props.match.params.sid
    this.props.fetchSurveyParticipantList(sid)
  }

  render() {
    const { classes } = this.props;
    console.log("@@@@@@@@2")
    console.log(this.props.surveyParticipantList)
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="rose">
                  <Poll />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>Participant List</h3>
                <Link  to={'/admin/survey/list'} className={classes.linkDisplay} > 
                  <u>Back</u>
                </Link>
              </CardHeader>
              <CardBody>
                <p>This page shows dummy data only</p>
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
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Raj</TableCell>
                      <TableCell>ah cbhd dhsdc ahh</TableCell>
                      <TableCell><Link to={`/admin/survey/p_result/${sid}/${5}`}>Result</Link></TableCell>
                      <TableCell><Link to={`/admin/survey/p_detail/${sid}/${5}`}>Details</Link></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Ana</TableCell>
                      <TableCell>ah cbhd dhsdc ahh</TableCell>
                      <TableCell><Link to={`/admin/survey/p_result/${sid}/${6}`}>Result</Link></TableCell>
                      <TableCell><Link to={`/admin/survey/p_detail/${sid}/${6}`}>Details</Link></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Route render={({ history}) => (
                  <Button
                    color="rose"
                    onClick={() => { history.push('/admin/survey/list') }}
                  >
                    Back 
                  </Button>
                )}/>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      );
    
  }
}

function mapStateToProps(state) {
  console.log("&&&&&&&&&&")
  console.log(state)
  return{surveyParticipantList: state.surveyParticipantAnswer.data}
}  

ParticipantList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurveyParticipantList}),
)(ParticipantList);
 