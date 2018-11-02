import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import pagesStyle from 'assets/jss/material-dashboard-pro-react/layouts/pagesStyle';
import bgImage from 'assets/img/register.jpeg';
import AssessmentResponseCreate from 'modules/participant/assessment/assessment-response-create';
import AssessmentResponseResult from 'modules/participant/assessment/assessment-response-result';
import { fetchUserByUserId } from 'services/api/user';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  classesType, locationType, userDetailType,
} from 'types/global';
import { getUserFromSession } from 'utils/session';
import { eUserType } from '../constants';

class AssessmentResponse extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    location: locationType.isRequired,
    user: userDetailType.isRequired,
    fetchUserByUserIdAction: PropTypes.func.isRequired,
  }

  state = {
    isLoggedIn: true,
  };

  async componentDidMount() {
    const { fetchUserByUserIdAction, user } = this.props;

    if (!user || !user.userType) {
      const { userId } = await getUserFromSession();
      if (!userId) {
        this.setState({ isLoggedIn: false });
      } else {
        fetchUserByUserIdAction(userId);
      }
    }
  }

  render() {
    const { classes, location, user } = this.props;
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

    if (user && user.userType && user.userType !== eUserType.participant) {
      return (<Redirect to="/" />);
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

const mapStateToProps = state => ({ user: state.user.detail });

export default compose(
  withStyles(pagesStyle),
  connect(mapStateToProps, { fetchUserByUserIdAction: fetchUserByUserId }),
)(AssessmentResponse);
