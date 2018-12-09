import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import SurveyForm from 'modules/shared/SurveyForm';
import { createSurvey } from 'services/api/assessment';
import { Create as CreateIcon } from '@material-ui/icons';
import { isEmpty, pick } from 'lodash';
import { sessionService } from 'redux-react-session';
import { classesType, historyType } from 'types/global';

class AssessmentQuestionCreateCopy extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    createSurvey: PropTypes.func.isRequired,
    history: historyType.isRequired,
    surveyInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editSurveyInfo: {
        ...(pick(props.surveyInfo, 'description', 'logo', 'privacy', 'survey', 'title')),
        userId: props.surveyInfo.user.id,
      },
      titleState: '',
      descriptionState: '',
      mode: 'edit',
      edit: true,
      token: '',
    };
  }

  componentDidMount() {
    sessionService.loadSession().then((currentSession) => {
      this.setState({ token: currentSession.token });
    });
  }

  change = (event, stateName) => {
    event.persist();
    this.setState(oldState => ({
      [`${stateName}State`]: isEmpty(event.target.value) ? 'error' : 'success',
      editSurveyInfo: {
        ...oldState.editSurveyInfo,
        [stateName]: event.target.value || event.target.checked,
      },
    }));
  };

  changeQuestions = (newSurvey) => {
    const { createSurvey: createSurveyAction, history } = this.props;
    const { token, editSurveyInfo } = this.state;
    const { title, description } = editSurveyInfo;

    if (!isEmpty(title) && !isEmpty(description)) {
      createSurveyAction({
        ...editSurveyInfo,
        survey: JSON.stringify(newSurvey),
      }, token, () => { history.push('/admin/assessment/list'); });
    } else {
      this.setState(oldState => ({
        editSurveyInfo: { ...oldState.editSurveyInfo, survey: newSurvey },
        titleState: isEmpty(title) ? 'error' : 'success',
        descriptionState: isEmpty(description) ? 'error' : 'success',
      }));
    }
  };

  render() {
    const { classes } = this.props;
    const {
      titleState, descriptionState, mode, edit, editSurveyInfo,
    } = this.state;
    const survey = {
      surveyInfo: editSurveyInfo, titleState, descriptionState, mode, edit,
    };
    return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <CreateIcon />
          </CardIcon>
          <h3 className={classes.cardIconTitle}>Edit Assessment</h3>
          <Link to="/admin/assessment/list" className={classes.linkDisplay}>
            <u>Back</u>
          </Link>
        </CardHeader>
        <CardBody>
          <SurveyForm
            survey={survey}
            change={this.change}
            classes={classes}
            changeQuestions={this.changeQuestions}
          />
        </CardBody>
      </Card>
    );
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(null, { createSurvey }),
)(AssessmentQuestionCreateCopy);
