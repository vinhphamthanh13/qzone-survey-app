import React from 'react';
import chartsStyle from 'assets/jss/material-dashboard-pro-react/modules/chartsStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import ChartistGraph from 'react-chartist';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import Timeline from '@material-ui/icons/Timeline';
import { classesType } from 'types/global';

const delays2 = 80;
const durations2 = 500;
const labels = ['Question1', 'Question2', 'Question3', 'Question4'];
const series = [
  [40, 40, 60, 0],
  [20, 20, 40, 0],
  [20, 20, 0, 0],
  [20, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 20, 0, 0],
];
const multipleBarsChart = {
  data: {
    labels,
    series,
  },
  options: {
    seriesBarDistance: 10,
    stackBars: false,
    axisX: {
      showGrid: false,
    },
    height: '300px',
  },
  responsiveOptions: [
    [
      'screen and (max-width: 640px)',
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc(value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw(data) {
      if (data.type === 'bar') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  },
};

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

const Dashboard = ({ classes }) => (
  <div>
    <Card>
      <CardHeader color="rose" icon>
        <CardIcon color="rose">
          <Timeline />
        </CardIcon>
        <h4 className={classes.cardIconTitle}>
              Assessment
          {' '}
          <small>- Bar Chart</small>
        </h4>
      </CardHeader>
      <CardBody>
        <ChartistGraph
          data={multipleBarsChart.data}
          type="Bar"
          options={multipleBarsChart.options}
          listener={multipleBarsChart.animation}
        />
      </CardBody>
    </Card>
  </div>
);

Dashboard.propTypes = {
  classes: classesType.isRequired,
};

export default withStyles(chartsStyle)(Dashboard);
