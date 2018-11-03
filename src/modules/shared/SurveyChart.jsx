import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import chartsStyle from 'assets/jss/material-dashboard-pro-react/modules/chartsStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import { classesType } from 'types/global';
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
    if (chartBars) {
      chartBars.map((chart) => {
        const { question, listSelectedItems } = chart;
        labels.push(question);
        listSelectedItems.map((item, ind) => {
          const { questionItem, numSelected } = item;
          series[ind] = series[ind] ? [...series[ind]] : [];
          series[ind].push({ meta: questionItem, value: numSelected });
          return questionItem;
        });
        return chart;
      });
    }
    this.setState({ chart: { labels, series } });
  }

  drawingChart = (state, classes) => ({
    data: state.chart,
    options: {
      seriesBarDistance: 10,
      stackBars: false,
      axisX: {
        showGrid: false,
      },
      height: '300px',
      plugins: [
        Chartist.plugins.tooltip({
          class: classes.chartToolTip,
          appendToBody: false,
        }),
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
    return (
      <ChartistGraph
        data={chartData.data}
        type="Bar"
        options={chartData.options}
        listener={chartData.animation}
      />
    );
  }
}

const mapStateToProps = state => ({
  surveyChartData: state.surveyParticipantAnswer.surveyChartData,
});

export default compose(
  withStyles(chartsStyle),
  connect(mapStateToProps, { fetchSurveyChart }),
)(SurveyChart);
