import React, { PureComponent } from 'react';
import Button from 'components/CustomButtons/Button';
import { classesType } from 'types/global';

class SocialLogin extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.socialLine}>
        <Button
          justIcon
          href="https://www.twitter.com"
          target="_blank"
          className={`${classes.socialButton} ${classes.twitterButton}`}
        >
          <i className="fab fa-twitter" />
        </Button>
        <Button
          justIcon
          href="https://www.facebook.com"
          target="_blank"
          className={`${classes.socialButton} ${classes.fbButton}`}
        >
          <i className="fab fa-facebook" />
        </Button>
        <Button
          justIcon
          href="https://www.plus.google.com"
          target="_blank"
          className={`${classes.socialButton} ${classes.googleButton}`}
        >
          <i className="fab fa-google" />
        </Button>
      </div>
    );
  }
}

export default SocialLogin;
