import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import cardTextStyle from 'assets/jss/material-dashboard-pro-react/components/cardTextStyle';
import { classesType } from 'types/global';

function CardText({ ...props }) {
  const {
    classes, className, children, color, ...rest
  } = props;
  const cardTextClasses = classNames({
    [classes.cardText]: true,
    [classes[`${color}CardHeader`]]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardTextClasses} {...rest}>
      {children}
    </div>
  );
}

CardText.propTypes = {
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

CardText.defaultProps = {
  className: undefined,
  color: undefined,
};

export default withStyles(cardTextStyle)(CardText);
