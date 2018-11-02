import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter';
import CardHeader from 'components/Card/CardHeader';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import * as Survey from 'survey-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSurvey } from 'services/api/assessment';
import AssessmentQuestionCreateCopy from 'modules/admin/assessment/assessment-question-create-copy';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Poll } from '@material-ui/icons';
import { sessionService } from 'redux-react-session';
import fullName from 'utils/fullName';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { classesType, historyType, matchType } from 'types/global';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

Survey.Survey.cssType = 'bootstrap';
Survey.defaultBootstrapCss.navigationButton = 'btn btn-green';
let surveyInfo = '';
class AssessmentQuestionCopy extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    match: matchType.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    survey: PropTypes.objectOf(PropTypes.object).isRequired,
    history: historyType.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editCopy: false,
      surveyData: {
        title: '',
        description: '',
        logo: '',
        privacy: false,
        loading: true,
        id: '',
        survey: '',
        user: '',
      },
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchSurvey: fetchSurveyAction, loading } = this.props;
    sessionService.loadSession().then(curSession => fetchSurveyAction(id, curSession.token));
    this.setState(oldState => ({ ...oldState, loading }));
  }

  componentWillReceiveProps(nextProps) {
    const { surveyData } = this.state;
    if (nextProps.survey) {
      Object.keys(nextProps.survey).forEach((key) => {
        if (key === 'survey' && nextProps.survey.survey !== '') {
          surveyData[key] = JSON.parse(nextProps.survey.survey);
        } else if (key === 'title') {
          surveyData[key] = `${nextProps.survey.title} - copied`;
        } else {
          surveyData[key] = nextProps.survey[key];
        }
      });
      surveyData.loading = false;
      this.setState(oldState => ({ ...oldState.surveyData, ...surveyData }));
    }
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/admin/assessment/list');
  };

  copySurveyHandle = () => {
    this.setState(() => ({ editCopy: true }));
  };

  render() {
    const { classes, history } = this.props;
    const {
      editCopy,
      surveyData,
      surveyData: {
        title, description, survey, logo, user,
      },
      loading,
    } = this.state;

    surveyInfo = new Survey.Model(survey);
    surveyInfo.mode = 'display';
    if (!survey) { return null; }
    return (
      <GridContainer>
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={70}
          color="#123abc"
          loading={loading}
        />
        <GridItem xs={12}>
          { editCopy
            ? <AssessmentQuestionCreateCopy history={history} surveyInfo={surveyData} />
            : (
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="rose">
                    <Poll />
                  </CardIcon>
                  <h3 className={classes.cardIconTitle}>Copy Assessment</h3>
                  <Button size="md" onClick={this.copySurveyHandle} className={classes.buttonDisplay}>
                    Edit
                  </Button>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Title:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <h4>{title}</h4>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Logo:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <img src={logo} alt="survey logo" />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Description:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <h4>
                        {description}
                      </h4>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={3}>
                      <h4>Assessor:</h4>
                    </GridItem>
                    <GridItem xs={12} sm={7}>
                      <h4>
                        {fullName(user)}
                      </h4>
                    </GridItem>
                  </GridContainer>
                  <hr />
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <Survey.Survey model={surveyInfo} />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    onClick={this.goBack}
                  >
                    Back
                  </Button>
                </CardFooter>
              </Card>)
          }
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return { survey: state.surveys.detail, loading: state.surveys.loading };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey }),
)(AssessmentQuestionCopy);
