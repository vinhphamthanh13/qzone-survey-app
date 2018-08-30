import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "assets/img/register.jpeg";
import ParticipantResponseCreate from "views/Participant/ParticipantResponseCreate.jsx";
import ParticipantResponseResult from "views/Participant/ParticipantResponseResult.jsx";

class SurveyResponse extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
            <Switch>
              <Route
                path="/surveys/result/:id"
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

export default withStyles(pagesStyle)(SurveyResponse);
