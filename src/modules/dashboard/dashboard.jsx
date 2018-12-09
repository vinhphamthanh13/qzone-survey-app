import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import chartsStyle from 'assets/jss/material-dashboard-pro-react/modules/chartsStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchSurveys } from 'services/api/assessment';
import { checkAuth } from 'services/api/user';
import { classesType } from 'types/global';
import SurveyChart from 'modules/shared/SurveyChart';
import Timeline from '@material-ui/icons/Timeline';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Dashboard extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    checkAuth: PropTypes.func.isRequired,
    fetchSurveys: PropTypes.func.isRequired,
    surveyList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      listAssessments: [],
      isDataLoading: [],
    };
  }

  componentDidMount() {
    const { fetchSurveys: fetchSurveysAction, checkAuth: checkAuthAction } = this.props;
    checkAuthAction((session) => {
      if (session) {
        fetchSurveysAction(session.token);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { surveyList } = nextProps;
    this.gatherSurveyIds(surveyList);
    this.initChartLoading(surveyList);
  }

  initChartLoading = (list) => {
    const isDataLoading = list.map((_, ind) => ({ [ind]: false }));
    this.setState({ isDataLoading });
  };

  gatherSurveyIds = (surveyList) => {
    const surveys = surveyList.length
      ? surveyList.map(survey => ({ id: survey.id, title: survey.title }))
      : [];
    this.setState({ listAssessments: surveys });
  };

  loadChartDataHandler = (index) => {
    const { isDataLoading } = this.state;
    const isLoading = !isDataLoading[index][index];
    const newDataLoading = isDataLoading.map((_, ind) => ({ [ind]: false }));
    // const newDataLoading = isDataLoading.slice();
    newDataLoading[index][index] = isLoading;
    this.setState({ isDataLoading: newDataLoading });
  };

  render() {
    const { classes } = this.props;
    const { listAssessments, isDataLoading } = this.state;
    const listAssessmentsLen = listAssessments.length;
    let chartDashBoard = listAssessments.map((assessment, index) => (
      <ExpansionPanel
        key={assessment.id}
        expanded={isDataLoading[index][index]}
        onChange={() => { this.loadChartDataHandler(index); }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.columnOrder}>
            {index + 1}
          </Typography>
          <Typography className={classes.columnTitle}>
            {assessment.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          { isDataLoading[index][index]
          && <SurveyChart sId={assessment.id} loadData={isDataLoading[index][index]} />
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>));
    if (Object.is(listAssessments, null)) {
      chartDashBoard = <Loading isLoading />;
    } else if (listAssessmentsLen === 0) {
      chartDashBoard = <CustomInfo content="There is no Chart data of Assessment." />;
    }
    return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Timeline />
          </CardIcon>
          <div>
            <h3 className={classes.chartTitle}>
              Charts
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          { chartDashBoard }
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  surveyList: state.surveys.list,
});

export default compose(
  withStyles(chartsStyle),
  connect(mapStateToProps, { fetchSurveys, checkAuth }),
)(Dashboard);
