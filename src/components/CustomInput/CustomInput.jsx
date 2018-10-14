import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import customInputStyle from 'assets/jss/material-dashboard-pro-react/components/customInputStyle';
import { classesType } from 'types/global';

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    value,
    iconFaName,
  } = props;

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl,
    );
  } else {
    formControlClasses = classes.formControl;
  }

  let feedbackClasses = classes.feedback;
  let minAttr = '';

  if (inputProps !== undefined) {
    if (inputProps.endAdornment !== undefined) {
      feedbackClasses = `${feedbackClasses} ${classes.feedbackRight}`;
    }
    if (inputProps.type === 'number') {
      if (inputProps.min !== undefined) minAttr = inputProps.min;
    }
  }

  const appendIcon = (icon, isError, isSuccess) => {
    if (icon) {
      if (isError) {
        return <Icon className={classNames(iconFaName, classes.labelRootError)} />;
      }
      return (isSuccess
        ? <Icon className={classNames(iconFaName, classes.labelRootSuccess)} />
        : <Icon className={iconFaName} />);
    }

    if (isError) {
      return <Clear className={`${feedbackClasses} ${classes.labelRootError}`} />;
    }
    return (isSuccess ? <Check className={`${feedbackClasses} ${classes.labelRootSuccess}`} /> : null);
  };

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={`${classes.labelRoot} ${labelClasses}`}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        value={value}
        inputProps={{
          min: minAttr,
        }}
        {...inputProps}
      />
      {appendIcon(iconFaName, error, success)}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: classesType.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string.isRequired,
  inputProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.func,
  ])),
  formControlProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconFaName: PropTypes.string,
};

CustomInput.defaultProps = {
  labelText: undefined,
  labelProps: {},
  inputProps: {},
  formControlProps: {},
  inputRootCustomClasses: undefined,
  error: false,
  success: false,
  white: false,
  value: undefined,
  iconFaName: undefined,
};

export default withStyles(customInputStyle)(CustomInput);
