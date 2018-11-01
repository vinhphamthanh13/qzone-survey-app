import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import chartsStyle from 'assets/jss/material-dashboard-pro-react/modules/chartsStyle';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
} from '@material-ui/core';
// import Card from 'components/Card/Card';
// import CardBody from 'components/Card/CardBody';
// import CardIcon from 'components/Card/CardIcon';
// import CardHeader from 'components/Card/CardHeader';
// import Timeline from '@material-ui/icons/Timeline';
import { fetchSurveys } from 'services/api/assessment';
import { checkAuth } from 'services/api/user';
import { classesType } from 'types/global';
import SurveyChart from 'modules/shared/SurveyChart';
// import {CopyToClipboard} from "react-copy-to-clipboard";

//
// const delays2 = 80;
// const durations2 = 500;
// const labels = ['Question1', 'Question2', 'Question3', 'Question4'];
// const series = [
//   [40, 40, 60, 0],
//   [20, 20, 40, 0],
//   [20, 20, 0, 0],
//   [20, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 20, 0, 0],
// ];
// const multipleBarsChart = {
//   data: {
//     labels,
//     series,
//   },
//   options: {
//     seriesBarDistance: 10,
//     stackBars: false,
//     axisX: {
//       showGrid: false,
//     },
//     height: '300px',
//   },
//   responsiveOptions: [
//     [
//       'screen and (max-width: 640px)',
//       {
//         seriesBarDistance: 5,
//         axisX: {
//           labelInterpolationFnc(value) {
//             return value[0];
//           },
//         },
//       },
//     ],
//   ],
//   animation: {
//     draw(data) {
//       if (data.type === 'bar') {
//         data.element.animate({
//           opacity: {
//             begin: (data.index + 1) * delays2,
//             dur: durations2,
//             from: 0,
//             to: 1,
//             easing: 'ease',
//           },
//         });
//       }
//     },
//   },
// };

// const simpleChartData = {
//   labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//   series: [
//     [800000, 1200000, 1400000, 1300000],
//     [200000, 400000, 500000, 300000],
//     [100000, 200000, 400000, 600000]
//   ]

// }

// const options = {
//   stackBars: true
// }

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
      sId: '',
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
  }

  gatherSurveyIds = (surveyList) => {
    const surveys = surveyList.length
      ? surveyList.map(survey => ({ id: survey.id, title: survey.title }))
      : [];
    this.setState({ listAssessments: surveys });
  };

  viewChart = (id) => {
    this.setState({ sId: id });
  };

  render() {
    const { classes } = this.props;
    const { listAssessments, sId } = this.state;
    console.log('surveyIds', listAssessments);
    return (
      <div className={classes.legendTitle}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Assessment Name</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              { listAssessments.length && listAssessments.map((assessment, ind) => (
                <TableRow key={assessment.id}>
                  <TableCell>{ind + 1}</TableCell>
                  <TableCell>{assessment.title}</TableCell>
                  <TableCell>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link data-tip="View Chart" to="#" onClick={() => { this.viewChart(assessment.id); }}>View Chart</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <SurveyChart id={sId} />
      </div>
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
