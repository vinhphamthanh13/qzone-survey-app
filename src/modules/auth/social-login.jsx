import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/CustomButtons/Button';

class SocialLogin extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
