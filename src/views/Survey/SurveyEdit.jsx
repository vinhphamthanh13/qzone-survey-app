import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import SurveyForm from "views/Survey/SurveyForm"
import { fetchSurvey, editSurvey, toggleLoading } from "actions/survey";
import { Poll } from "@material-ui/icons";
import { isEmpty } from 'lodash';
import { sessionService } from 'redux-react-session';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

var SID = ''
class SurveyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyInfo: null,
      titleState: '',
      descriptionState: '',
      mode: 'edit',
      token: ''
    }
  }

  componentDidMount() {
    SID = this.props.match.params.id;
    this.setState({ edit: true });
    sessionService.loadSession().then(currentSession => {
      this.setState({ token: currentSession.token }, () => {
        this.props.fetchSurvey(SID, this.state.token);
      })
    });
    setTimeout(() => this.setState({ loading: false }), 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.surveyInfo === null && nextProps.survey.survey) {
      const surveyInfo = {};
      for (let key in nextProps.survey) {
        if (key === 'survey' && nextProps.survey.survey !== '') {
          surveyInfo[key] = JSON.parse(nextProps.survey.survey)
        } else if (key === 'user') {
          surveyInfo['userId'] = nextProps.survey.user.id
        } else {
          surveyInfo[key] = nextProps.survey[key]
        }
      };
      this.setState({ surveyInfo })
    }
  }

  change = (event, stateName) => {
    event.persist();
    this.setState((oldState) => ({
      [`${stateName}State`]: isEmpty(event.target.value) ? 'error' : 'success',
      surveyInfo: {
        ...oldState.surveyInfo,
        [stateName]: event.target.value || event.target.checked,
      }
    }));
  }

  changeQuestions = (newSurvey) => {
    const { surveyInfo, token } = this.state;
    const { title, description } = surveyInfo;

    if (!isEmpty(title) && !isEmpty(description)) {
      this.props.toggleLoading();
      this.props.editSurvey({
        ...surveyInfo,
        survey: JSON.stringify(newSurvey),
      }, token, () => {
        this.props.toggleLoading();
        this.props.history.push('/admin/survey/list');
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
    const { loading, surveyInfo } = this.state;
    const { classes } = this.props;
    return (
      surveyInfo &&
      <Card>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={70}
          color={'#123abc'}
          loading={loading}
        />
        <CardHeader color="rose" text>
          <CardIcon color="rose">
            <Poll />
          </CardIcon>
          <h3 className={classes.cardIconTitle}>Edit Assessment</h3>
          <Link to={`/survey/show/${SID}`} className={classes.linkDisplay} >
            <u>Back</u>
          </Link>
        </CardHeader>
        <CardBody>
          <SurveyForm survey={this.state} change={this.change} changeQuestions={this.changeQuestions} classes={this.props.classes} />
        </CardBody>
      </Card>
    )
  }
}

SurveyEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  fetchSurvey: PropTypes.func.isRequired,
  editSurvey: PropTypes.func.isRequired,
  survey: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { survey: state.surveys.detail }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, { fetchSurvey, editSurvey, toggleLoading })
)(SurveyEdit);

