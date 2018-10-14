import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import Check from '@material-ui/icons/Check';
import { classesType } from 'types/global';

export default function CustomCheckbox({ ...props }) {
  const {
    label,
    value,
    classes,
    checked,
    onClick,
  } = props;
  return (
    <div
      className={
        `${classes.checkboxAndRadio} ${classes.checkboxAndRadioHorizontal}`
      }
    >
      <FormControlLabel
        control={(
          <Checkbox
            tabIndex={-1}
            value={value}
            onClick={onClick}
            checked={checked}
            checkedIcon={
              <Check className={classes.checkedIcon} />
            }
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{
              checked: classes.checked,
            }}
          />
        )}
        classes={{ label: classes.label }}
        label={label}
      />
    </div>
  );
}

CustomCheckbox.propTypes = {
  classes: classesType.isRequired,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
