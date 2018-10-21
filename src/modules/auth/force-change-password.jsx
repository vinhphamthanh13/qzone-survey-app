import React from 'react';
import { connect } from 'react-redux';
import {
  TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import validatePassword from 'utils/validatePassword';
import verificationPageStyle from 'assets/jss/material-dashboard-pro-react/modules/verificationPageStyle';
import PasswordField from './password-field';

class ForceChangePassword extends React.Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default ForceChangePassword;
