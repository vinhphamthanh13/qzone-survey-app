import React from "react";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import {Table, TableBody, TableCell, TableHead, TableRow, Checkbox} from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import {fetchSurveys, deleteSurvey,deleteAllSurvey} from "actions/survey";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { Person, Delete, FileCopy, Poll } from "@material-ui/icons";
import { sessionService } from 'redux-react-session';
import ReactTooltip from 'react-tooltip';

const iconStyle = {
  marginRight: 30
};

class SurveyList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { surveyList: [],
      sweetAlert: '',
      deleteAll: false,
      token: ''
    }
    this.successDelete = this.successDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({surveyList: nextProps.surveyList})
  }

  componentWillMount(){
    sessionService.loadSession().then(currentSession =>{
      this.setState({token: currentSession.token}, () => {
        this.props.fetchSurveys(this.state.token)
      })
    })
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

  handleClick(e) {
    e.preventDefault();
    Alert.closeAll()
    Alert.info('Copied', {
      position: 'bottom-right',
      effect: 'bouncyflip'
    });
}

  render() {
    const { classes } = this.props;
      if (!this.state.surveyList)
        return null;
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Poll />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>Survey List</h3>
                <Button size="md"  className={classes.buttonDisplay} href="/admin/survey/create"> 
                  New Survey
                </Button>
              </CardHeader>
              <CardBody>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      <TableCell  >
                        <Checkbox
                          checked={this.state.deleteAll || false}
                          onChange= {(event)=>this.setState({deleteAll: !this.state.deleteAll})}
                        />
                      </TableCell>
                      <TableCell
                        key={'title'}
                      >
                        Title
                      </TableCell>
                      <TableCell />
                      <TableCell>
                        {this.state.deleteAll && <Link to="#" data-tip='Delete' onClick={()=> this.warningWithConfirmMessage("")}><Delete/></Link>}
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
                            <TableCell >{index+1}</TableCell>
                            <TableCell ><Link data-tip='Show' to={`/admin/survey/show/${n.id}`}>{n.title}</Link></TableCell>
                            <TableCell >
                              <Link style={iconStyle} data-tip='Delete' to="#" onClick={()=> this.warningWithConfirmMessage(n.id) }><Delete/></Link>
                              <Link style={iconStyle} data-tip='Participants' to={`/admin/survey/participants/${n.id}`}><Person/></Link>
                              <CopyToClipboard text={`http://13.211.215.72:3000/surveys/${n.id}`} 
                              >
                                <Link data-tip='Copy Link'  to="#" onClick={this.handleClick}><FileCopy/></Link>
                              </CopyToClipboard>
                            </TableCell>
                            <TableCell>
                              <ReactTooltip />
                            </TableCell>
                          </TableRow>
                        )
                    })}
                  </TableBody>
                </Table>
                {this.state.sweetAlert}
                <Alert stack={true}/>
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
 