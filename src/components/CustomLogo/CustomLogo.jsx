import React from 'react';
import PropTypes from 'prop-types';
import { LOGO_FALLBACK1, LOGO_FALLBACK2 } from '../../constants';

const CustomLogo = (props) => {
  const { logo } = props;
  return (
    <picture>
      <source srcSet={LOGO_FALLBACK1} />
      <source srcSet={LOGO_FALLBACK2} />
      <img src={logo} alt="Survey Logo" width="42px" height="42px" style={{ borderRadius: '50%' }} />
    </picture>
  );
};


CustomLogo.propTypes = {
  logo: PropTypes.string,
};

CustomLogo.defaultProps = {
  logo: '',
};

export default CustomLogo;
