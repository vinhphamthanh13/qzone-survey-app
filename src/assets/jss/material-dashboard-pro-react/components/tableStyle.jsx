import {
  warningColor, dangerColor, successColor, infoColor, roseColor, grayColor,
  alabasterColor, bizzareColor, champagneColor, linkWaterColor,
  mintTulipColor, oysterPinkColor, pearlLustaColor, peppermintColor,
  primaryColor, whiteSandColor, zanahColor,
} from 'assets/jss/color-theme';
import { defaultFont } from 'assets/jss/material-dashboard-pro-react';

const tableStyle = theme => ({
  warning: {
    color: warningColor,
  },
  primary: {
    color: primaryColor,
  },
  danger: {
    color: dangerColor,
  },
  success: {
    color: successColor,
  },
  info: {
    color: infoColor,
  },
  rose: {
    color: roseColor,
  },
  gray: {
    color: grayColor,
  },
  right: {
    textAlign: 'right',
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    overflow: 'auto',
  },
  tableShoppingHead: {
    fontSize: '0.9em !important',
    textTransform: 'uppercase !important',
  },
  tableHeadFontSize: {
    fontSize: '1.25em !important',
  },
  tableHeadCell: {
    color: 'rgba(0, 0, 0, 0.87)',
    border: 'none !important',
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '12px 8px!important',
    verticalAlign: 'middle',
    fontSize: '1em',
    borderBottom: 'none',
    borderTop: '1px solid #ddd',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: '24px',
      minWidth: '32px',
    },
  },
  tableCellTotal: {
    fontWeight: '500',
    fontSize: '1.25em',
    paddingTop: '14px',
    textAlign: 'right',
  },
  tableCellAmount: {
    fontSize: '26px',
    fontWeight: '300',
    marginTop: '5px',
    textAlign: 'right',
  },
  tableResponsive: {
    // width: "100%",
    minHeight: '0.1%',
    overflowX: 'auto',
  },
  tableStripedRow: {
    backgroundColor: alabasterColor,
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: whiteSandColor,
    },
  },
  warningRow: {
    backgroundColor: pearlLustaColor,
    '&:hover': {
      backgroundColor: champagneColor,
    },
  },
  dangerRow: {
    backgroundColor: bizzareColor,
    '&:hover': {
      backgroundColor: oysterPinkColor,
    },
  },
  successRow: {
    backgroundColor: peppermintColor,
    '&:hover': {
      backgroundColor: zanahColor,
    },
  },
  infoRow: {
    backgroundColor: linkWaterColor,
    '&:hover': {
      backgroundColor: mintTulipColor,
    },
  },
});

export default tableStyle;
