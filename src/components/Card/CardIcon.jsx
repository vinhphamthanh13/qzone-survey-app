import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import cardIconStyle from 'assets/jss/material-dashboard-pro-react/components/cardIconStyle';
import { classesType } from 'types/global';

function CardIcon({ ...props }) {
  const {
    classes, className, children, color, ...rest
  } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[`${color}CardHeader`]]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  classes: classesType.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
};

CardIcon.defaultProps = {
  className: undefined,
  color: undefined,
};

export default withStyles(cardIconStyle)(CardIcon);
