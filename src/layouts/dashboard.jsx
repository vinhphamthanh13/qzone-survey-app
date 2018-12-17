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
import logo from 'assets/img/logo-white.png';
import { fetchUserByUserId } from 'services/api/user';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import NotFound from 'modules/not-found/not-found';
import {
  historyType, locationType, classesType, userDetailType,
} from 'types/global';
import { getUserFromSession } from 'utils/session';
import { eUserType } from '../constants';

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

  sidebarRoutes = [];

  static propTypes = {
    classes: classesType.isRequired,
    surveyLoading: PropTypes.bool.isRequired,
    history: historyType.isRequired,
    location: locationType.isRequired,
    user: userDetailType.isRequired,
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
    const { fetchUserByUserIdAction, user } = this.props;
    if (!user || !user.userType) {
      const { userId } = await getUserFromSession();
      if (userId) {
        fetchUserByUserIdAction(userId);
      } else {
        this.setState({ isLoggedIn: false });
      }
    }

    if (navigator.platform.includes('Win')) {
      this.ps = new PerfectScrollbar(this.mainPanelRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { user: newUser } = nextProps;
    const { user: oldUser, history, location } = this.props;

    if (!oldUser.userType && newUser.userType) {
      if (newUser.userType === eUserType.participant) {
        this.sidebarRoutes = participantRoutes.concat(commonRoutes);
      } else if (newUser.userType === eUserType.assessor) {
        this.sidebarRoutes = assessorRoutes.concat(commonRoutes);
      } else if (newUser.userType === eUserType.admin) {
        this.sidebarRoutes = adminRoutes.concat(commonRoutes);
      } else if (newUser.userType === eUserType.sponsor) {
        this.sidebarRoutes = sponsorRoutes.concat(commonRoutes);
      }
    }

    if (history.location.pathname !== location.pathname) {
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
    const {
      classes, location, surveyLoading,
    } = this.props;
    const { isLoggedIn, miniActive, mobileOpen } = this.state;
    const mainPanel = `${classes.mainPanel} ${classnames({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]: navigator.platform.includes('Win'),
    })}`;

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
              routes={this.sidebarRoutes}
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
                routes={this.sidebarRoutes}
                handleDrawerToggle={this.handleDrawerToggle}
              />
              <div className={classes.content}>
                {this.sidebarRoutes.length > 0
                  && <div className={classes.container}>{switchRoutes(this.sidebarRoutes)}</div>}
              </div>
            </div>
          </div>
        )
    );
  }
}

function mapStateToProps(state) {
  return { surveyLoading: state.surveys.loading, user: state.user.detail };
}

export default compose(
  withStyles(appStyle),
  connect(mapStateToProps, {
    fetchUserByUserIdAction: fetchUserByUserId,
  }),
)(Dashboard);
