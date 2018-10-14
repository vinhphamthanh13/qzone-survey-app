import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import cardTextStyle from 'assets/jss/material-dashboard-pro-react/components/cardTextStyle';

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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
