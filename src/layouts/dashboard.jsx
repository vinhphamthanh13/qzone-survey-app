import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PerfectScrollbar from 'perfect-scrollbar';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactLoader from 'components/Loader/react-loader';
import {
  commonRoutes, adminRoutes, assessorRoutes, otherRoutes, participantRoutes, sponsorRoutes,
} from 'routes/dashboard';
import Sidebar from 'components/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import appStyle from 'assets/jss/material-dashboard-pro-react/layouts/dashboardStyle';
import logo from 'assets/img/logo-white.svg';
import { checkAuth, fetchUserByUserId } from 'services/api/user';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Storage } from 'react-jhipster';
import NotFound from 'modules/not-found/not-found';
import { historyType, locationType, classesType } from 'types/global';
import { eUserType, surveyLocalData } from '../constants';

const switchRoutes = sidebarRoutes => (
  <Switch>
    <Redirect exact strict from="/" to={sidebarRoutes[0].path} />
    {sidebarRoutes.concat(otherRoutes).map(
      ({ redirect, icon, ...routeProp }) => (
        <Route
          exact
          strict
          key={routeProp.path}
          {...routeProp}
        />
      ),
    )}
    <Route component={NotFound} />
  </Switch>
);

class Dashboard extends React.Component {
  ps = null;

  userType = '';

  static propTypes = {
    classes: classesType.isRequired,
    surveyLoading: PropTypes.bool.isRequired,
    checkAuthAction: PropTypes.func.isRequired,
    history: historyType.isRequired,
    location: locationType.isRequired,
  }

  constructor(props) {
    super(props);
    this.mainPanelRef = React.createRef();
    this.state = {
      mobileOpen: false,
      miniActive: false,
      isLoggedIn: true,
    };
  }

  async componentDidMount() {
    const { checkAuthAction } = this.props;
    checkAuthAction(async (session) => {
      if (!session) {
        this.setState({ isLoggedIn: false });
      }
    });

    if (navigator.platform.includes('Win')) {
      this.ps = new PerfectScrollbar(this.mainPanelRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    if (Storage.local.get(surveyLocalData.USER_TYPE)) {
      this.userType = Storage.local.get(surveyLocalData.USER_TYPE);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.history.location.pathname !== nextProps.location.pathname) {
      const { mobileOpen } = this.state;
      if (mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    if (this.ps !== null && navigator.platform.includes('Win')) {
      this.ps.destroy();
    }
  }

  sidebarMinimize = () => {
    this.setState(oldState => ({ miniActive: !oldState.miniActive }));
  };

  handleDrawerToggle = () => {
    this.setState(oldState => ({ mobileOpen: !oldState.mobileOpen }));
  }

  render() {
    const { classes, location, surveyLoading } = this.props;
    const { isLoggedIn, miniActive, mobileOpen } = this.state;
    const mainPanel = `${classes.mainPanel} ${classnames({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]: navigator.platform.includes('Win'),
    })}`;
    let sidebarRoutes = commonRoutes;
    if (this.userType === eUserType.participant) {
      sidebarRoutes = participantRoutes.concat(commonRoutes);
    } else if (this.userType === eUserType.assessor) {
      sidebarRoutes = assessorRoutes.concat(commonRoutes);
    } else if (this.userType === eUserType.admin) {
      sidebarRoutes = adminRoutes.concat(commonRoutes);
    } else if (this.userType === eUserType.sponsor) {
      sidebarRoutes = sponsorRoutes.concat(commonRoutes);
    }

    return (
      !isLoggedIn
        ? (
          <div className={mainPanel}>
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location.pathname },
              }}
            />
          </div>
        )
        : (
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
            <div className={mainPanel} ref={this.mainPanelRef}>
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
    );
  }
}

function mapStateToProps(state) {
  return { surveyLoading: state.surveys.loading };
}

export default compose(
  withStyles(appStyle),
  connect(mapStateToProps, {
    checkAuthAction: checkAuth,
    fetchUserByUserIdAction: fetchUserByUserId,
  }),
)(Dashboard);
