import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import pagesStyle from 'assets/jss/material-dashboard-pro-react/layouts/pagesStyle';
import bgImage from 'assets/img/register.jpeg';
import AssessmentResponseCreate from 'modules/participant/assessment/assessment-response-create';
import AssessmentResponseResult from 'modules/participant/assessment/assessment-response-result';
import { checkAuth } from 'services/api/user';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { classesType, locationType } from 'types/global';

class AssessmentResponse extends React.Component {
  propTypes = {
    classes: classesType.isRequired,
    checkAuth: PropTypes.func.isRequired,
    location: locationType.isRequired,
  }

  state = {
    isLoggedIn: true,
  };

  componentWillMount() {
    const { checkAuth: checkAuthAction } = this.props;
    checkAuthAction((response) => {
      if (response === false) { this.setState({ isLoggedIn: false }); }
    });
  }

  render() {
    const { classes, location } = this.props;
    const { isLoggedIn } = this.state;

    if (!isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location.pathname },
          }}
        />
      );
    }
    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.fullPage}>
            <Switch>
              <Route
                exact
                strict
                path="/assessment/result/:sid/:pid"
                component={AssessmentResponseResult}
                key="AssessmentResponseResult"
              />
              <Route
                exact
                strict
                path="/surveys/:id"
                component={AssessmentResponseCreate}
                key="AssessmentResponseCreate"
              />
            </Switch>
            <div
              className={classes.fullPageBackground}
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(pagesStyle),
  connect(null, { checkAuth }),
)(AssessmentResponse);
