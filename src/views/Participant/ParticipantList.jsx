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
import { sessionService } from 'redux-react-session';
import { fullName } from 'variables/FullName';

const rows = ["#","Name", "Email", "", ""]
var sid=''
class ParticipantList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { participantList: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({participantList: nextProps.surveyParticipantList})
  }

  componentWillMount(){
    sid  = this.props.match.params.sid
    sessionService.loadSession().then(currentSession =>{
      this.setState({token: currentSession.token}, () => {
        this.props.fetchSurveyParticipantList(sid,this.state.token)
      })
    })
  }

  render() {
    const { classes } = this.props;
      if (!this.state.participantList)
        return null
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="rose">
                  <Poll />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>Participant List</h3>
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
                    {
                      (this.state.participantList).map((participant,index) =>{
                        return(
                          <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{fullName(participant)}</TableCell>
                            <TableCell>{participant.email}</TableCell>
                            <TableCell><Link to={`/admin/survey/p_result/${sid}/${participant.id}`}>Result</Link></TableCell>
                            <TableCell><Link to={`/admin/survey/p_detail/${sid}/${participant.id}`}>Details</Link></TableCell>
                          </TableRow>
                        )
                      })
                    }
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
  return{surveyParticipantList: state.surveyParticipantAnswer.data}
}  

ParticipantList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurveyParticipantList}),
)(ParticipantList);
 