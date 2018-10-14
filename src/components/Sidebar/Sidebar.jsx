import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';
import cx from 'classnames';
import {
  Hidden, SwipeableDrawer, Drawer,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle';
import SidebarItems from './SidebarItems';

let ps;

class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    const { className, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
    color: PropTypes.oneOf([
      'white',
      'red',
      'orange',
      'green',
      'blue',
      'purple',
      'rose'
    ]),
    logo: PropTypes.string,
    logoText: PropTypes.string,
    image: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.object.isRequired,
    miniActive: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    bgColor: 'blue'
  }

  constructor(props) {
    super(props);
    this.state = { miniActive: true };
  }

  render() {
    const {
      classes, color, logo, image,
      logoText, routes, bgColor, miniActive, location,
      open, handleDrawerToggle,
    } = this.props;

    const logoNormal =
      `${classes.logoNormal} ${cx({
        [classes.logoNormalSidebarMini]: miniActive && this.state.miniActive
      })}`;
    const logoClasses = `${classes.logo} ${cx({ [classes.whiteAfter]: bgColor === 'white' })}`;
    const drawerPaper =
      `${classes.drawerPaper} ${classes[`${bgColor}Background`]} ${cx({
        [classes.drawerPaperMini]: miniActive && this.state.miniActive
      })}`;
    const sidebarWrapper =
      `${classes.sidebarWrapper} ${cx({
        [classes.drawerPaperMini]: miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.includes('Win')
      })}`;
    const drawerChildren = (
      <React.Fragment>
        <div className={logoClasses}>
          <Link to="/" className={classes.logoMini}>
            <img src={logo} alt="logo" className={classes.img} />
          </Link>
          <Link to="/" className={logoNormal}>{logoText}</Link>
        </div>
        <SidebarWrapper
          className={sidebarWrapper}
          links={
            <SidebarItems
              classes={classes}
              routes={routes}
              location={location}
              initMiniActive={miniActive}
              currentMiniActive={this.state.miniActive}
              color={color}
            />
          }
        />
        {image !== undefined &&
          <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />}
      </React.Fragment>
    );

    return (
      <div>
        <Hidden mdUp>
          <SwipeableDrawer
            anchor="left"
            open={open}
            classes={{ paper: drawerPaper }}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
          >
            {drawerChildren}
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            open
            anchor="left"
            variant="permanent"
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            classes={{ paper: drawerPaper }}
          >
            {drawerChildren}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(sidebarStyle)(Sidebar);
