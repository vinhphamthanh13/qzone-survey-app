import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { AppBar, Toolbar, Hidden } from "@material-ui/core";
import { Menu, MoreVert, ViewList } from "@material-ui/icons";
import HeaderLinks from "components/Header/HeaderLinks";
import Button from "components/CustomButtons/Button";
import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle";

function Header({ ...props }) {
  // function makeBrand() {
  //   var name;
  //   props.routes.map((prop, key) => {
  //     if (prop.collapse) {
  //       prop.views.map((prop, key) => {
  //         if (prop.path === props.location.pathname) {
  //           name = prop.name;
  //         }
  //         return null;
  //       });
  //     }
  //     if (prop.path === props.location.pathname) {
  //       name = prop.name;
  //     }
  //     return null;
  //   });
  //   return name;
  // }
  const { classes, color, miniActive, sidebarMinimize, handleDrawerToggle } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimizeClass = classes.sidebarMinimize;

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={sidebarMinimizeClass}>
            {miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
                <Button
                  justIcon
                  round
                  color="white"
                  onClick={sidebarMinimize}
                >
                  <MoreVert className={classes.sidebarMiniIcon} />
                </Button>
              )}
          </div>
          <div className={classes.flex} />
        </Hidden>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp>
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  handleDrawerToggle: PropTypes.func.isRequired,
  sidebarMinimize: PropTypes.func.isRequired,
  miniActive: PropTypes.bool.isRequired,
};

export default withStyles(headerStyle)(Header);
