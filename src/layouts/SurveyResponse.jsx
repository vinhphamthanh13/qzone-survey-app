import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "assets/img/register.jpeg";
import ParticipantResponseCreate from "views/Participant/ParticipantResponseCreate.jsx";
import ParticipantResponseResult from "views/Participant/ParticipantResponseResult.jsx";
import {checkAuth} from 'actions/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';

class SurveyResponse extends React.Component {
  state = {
    isLoggedIn: true
  };

  componentWillMount(){
    this.props.checkAuth('abc',response=>{
      if (response===false)
        this.setState({isLoggedIn: false})
    });
  }

  render() {
    const { classes } = this.props;
    if (!this.state.isLoggedIn) {
      return <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location.pathname }
        }}
      />
    }
    return (
      <div>
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
            <Switch>
              <Route
                path="/surveys/result/:sid"
                component={ParticipantResponseResult}
                key={'ParticipantResponseResult'}
              />
              <Route
                path="/surveys/:id"
                component={ParticipantResponseCreate}
                key={'ParticipantResponseCreate'}
              />
            </Switch>
            <div
              className={classes.fullPageBackground}
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

SurveyResponse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(pagesStyle),
  connect(null,{checkAuth})
)(SurveyResponse);