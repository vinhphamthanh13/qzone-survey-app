import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import notFoundPageStyle from 'assets/jss/material-dashboard-pro-react/modules/notFoundPageStyle';
import { classesType, locationType } from 'types/global';

const NotFound = ({ classes, location }) => (
  <div className={classes.wrapper}>
    <h1>Page not found</h1>
    <p>
      The requested URL
      {' '}
      <em>{location.pathname}</em>
      {' '}
      is not found
    </p>
  </div>
);

NotFound.propTypes = {
  classes: classesType.isRequired,
  location: locationType.isRequired,
};

export default withStyles(notFoundPageStyle)(NotFound);
