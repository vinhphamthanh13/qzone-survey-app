import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Toolbar } from '@material-ui/core';
import Button from 'components/CustomButtons/Button';
import authHeaderStyle from 'assets/jss/material-dashboard-pro-react/components/authHeaderStyle';
import { classesType } from 'types/global';

const AuthHeader = ({ classes, color }) => {
  const appBarClasses = classnames(classes.appBar, {
    [classes[color]]: color,
  });
  return (
    <AppBar position="static" className={appBarClasses}>
      <Toolbar className={classes.container}>
        <Button className={classes.title} color="transparent">
          Assessment
        </Button>
      </Toolbar>
    </AppBar>
  );
};

AuthHeader.propTypes = {
  classes: classesType.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
};

AuthHeader.defaultProps = {
  color: undefined,
};

export default withStyles(authHeaderStyle)(AuthHeader);
