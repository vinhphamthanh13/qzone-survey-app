import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
import PerfectScrollbar from "perfect-scrollbar";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactLoader from 'modules/react-loader';
import { commonRoutes, adminRoutes, assessorRoutes, otherRoutes, participantRoutes } from "routes/dashboard.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Header from "components/Header/Header.jsx";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import logo from "assets/img/logo-white.svg";
import { checkAuth, fetchUserByUserId } from 'services/api/auth';
import { getUserFromSession } from 'utils/session';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { eUserType } from "../constants";
import { surveyLocalData } from "../constants";
import { Storage } from 'react-jhipster';
var userType = '';

const switchRoutes = (sidebarRoutes) => (
  <Switch>
    {sidebarRoutes.concat(otherRoutes).map((route) => {
      if (route.redirect) {
        return <Route key={route.path} exact path={route.path} render={() => (<Redirect to={route.pathTo} />)} />;
      }

      if (route.collapse) {
        return route.views.map((childRoute) => {
          return (
            <Route exact path={childRoute.path} component={childRoute.component} key={childRoute.path} />
          );
        });
      }

      return <Route exact path={route.path} component={route.component} key={route.path} />;
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      miniActive: false,
      isLoggedIn: true
    };
  }

  ps = null;

  componentDidMount() {
    this.props.checkAuth(async (session) => {
      if (session) {
        const { userId } = await getUserFromSession();
        this.props.fetchUserByUserId(userId, session.token);
      } else {
        this.setState({ isLoggedIn: false });
      }
    });

    if (navigator.platform.includes("Win")) {
      this.ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    //userType
    if (Storage.local.get(surveyLocalData.USER_TYPE)) {
      userType = Storage.local.get(surveyLocalData.USER_TYPE);
    }

  }

  componentWillUnmount() {
    if (this.ps !== null && navigator.platform.includes("Win")) {
      this.ps.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history.location.pathname !== prevProps.location.pathname) {
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }

  sidebarMinimize = () => {
    this.setState(oldState => ({ miniActive: !oldState.miniActive }));
  }

  render() {
    const { classes, location, surveyLoading } = this.props;
    const { isLoggedIn, miniActive, mobileOpen } = this.state;
    const mainPanel =
      `${classes.mainPanel} ${classnames({
        [classes.mainPanelSidebarMini]: miniActive,
        [classes.mainPanelWithPerfectScrollbar]: navigator.platform.includes('Win')
      })}`;
    var sidebarRoutes = commonRoutes;
    if (userType === eUserType.participant) {
      sidebarRoutes = participantRoutes.concat(commonRoutes);
    }
    else if (userType === eUserType.assessor) {
      sidebarRoutes = assessorRoutes.concat(commonRoutes);
    }
    else if (userType === eUserType.admin) {
      sidebarRoutes = adminRoutes.concat(commonRoutes);
    }
    return (
      !isLoggedIn ?
        <div className={mainPanel}>
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location.pathname }
            }}
          />
        </div> :
        <div className={classes.wrapper}>
          <Sidebar
            routes={sidebarRoutes}
            logoText="Assessment"
            logo={logo}
            handleDrawerToggle={this.handleDrawerToggle}
            open={mobileOpen}
            color="blue"
            bgColor="black"
            miniActive={miniActive}
            location={location}
          />
          <div className={mainPanel} ref="mainPanel">
            {surveyLoading && <ReactLoader loading={surveyLoading} />}
            <Header
              sidebarMinimize={this.sidebarMinimize}
              miniActive={miniActive}
              routes={sidebarRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
            />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(sidebarRoutes)}</div>
            </div>
          </div>
        </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  surveyLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { user: state.user.detail, surveyLoading: state.surveys.loading };
}

export default compose(
  withStyles(appStyle),
  connect(mapStateToProps, { checkAuth, fetchUserByUserId })
)(Dashboard);