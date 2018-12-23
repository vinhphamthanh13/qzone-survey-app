import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import chartsStyle from 'assets/jss/material-dashboard-pro-react/modules/chartsStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import ChartistGraph from 'react-chartist';
// import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import { classesType } from 'types/global';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import { fetchSurveyChart } from 'services/api/assessment-response';

class SurveyChart extends PureComponent {
  static defaultProps = {
    surveyChartData: {},
  };

  static propTypes = {
    classes: classesType.isRequired,
    surveyChartData: PropTypes.objectOf(PropTypes.any),
    fetchSurveyChart: PropTypes.func.isRequired,
    sId: PropTypes.string.isRequired,
    loadData: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      chart: {},
    };
  }

  componentDidMount() {
    const {
      fetchSurveyChart: fetchSurveyChartAction, sId, loadData,
    } = this.props;
    if (loadData) {
      fetchSurveyChartAction(sId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { surveyChartData: { chartBars } } = nextProps;
    const labels = [];
    const series = [];
    let queSorted = {};
    if (chartBars) {
      const queResult = {};
      chartBars.map((chart) => {
        const { question, listSelectedItems } = chart;
        queResult[question.replace(/question(\d+)/, '$1')] = listSelectedItems;
        queSorted = this.sortObject(queResult);
        return chart;
      });
    }
    const queKeys = Object.keys(queSorted);
    if (queKeys.length) {
      queKeys.map((question) => {
        labels.push(`Q${question}`);
        queSorted[question].map((item, ind) => {
          const { questionItem, numSelected } = item;
          series[ind] = series[ind] ? [...series[ind]] : [];
          series[ind].push({ meta: questionItem, value: numSelected });
          // series[ind].push(numSelected);
          return numSelected;
        });
        return question;
      });
      // console.log(Object.keys(queSorted));
    }
    this.setState({
      chart: {
        labels: labels.length === 0 ? null : labels,
        series: series.length === 0 ? null : series,
      },
    });
  }

  sortObject = obj => Object.keys(obj).sort().reduce(
    (r, k) => Object.assign(r, { [k]: obj[k] }), {},
  );

  drawingChart = state => ({
    data: state.chart,
    options: {
      seriesBarDistance: 10,
      stackBars: false,
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: true,
        scaleMinSpace: 100,
      },
      height: '300px',
      stretch: true,
      plugins: [
        // Chartist.plugins.tooltip({
        //   class: classes.chartToolTip,
        //   appendToBody: false,
        // }),
      ],
    },
    responsiveOptions: [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 15,
          axisX: {
            labelInterpolationFnc(value) {
              return value[0];
            },
          },
          axisY: {
            scaleMinSpace: 15,
          },
        },
      ],
    ],
    animation: {
      draw(data) {
        if (data.type === 'bar') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * 80,
              dur: 500,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  });

  render() {
    const { classes } = this.props;
    const chartData = this.drawingChart(this.state, classes);
    const chartDrawing = chartData.data.labels ? (
      <ChartistGraph
        data={chartData.data}
        type="Bar"
        options={chartData.options}
        listener={chartData.animation}
        className="ct-bar ct-major-twelfth"
      />) : <CustomInfo content="There is no data for statistics from the assessment" />;
    return (chartDrawing);
  }
}

const mapStateToProps = state => ({
  surveyChartData: state.surveyParticipantAnswer.surveyChartData,
});

export default compose(
  withStyles(chartsStyle),
  connect(mapStateToProps, { fetchSurveyChart }),
)(SurveyChart);
