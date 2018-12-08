import { defaultFont } from 'assets/jss/material-dashboard-pro-react';
import {
  dangerColor, successColor, roseColor,
  altoColor, silverChaliceColor, troutColor, whiteColor,
} from 'assets/jss/color-theme';

const customInputStyle = {
  disabled: {
    '&:before': {
      borderColor: 'transparent !important',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: `${altoColor} !important`,
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: roseColor,
    },
  },
  underlineError: {
    '&:after': {
      borderColor: dangerColor,
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: successColor,
    },
  },
  labelRoot: {
    ...defaultFont,
    color: `${silverChaliceColor} !important`,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.42857',
    top: '10px',
    '& + $underline': {
      marginTop: '0px',
    },
  },
  labelRootError: {
    color: `${dangerColor} !important`,
  },
  labelRootSuccess: {
    color: `${successColor} !important`,
  },
  feedback: {
    position: 'absolute',
    bottom: '3px',
    right: '0',
    zIndex: '2',
    display: 'block',
    width: '1em',
    height: '1em',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  feedbackRight: {
    marginRight: '22px',
  },
  formControl: {
    margin: '0 0 17px 0',
    paddingTop: '27px',
    position: 'relative',
    '& svg,& .fab,& .far,& .fal,& .fas': {
      color: troutColor,
    },
  },
  whiteUnderline: {
    '&:hover:not($disabled):before,&:before': {
      backgroundColor: whiteColor,
    },
    '&:after': {
      backgroundColor: whiteColor,
    },
  },
  input: {
    color: '#495057',
    '&,&::placeholder': {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400',
      lineHeight: '1.42857',
      opacity: '1',
    },
    '&::placeholder': {
      color: silverChaliceColor,
    },
  },
  whiteInput: {
    '&,&::placeholder': {
      color: whiteColor,
      opacity: '1',
    },
  },
};

export default customInputStyle;
