import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AuthHeader from 'components/Header/AuthHeader';
import authRoutes from 'routes/auth';
import pagesStyle from 'assets/jss/material-dashboard-pro-react/layouts/pagesStyle';
import bgImage from 'assets/img/register.jpeg';
import ReactLoader from 'modules/react-loader';
import { classesType } from 'types/global';

const Auth = ({ classes, userLoading, ...rest }) => (
  <div>
    {userLoading && <ReactLoader loading={userLoading} />}
    <AuthHeader {...rest} />
    <div className={classes.wrapper}>
      <div className={classes.fullPage}>
        <Switch>
          {authRoutes.map(route => (
            <Route
              exact
              strict
              path={route.path}
              component={route.component}
              key={route.path}
            />
          ))}
        </Switch>
        <div
          className={classes.fullPageBackground}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>
    </div>
  </div>
);


Auth.propTypes = {
  classes: classesType.isRequired,
  userLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { userLoading: state.user.loading };
}

export default compose(
  connect(mapStateToProps),
  withStyles(pagesStyle),
)(Auth);
