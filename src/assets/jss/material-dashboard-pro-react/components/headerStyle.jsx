// ##############################
// // // Header styles
// #############################

import {
  dangerColor, primaryColor, infoColor, whiteColor,
  successColor, warningColor, darkGrayColor,
} from 'assets/jss/color-theme';
import {
  containerFluid, defaultFont, defaultBoxShadow,
} from 'assets/jss/material-dashboard-pro-react';

const headerStyle = () => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: darkGrayColor,
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    ...containerFluid,
    minHeight: '50px',
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    '&:hover,&:focus': {
      background: 'transparent',
    },
  },
  primary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  sidebarMinimize: {
    float: 'left',
    padding: '0 0 0 15px',
    display: 'block',
    color: darkGrayColor,
  },
  sidebarMinimizeRTL: {
    padding: '0 15px 0 0 !important',
  },
  sidebarMiniIcon: {
    width: '20px',
    height: '17px',
  },
});

export default headerStyle;
