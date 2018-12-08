import React from 'react';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  MenuItem, MenuList, ClickAwayListener, Paper, Grow, Hidden,
} from '@material-ui/core';
import { Person, Notifications, Dashboard } from '@material-ui/icons';
import Button from 'components/CustomButtons/Button';
import { sessionService } from 'redux-react-session';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import { Storage } from 'react-jhipster';
import { classesType } from 'types/global';
import { surveyLocalData } from '../../constants';

class HeaderLinks extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
  };

  state = {
    notificationOpen: false,
    userOpen: false,
  };

  handleClick = () => {
    this.setState(oldState => ({ notificationOpen: !oldState.notificationOpen }));
  };

  handleUserClick = () => {
    this.setState(oldState => ({ userOpen: !oldState.userOpen }));
  };

  handleClose = () => {
    this.setState({ notificationOpen: false, userOpen: false });
  };

  handleLogout = () => {
    if (Storage.local.get(surveyLocalData.USER_TYPE)) {
      Storage.local.remove(surveyLocalData.USER_TYPE);
    }
    this.setState({ userOpen: false });
    sessionService.deleteSession();
    sessionService.deleteUser();
    window.location = '/login';
  };

  render() {
    const { classes } = this.props;
    const { notificationOpen, userOpen } = this.state;
    const dropdownItem = `${classes.dropdownItem} `;
    const managerClasses = classNames({
      [classes.managerClasses]: true,
    });
    return (
      <div>
        <Button
          color="transparent"
          simple
          aria-label="Dashboard"
          href="/admin/dashboard"
          justIcon
          className={classes.buttonLink}
          muiClasses={{
            label: '',
          }}
        >
          <Dashboard
            className={
              `${classes.headerLinksSvg} ${classes.links}`
            }
          />
          <Hidden mdUp>
            <span className={classes.linkText}>
              {'Dashboard'}
            </span>
          </Hidden>
        </Button>
        <Manager className={managerClasses}>
          <Target>
            <Button
              color="transparent"
              justIcon
              aria-label="Notifications"
              aria-owns={notificationOpen ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
              muiClasses={{
                label: '',
              }}
            >
              <Notifications
                className={
                  `${classes.headerLinksSvg} ${classes.links}`
                }
              />
              <Hidden mdUp>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <span role="button" tabIndex="0" onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </span>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={notificationOpen}
            className={
              `${classNames({ [classes.popperClose]: !notificationOpen })} ${classes.pooperResponsive}`
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={notificationOpen}
                id="menu-list"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu" />
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <Manager className={managerClasses}>
          <Target>
            <Button
              color="transparent"
              justIcon
              aria-label="Person"
              aria-owns={userOpen ? 'menu-list1' : null}
              aria-haspopup="true"
              onClick={this.handleUserClick}
              className={classes.buttonLink}
              muiClasses={{ label: '' }}
            >
              <Person
                className={
                  `${classes.headerLinksSvg} ${classes.links}`
                }
              />
              <Hidden mdUp>
                <span className={classes.linkText}>
                  Profile
                </span>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={userOpen}
            className={
              `${classNames({ [classes.popperClose]: !userOpen })} ${classes.pooperResponsive}`
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={userOpen}
                id="menu-list1"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleLogout}
                      className={dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
