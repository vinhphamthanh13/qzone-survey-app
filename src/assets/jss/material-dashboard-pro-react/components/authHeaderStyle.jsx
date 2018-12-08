// ##############################
// // // Pages Header styles
// #############################

import {
  container, defaultFont, defaultBoxShadow,
  boxShadow, drawerWidth, transition,
} from 'assets/jss/material-dashboard-pro-react';
import {
  darkGrayColor, primaryColor, successColor, whiteColor,
  blackColor, dangerColor, infoColor, warningColor,
} from 'assets/jss/color-theme';

const pagesHeaderStyle = theme => ({
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
    ...container,
    minHeight: '50px',
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '24px',
    textTransform: 'none',
    color: whiteColor,
    '&:hover,&:focus': {
      opacity: 0.8,
      color: whiteColor,
    },
  },
  appResponsive: {
    top: '8px',
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
  list: {
    ...defaultFont,
    fontSize: '14px',
    margin: 0,
    marginRight: '-15px',
    paddingLeft: '0',
    listStyle: 'none',
    color: whiteColor,
    paddingTop: '0',
    paddingBottom: '0',
  },
  listItem: {
    float: 'left',
    position: 'relative',
    display: 'block',
    width: 'auto',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      zIndex: '999',
      width: '100%',
      paddingRight: '15px',
    },
  },
  navLink: {
    color: whiteColor,
    margin: '0 5px',
    paddingTop: '15px',
    paddingBottom: '15px',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    lineHeight: '20px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    textDecoration: 'none',
    '&:hover,&:focus': {
      color: whiteColor,
      background: 'rgba(200, 200, 200, 0.2)',
    },
  },
  listItemIcon: {
    marginTop: '-3px',
    top: '0px',
    position: 'relative',
    marginRight: '3px',
    width: '20px',
    height: '20px',
    verticalAlign: 'middle',
    color: 'inherit',
    display: 'inline-block',
  },
  listItemText: {
    flex: 'none',
    padding: '0',
    minWidth: '0',
    margin: 0,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    backgroundColor: `rgba(${whiteColor}, 0.1)`,
  },
  drawerPaper: {
    ...transition,
    ...boxShadow,
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: drawerWidth,
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      top: '0',
    },
    '&:after': {
      background: blackColor,
      opacity: '.8',
    },
  },
  sidebarButton: {
    '&,&:hover,&:focus': {
      color: whiteColor,
    },
    top: '-2px',
  },
});

export default pagesHeaderStyle;
