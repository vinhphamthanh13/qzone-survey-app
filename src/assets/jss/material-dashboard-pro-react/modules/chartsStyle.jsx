// ##############################
// // // IconCard styles
// #############################
import { cardTitle } from 'assets/jss/material-dashboard-pro-react';

const chartsStyle = {
  container: {
    border: 'none',
  },
  root: {
    width: '100%',
  },
  chartTitle: {
    ...cardTitle,
    marginTop: '15px',
  },
  columnOrder: {
    width: '20%',
  },
  columnTitle: {
    width: '80%',
    textTransform: 'capitalize',
  },
  chartToolTip: {
    textAlign: 'center',
    position: 'relative',
    top: 'auto',
    left: 'auto',
    background: 'rgba(254, 250, 240, 0.8)',
    width: 'fit-content',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default chartsStyle;
