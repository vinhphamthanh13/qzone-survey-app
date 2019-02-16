import React, { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from 'components/CustomButtons/Button';
import { classesType } from 'types/global';
import loginPageStyle from '../../assets/jss/material-dashboard-pro-react/modules/loginPageStyle';

class SocialLogin extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.socialLine}>
        <Button
          justIcon
          href=""
          target="_blank"
          color="transparent"
          className={`${classes.socialButton} ${classes.twitterButton}`}
        >
          <i className="fab fa-twitter" />
        </Button>
        <Button
          justIcon
          href=""
          target="_blank"
          color="transparent"
          className={`${classes.socialButton} ${classes.fbButton}`}
        >
          <i className="fab fa-facebook" />
        </Button>
        <Button
          justIcon
          href=""
          target="_blank"
          color="transparent"
          className={`${classes.socialButton} ${classes.googleButton}`}
        >
          <i className="fab fa-google" />
        </Button>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(SocialLogin);
