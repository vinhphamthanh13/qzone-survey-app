import PropTypes from "prop-types";
import React from 'react';
import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ChartistGraph from 'react-chartist';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Timeline from "@material-ui/icons/Timeline";

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;
const multipleBarsChart = {
  data: {
    labels: [
      "Q1",
      "Q2",
      "Q3",
      "Q4",
      "Q5",
      "Q6",
      "Q7",
      "Q8",
      "Q9",
      "Q10",
      "Q11",
      "Q12"
    ],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
    ]
  },
  options: {
    seriesBarDistance: 10,
    stackBars: true,
    axisX: {
      showGrid: false
    },
    height: "300px"
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
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

class Dashboard extends React.Component{
  render(){
    const { classes } = this.props;
    return(
      <div>
        
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Timeline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
              Survey Title <small>- Bar Chart</small>
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

    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(chartsStyle)(Dashboard);
