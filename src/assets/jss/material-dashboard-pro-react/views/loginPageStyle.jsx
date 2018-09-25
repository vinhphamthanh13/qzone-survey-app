// ##############################
// // // LoginPage view styles
// #############################

import {
  container,
  cardTitle,
  alertWrapper,
  alertLink,
} from "assets/jss/material-dashboard-pro-react.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";


const loginPageStyle = {
  container,
  alertWrapper,
  alertLink,
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
  },
  textCenter: {
    textAlign: "center"
  },
  content: {
    paddingTop: 80,
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF"
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0",
    display: 'flex',
  },
  socialButton: {
    flex: '1 1 auto',
    borderRadius: 5,
    '&:hover': {
      opacity: .7,
    }
  },
  fbButton: {
    backgroundColor: '#4267b2',
    marginRight: 10,
    marginLeft: 10,
    '&:focus, &:hover': {
      backgroundColor: '#4267b2',
    }
  },
  googleButton: {
    backgroundColor: '#d93025',
    '&:focus, &:hover': {
      backgroundColor: '#d93025',
    }
  },
  twitterButton: {
    backgroundColor: '#1da1f2',
    '&:focus, &:hover': {
      backgroundColor: '#1da1f2',
    }
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
    }
  },
  submitWrapper: {
    display: 'flex',
    paddingTop: '0.9375rem',
    justifyContent: 'space-between',
  },
  footerWrapper: {
    justifyContent: 'flex-end',
    borderTop: '1px solid #d2d2d26e',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #d2d2d26e',
  }
};

export default loginPageStyle;
