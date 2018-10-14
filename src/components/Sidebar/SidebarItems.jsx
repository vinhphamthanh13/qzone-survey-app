import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { classesType, locationType, routesType } from 'types/global';

export default class SidebarItems extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    routes: routesType.isRequired,
    location: locationType.isRequired,
    initMiniActive: PropTypes.bool.isRequired,
    currentMiniActive: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
  }

  activeRoute = (routeName) => {
    const { location } = this.props;
    return location.pathname.includes(routeName);
  }

  render() {
    const {
      classes, routes, color,
      initMiniActive, currentMiniActive,
    } = this.props;

    return (
      <List className={classes.list}>
        {routes.map((route) => {
          if (route.redirect) return null;

          const navLinkClasses = `${classes.itemLink} ${classnames({
            [classes[color]]: this.activeRoute(route.path),
          })}`;
          const itemText = `${classes.itemText} ${classnames({
            [classes.itemTextMini]: initMiniActive && currentMiniActive,
          })}`;
          return (
            <ListItem key={route.path} className={classes.item}>
              <NavLink exact strict to={route.path} className={navLinkClasses}>
                <ListItemIcon className={classes.itemIcon}>
                  <route.icon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={route.name}
                  className={itemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );
  }
}
