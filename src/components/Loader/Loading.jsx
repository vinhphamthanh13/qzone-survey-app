import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PulseLoader } from 'react-spinners';
import { roseColor } from 'assets/jss/color-theme';

const styles = () => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: '3em 0 4em',
  },
});

const Loading = props => (
  props.isLoading && (
    <div className={props.classes.wrapper}>
      <PulseLoader
        sizeUnit="px"
        size={18}
        color={roseColor}
        loading={props.isLoading}
      />
    </div>
  ));

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Loading);
