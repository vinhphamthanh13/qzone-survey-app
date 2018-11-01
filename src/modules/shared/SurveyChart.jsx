import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { classesType } from 'type/global';
import { compose } from 'redux';
import { connect } from 'react-redux';
import chartsStyle from 'assets/jss/material-dashboard-pro-react/modules/chartsStyle';
import withStyles from '@material-ui/core/styles/withStyles';
// import ChartistGraph from 'react-chartist';
// import Timeline from '@material-ui/icons/Timeline';
import { fetchSurveyChart } from 'services/api/assessment-response';

class SurveyChart extends PureComponent {
  static propTypes = {
    fetchSurveyChart: PropTypes.func.isRequired,
    sId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { fetchSurveyChart: fetchSurveyChartAction, sId } = this.props;
    fetchSurveyChartAction(sId);
  }

  render() {
    return (
      <Fragment>
        <p>
          Chart Bar
        </p>
      </Fragment>
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
