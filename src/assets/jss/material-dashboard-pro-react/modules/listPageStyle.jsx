import { cardTitle, container } from 'assets/jss/material-dashboard-pro-react';
import buttonStyle from 'assets/jss/material-dashboard-pro-react/components/buttonStyle';

const listPageStyle = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  buttonDisplay: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: '#303f9f',
    '&:hover,&:focus': {
      backgroundColor: '#303f9f',
    },
  },
  container: {
    ...container,
    position: 'relative',
    zIndex: '3',
    paddingTop: '5vh',
  },
  linkDisplay: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  ...buttonStyle,
};
export default listPageStyle;
