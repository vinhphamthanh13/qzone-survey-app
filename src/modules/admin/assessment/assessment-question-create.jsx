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
import { Poll } from '@material-ui/icons';
import { isEmpty } from 'lodash';
import { sessionService } from 'redux-react-session';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { classesType, historyType } from 'types/global';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AssessmentQuestionCreate extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    createSurvey: PropTypes.func.isRequired,
    history: historyType.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      surveyInfo: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        survey: '',
        userId: '',
      },
      titleState: '',
      loading: true,
      descriptionState: '',
      mode: 'create',
      token: '',
    };
  }

  componentDidMount() {
    sessionService.loadSession().then((currentSession) => {
      this.setState({ token: currentSession.token });
    });
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  change = (event, stateName) => {
    if (isEmpty(event.target.value)) {
      this.setState({ [`${stateName}State`]: 'error' });
    } else {
      this.setState({ [`${stateName}State`]: 'success' });
    }
    const { surveyInfo } = this.state;
    surveyInfo[stateName] = (event.target.value || event.target.checked);
    this.setState({ surveyInfo });
  };

  changeQuestions = (newSurvey) => {
    const { createSurvey: createSurveyAction, history } = this.props;
    const { surveyInfo, token } = this.state;
    const { title, description } = surveyInfo;

    if (!isEmpty(title) && !isEmpty(description)) {
      createSurveyAction({
        ...surveyInfo,
        survey: JSON.stringify(newSurvey),
      }, token, () => { history.push('/admin/assessment/list'); });
    } else {
      this.setState(oldState => ({
        titleState: isEmpty(title) ? 'error' : 'success',
        descriptionState: isEmpty(description) ? 'error' : 'success',
        surveyInfo: { ...oldState.surveyInfo, survey: newSurvey },
      }));
    }
  };

  render() {
    const { classes } = this.props;
    const {
      loading, surveyInfo, titleState, descriptionState, mode,
    } = this.state;
    const survey = {
      surveyInfo, titleState, descriptionState, mode,
    };
    return (
      <Card>
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={70}
          color="#123abc"
          loading={loading}
        />
        <CardHeader color="rose" text>
          <CardIcon color="rose">
            <Poll />
          </CardIcon>
          <h3 className={classes.cardIconTitle}>Add Assessment</h3>
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
)(AssessmentQuestionCreate);
