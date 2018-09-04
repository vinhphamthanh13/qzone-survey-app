import React from "react";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import {Table, TableBody, TableCell, TableHead, TableRow, Checkbox} from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import {fetchSurveys, deleteSurvey,deleteAllSurvey} from "actions/survey"

const rows = ["Title", "Description", "", ""]
class SurveyList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { surveyList: [],
      sweetAlert: '',
      deleteAll: false
    }
    this.successDelete = this.successDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyList: nextProps.surveyList})
  }

  componentWillMount(){
    this.props.fetchSurveys()
  }

  warningWithConfirmMessage(id) {
    var SID=""
    if(id){
      SID=id
    }
    this.setState({
      sweetAlert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(SID)}
          onCancel={() => this.setState({sweetAlert: ''})}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover the Survey!
        </SweetAlert>
      ),
    deleteAll: false
    });
  }

  successDelete(SID) {
    var api = ""
    if(SID){
      api = this.props.deleteSurvey
    }
    else
      api= this.props.deleteAllSurvey
    api(SID, (response) => {
      this.setState({
        sweetAlert: (
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() => 
              this.setState({sweetAlert: ''}
            )}
            onCancel={() => this.setState({sweetAlert: ''})}
            confirmBtnCssClass={
              this.props.classes.success
            }
          >
            Survey has been deleted.
          </SweetAlert>
        )
      });
      this.props.fetchSurveys()
    })
  }

  render() {
    const { classes } = this.props;
      if (!this.state.surveyList)
        return null;
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
                      <TableCell>
                        <Checkbox
                          checked={this.state.deleteAll || false}
                          onChange= {(event)=>this.setState({deleteAll: !this.state.deleteAll})}
                        />
                      </TableCell>
                      {rows.map((row,index) => {
                        return (
                          <TableCell
                            key={index}
                          >
                            {row}
                          </TableCell>
                        );
                      }, this)}
                      <TableCell>
                        {this.state.deleteAll && <Link to="#" onClick={()=> this.warningWithConfirmMessage("")}>Delete All</Link>}
                      </TableCell>
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
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{n.title}</TableCell>
                            <TableCell>{n.description}</TableCell>
                            <TableCell><Link to={`/admin/survey/show/${n.id}`}>Show</Link></TableCell>
                            <TableCell><Link to="#" onClick={()=> this.warningWithConfirmMessage(n.id)}>Delete</Link></TableCell>
                            <TableCell><Link to={`/admin/survey/participants/${n.id}`}>Participants</Link></TableCell>
                            <TableCell/>
                          </TableRow>
                        )
                    })}
                  </TableBody>
                </Table>
                {this.state.sweetAlert}
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

SurveyList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchSurveys, deleteSurvey, deleteAllSurvey}),
)(SurveyList);
 