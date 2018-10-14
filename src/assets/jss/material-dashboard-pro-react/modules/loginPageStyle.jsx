// ##############################
// // // LoginPage view styles
// #############################

import {
  container,
  cardTitle,
  alertWrapper,
  alertLink,
  noMarginTop,
  dangerColor,
} from 'assets/jss/material-dashboard-pro-react';
import customCheckboxRadioSwitch from 'assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch';
import theme from 'assets/jss/material-dashboard-pro-react/layouts/theme';

const loginPageStyle = {
  container,
  alertWrapper,
  alertLink,
  noMarginTop,
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
  },
  iconsBar: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2.8em',
    color: theme.indigoTheme.palette.primary.contrastText,
  },
  socialIcon: {
    margin: '0 15px',
    width: 'auto',
  },
  textCenter: {
    textAlign: 'center',
  },
  textEnd: {
    textAlign: 'end',
  },
  content: {
    minHeight: '100vh',
    position: 'relative',
    zIndex: '4',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: '#FFFFFF',
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
    display: 'flex',
  },
  socialButton: {
    flex: '1 1 auto',
    borderRadius: 5,
    '&:hover': {
      opacity: 0.7,
    },
  },
  fbButton: {
    backgroundColor: '#4267b2',
    marginRight: 10,
    marginLeft: 10,
    '&:focus, &:hover': {
      backgroundColor: '#4267b2',
    },
  },
  googleButton: {
    backgroundColor: '#d93025',
    '&:focus, &:hover': {
      backgroundColor: '#d93025',
    },
  },
  twitterButton: {
    backgroundColor: '#1da1f2',
    '&:focus, &:hover': {
      backgroundColor: '#1da1f2',
    },
  },
  breakLine: {
    textAlign: 'center',
    position: 'relative',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      width: '45%',
      height: 1,
      backgroundColor: '#d2d2d2',
      top: 0,
      bottom: 0,
      margin: 'auto',
    },
    '&::before': {
      left: 0,
    },
    '&::after': {
      right: 0,
    },
  },
  submitWrapper: {
    display: 'block',
    paddingTop: '0.9375rem',
    justifyContent: 'space-between',
  },
  footerWrapper: {
    justifyContent: 'center',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerPanel: {
    width: '100vw',
    height: '28vh',
    borderRadius: 8,
    marginTop: '-2.2em',
    background: theme.indigoTheme.palette.primary.main,
  },
  inputIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    color: theme.indigoTheme.palette.primary.dark,
  },
  inputIconError: {
    color: dangerColor,
  },
  loginPanel: {
    margin: '2em auto',
  },
  contrastText: {
    color: theme.indigoTheme.palette.primary.contrastText,
  },
  loginButtonLabel: {
    fontSize: 'medium',
  },
};

export default loginPageStyle;
