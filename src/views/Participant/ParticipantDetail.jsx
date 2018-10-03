import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import { sessionService } from 'redux-react-session';
import { fetchUserByUserId } from "actions/auth.jsx";
import { fullName } from "variables/FullName.jsx";

var sid = '';
var pid = '';
class ParticipantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: ''
    }
  }
  componentWillMount() {
    sid = this.props.match.params.sid
    pid = this.props.match.params.pid
    sessionService.loadSession().then(currentSession => {
      this.setState({ token: currentSession.token }, () => {
        this.props.fetchUserByUserId(pid, this.state.token)
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user })
  }

  render() {
    const { classes } = this.props;
    if (!this.state.user)
      return null
    const { email, companyName, department, phoneNumber } = this.state.user
    return (
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Participant Detail</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <GridContainer className={classes.justifyContentCenter}>
            <GridItem xs={12} sm={3}>
              <h4>Name:</h4>
            </GridItem>
            <GridItem xs={12} sm={7}>
              <h4>{fullName(this.state.user)}</h4>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.justifyContentCenter}>
            <GridItem xs={12} sm={3}>
              <h4>Email:</h4>
            </GridItem>
            <GridItem xs={12} sm={7}>
              <h4>{email}</h4>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.justifyContentCenter}>
            <GridItem xs={12} sm={3}>
              <h4>Company Name:</h4>
            </GridItem>
            <GridItem xs={12} sm={7}>
              <h4>{companyName}</h4>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.justifyContentCenter}>
            <GridItem xs={12} sm={3}>
              <h4>Department Name:</h4>
            </GridItem>
            <GridItem xs={12} sm={7}>
              <h4>{department}</h4>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.justifyContentCenter}>
            <GridItem xs={12} sm={3}>
              <h4>Phone Number:</h4>
            </GridItem>
            <GridItem xs={12} sm={7}>
              <h4>{phoneNumber}</h4>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
          <Button color="rose" href={`/admin/survey/participants/${sid}`}>
            Back To Participant List
          </Button>
        </CardFooter>
      </Card>
    )
  }
}

ParticipantDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { user: state.user.detail }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchUserByUserId })
)(ParticipantDetail);

