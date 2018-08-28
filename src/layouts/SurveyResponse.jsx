import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
// import authRoutes from "routes/auth.jsx";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "assets/img/register.jpeg";
import ParticipantResponse from "views/Participant/ParticipantResponse.jsx"
class SurveyResponse extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
            <Switch>
              <Route
                path="/surveys/:id"
                component={ParticipantResponse}
                key={'ParticipantResponse'}
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
