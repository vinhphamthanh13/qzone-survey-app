import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import { compose } from 'redux';
import AuthHeader from "components/Header/AuthHeader.jsx";
import authRoutes from "routes/auth.jsx";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "assets/img/register.jpeg";
import ReactLoader from 'modules/react-loader';

class Auth extends React.Component {
  render() {
    const { classes, userLoading, ...rest } = this.props;
    return (
      <div>
        {userLoading && <ReactLoader loading={userLoading} />}
        <AuthHeader {...rest} />
        <div className={classes.wrapper}>
          <div className={classes.fullPage}>
            <Switch>
              {authRoutes.map((route) => {
                return (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={route.path}
                  />
                );
              })}
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

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
  userLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { userLoading: state.user.loading };
}

export default compose(
  connect(mapStateToProps),
  withStyles(pagesStyle),
)(Auth);
