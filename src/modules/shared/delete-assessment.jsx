import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Button from 'components/CustomButtons/Button';
import deleteAssessmentStyle from 'assets/jss/material-dashboard-pro-react/modules/deleteAssessment';
import { CTA } from '../../constants';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class DeleteAssessment extends Component {
  static defaultProps = {
    type: CTA.DELETE,
    surveyId: '',
  };

  static propTypes = {
    surveyDeleteHandler: PropTypes.func.isRequired,
    openDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    type: PropTypes.string,
    surveyId: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  deleteSurveyHandler = () => {
    const { surveyId, surveyDeleteHandler } = this.props;
    surveyDeleteHandler(surveyId);
  };

  onDialogClose = () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  render() {
    const {
      openDialog, type, surveyId, classes,
    } = this.props;
    let surveyCount = 'this assessment';
    let surveyDeterminer = 'it is';
    let dialogTitle = 'Delete Assessment';
    let cancelButtonLabel = 'Cancel';

    if (!surveyId) {
      surveyCount = 'all assessments';
      surveyDeterminer = 'they are';
      dialogTitle = 'Delete All Assessments';
    }
    if (type === CTA.DELETE_CONFIRMED) {
      dialogTitle = surveyId ? 'Assessment Deleted' : 'Assessments Deleted';
      cancelButtonLabel = 'OK';
    }

    const dialogContent = type === 'delete' ? `Do you want to delete ${surveyCount}? You cannot recovery as
                         ${surveyDeterminer} permanently purged from the Assessment Database.`
      : 'Assessment(s) permanently deleted from DataBase!';

    const isDeleteButtonVisible = cancelButtonLabel === 'Cancel';
    const deleteButton = isDeleteButtonVisible ? (
      <div>
        <Button onClick={this.deleteSurveyHandler} color="rose">Delete</Button>
      </div>
    ) : null;
    return (
      <React.Fragment>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          open={openDialog}
          onClose={this.onDialogClose}
          aria-labelledby="delete-survey-dialog"
          disableBackdropClick
          classes={{ paper: classes.paper }}
        >
          <DialogTitle id="delete-survey-title">
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-survey-content">
              {dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div>
              <Button onClick={this.onDialogClose}>{cancelButtonLabel}</Button>
            </div>
            { deleteButton }
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(deleteAssessmentStyle)(DeleteAssessment);
