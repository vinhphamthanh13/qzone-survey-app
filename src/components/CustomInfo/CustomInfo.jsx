import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Info as InfoIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { infoColor } from 'assets/jss/color-theme';

const styles = () => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2em',
    color: infoColor,
  },
  itemWrapped: {
    margin: 'auto .5em',
  },
});
const CustomInfo = (props) => {
  const { content, classes } = props;
  return (
    <div className={classes.wrapper}>
      <InfoIcon className={classes.itemWrapped} />
      <Typography className={classes.itemWrapped} variant="subheading">{content}</Typography>
    </div>
  );
};

CustomInfo.propTypes = {
  content: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(CustomInfo);
