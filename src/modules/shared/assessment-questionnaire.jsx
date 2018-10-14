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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Poll } from '@material-ui/icons';
import { sessionService } from 'redux-react-session';
import fullName from 'utils/fullName';
import { css } from 'react-emotion';
import { Storage } from 'react-jhipster';
import { ClipLoader } from 'react-spinners';
import { classesType, matchType, historyType } from 'types/global';
import { eUserType, surveyLocalData } from '../../constants';


let userType = 'ADMIN';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

Survey.Survey.cssType = 'bootstrap';
Survey.defaultBootstrapCss.navigationButton = 'btn btn-green';
let surveyInfo = '';
class AssessmentQuestionnaire extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    match: matchType.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    survey: PropTypes.objectOf(PropTypes.object).isRequired,
    user: PropTypes.objectOf(PropTypes.object).isRequired,
    history: historyType.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
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
    setTimeout(() => this.setState({ loading: false }), 1500);
    const { match: { params: { id } }, fetchSurvey: fetchSurveyAction } = this.props;
    sessionService.loadSession().then((currentSession) => {
      fetchSurveyAction(id, currentSession.token);
    });
    // userType
    if (Storage.local.get(surveyLocalData.USER_TYPE)) {
      userType = Storage.local.get(surveyLocalData.USER_TYPE);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { surveyData } = this.state;
    if (nextProps.survey) {
      Object.keys(nextProps.survey).forEach((key) => {
        if (key === 'survey' && nextProps.survey.survey !== '') {
          surveyData[key] = JSON.parse(nextProps.survey.survey);
          surveyData.title = nextProps.survey.title;
          surveyData.description = nextProps.survey.description;
          surveyData.user = nextProps.user;
        }
      });
      this.setState({ surveyData });
    }
  }

  goBack = () => {
    const { history } = this.props;
    if (userType === eUserType.admin) {
      history.push('/admin/assessment/list');
    } else {
      history.push('/assessor/assessment/list');
    }
  };

  render() {
    const { classes, history, match } = this.props;
    const {
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
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="rose">
                <Poll />
              </CardIcon>
              <h3 className={classes.cardIconTitle}>Assessment</h3>
              <Button size="md" onClick={() => { history.push(`/assessment/edit/${match.params.id}`); }} className={classes.buttonDisplay}>
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
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return { survey: state.surveys.detail, user: state.surveys.detail.user };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey }),
)(AssessmentQuestionnaire);
