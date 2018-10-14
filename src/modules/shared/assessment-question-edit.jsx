import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CardIcon from 'components/Card/CardIcon';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import SurveyForm from 'modules/shared/SurveyForm';
import { fetchSurvey, editSurvey, toggleLoading } from 'services/api/assessment';
import { Poll } from '@material-ui/icons';
import { isEmpty } from 'lodash';
import { sessionService } from 'redux-react-session';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { Storage } from 'react-jhipster';
import { surveyLocalData, eUserType } from '../../constants';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

let userType;
class AssessmentQuestionEdit extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    toggleLoading: PropTypes.func.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    editSurvey: PropTypes.func.isRequired,
    survey: PropTypes.objectOf(PropTypes.object).isRequired,
    match: PropTypes.objectOf(PropTypes.object).isRequired,
    history: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      surveyInfo: null,
      titleState: '',
      descriptionState: '',
      mode: 'edit',
      edit: false,
      token: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchSurvey: fetchSurveyAction } = this.props;
    this.setState({ edit: true });
    sessionService.loadSession().then((currentSession) => {
      this.setState({ token: currentSession.token }, () => {
        fetchSurveyAction(id, currentSession.token);
      });
    });
    if (Storage.local.get(surveyLocalData.USER_TYPE)) {
      userType = Storage.local.get(surveyLocalData.USER_TYPE);
    }
    setTimeout(() => this.setState({ loading: false }), 2000);
  }

  componentWillReceiveProps(nextProps) {
    const { surveyInfo: oldSurveyInfo } = this.state;
    if (oldSurveyInfo === null && nextProps.survey.survey) {
      const surveyInfo = {};
      Object.keys(nextProps.survey).forEach((key) => {
        if (key === 'survey' && nextProps.survey.survey !== '') {
          surveyInfo[key] = JSON.parse(nextProps.survey.survey);
        } else if (key === 'user') {
          surveyInfo.userId = nextProps.survey.user.id;
        } else {
          surveyInfo[key] = nextProps.survey[key];
        }
      });
      this.setState({ surveyInfo });
    }
  }

  change = (event, stateName) => {
    event.persist();
    this.setState(oldState => ({
      [`${stateName}State`]: isEmpty(event.target.value) ? 'error' : 'success',
      surveyInfo: {
        ...oldState.surveyInfo,
        [stateName]: event.target.value || event.target.checked,
      },
    }));
  }

  changeQuestions = (newSurvey) => {
    const { surveyInfo, token } = this.state;
    const {
      toggleLoading: toggleLoadingAction, editSurvey: editSurveyAction, history,
    } = this.props;
    const { title, description } = surveyInfo;

    if (!isEmpty(title) && !isEmpty(description)) {
      toggleLoadingAction();
      editSurveyAction({
        ...surveyInfo,
        survey: JSON.stringify(newSurvey),
      }, token, () => {
        toggleLoadingAction();
        if (userType === eUserType.admin) {
          history.push('/admin/assessment/list');
        } else {
          history.push('/assessor/assessment/list');
        }
      });
    } else {
      this.setState({
        surveyInfo: { ...surveyInfo, survey: newSurvey },
        titleState: isEmpty(title) ? 'error' : 'success',
        descriptionState: isEmpty(description) ? 'error' : 'success',
      });
    }
  }

  render() {
    const {
      loading, surveyInfo, titleState,
      descriptionState,
      mode,
      edit,
    } = this.state;
    const survey = {
      surveyInfo,
      titleState,
      descriptionState,
      mode,
      edit,
    };
    const { classes, match: { params: { id } } } = this.props;

    return (
      surveyInfo
      && (
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
            <h3 className={classes.cardIconTitle}>Edit Assessment</h3>
            <Link to={`/assessment/show/${id}`} className={classes.linkDisplay}>
              <u>Back</u>
            </Link>
          </CardHeader>
          <CardBody>
            <SurveyForm
              survey={survey}
              change={this.change}
              changeQuestions={this.changeQuestions}
              classes={classes}
            />
          </CardBody>
        </Card>
      )
    );
  }
}

function mapStateToProps(state) {
  return { survey: state.surveys.detail };
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, { fetchSurvey, editSurvey, toggleLoading }),
)(AssessmentQuestionEdit);
