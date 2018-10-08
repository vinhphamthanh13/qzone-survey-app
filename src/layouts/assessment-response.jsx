import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "assets/img/register.jpeg";
import AssessmentResponseCreate from "modules/participant/assessment/assessment-response-create";
import AssessmentResponseResult from "modules/participant/assessment/assessment-response-result";
import { checkAuth } from 'services/api/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Storage } from 'react-jhipster';
import { surveyLocalData } from "../constants"
var surveyId = '';

class AssessmentResponse extends React.Component {
  state = {
    isLoggedIn: true
  };

  componentWillMount() {
    if (Storage.local.get(surveyLocalData.SURVEY_ID)) {
      surveyId = Storage.local.get(surveyLocalData.SURVEY_ID);
    }

    this.props.checkAuth(response => {
      if (response === false)
        this.setState({ isLoggedIn: false })
    });
  }

  render() {
    const { classes } = this.props;
    if (!this.state.isLoggedIn) {
      console.log('redirect');
      return <Redirect
        to={{
          pathname: '/login',
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
                path="/participant/assessment/result/:sid/:pid"
                component={AssessmentResponseResult}
                key={'AssessmentResponseResult'}
              />
              <Route
                path="/surveys/:id"
                component={AssessmentResponseCreate}
                key={'AssessmentResponseCreate'}
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

AssessmentResponse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(pagesStyle),
  connect(null, { checkAuth })
)(AssessmentResponse);