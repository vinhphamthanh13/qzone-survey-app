import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export default class SidebarItems extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.object.isRequired,
    initMiniActive: PropTypes.bool.isRequired,
    currentMiniActive: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
  }

  activeRoute = (routeName) => {
    return this.props.location.pathname.includes(routeName);
  }

  render() {
    const {
      classes, routes, color,
      initMiniActive, currentMiniActive,
    } = this.props;

    return (
      <List className={classes.list}>
        {routes.map((route, key) => {
          if (route.redirect) return null;

          const navLinkClasses =
            `${classes.itemLink} ${classnames({
              [classes[color]]: this.activeRoute(route.path)
            })}`;
          const itemText =
            `${classes.itemText} ${classnames({
              [classes.itemTextMini]: initMiniActive && currentMiniActive,
            })}`;
          return (
            <ListItem key={key} className={classes.item}>
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
    )
  }
}
