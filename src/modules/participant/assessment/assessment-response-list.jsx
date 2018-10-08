import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import { Table, TableBody, TableCell, TableHead, TableRow, SvgIcon } from "@material-ui/core";
import {
  Poll,
  OpenInNew,
  CheckCircleOutlined,
  ErrorOutline,
} from "@material-ui/icons";
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { fetchSurveyAnswerByParticipantId } from "services/api/assessment-response";
import { fullName } from 'variables/FullName';
import { getUserFromSession, getTokenFromSession } from "../../../utils/session";
import { eSurveyStatus } from "../../../constants";

const rows = ["#", "Title", "Pariticipant name", "Pariticipant email", "", ""];

const overrideLoading = css`
    display: block !important;
    margin: 0 auto;
`;

class AssessmentResponseList extends React.Component {
  async componentDidMount() {
    console.log('>>AssessmentResponseList');
    const { userId } = await getUserFromSession();
    const { token } = await getTokenFromSession();
    this.props.fetchSurveyAnswerByParticipantId(userId, token);
  }
  render() {
    const { classes, surveyAnswers } = this.props;
    return (
      surveyAnswers && surveyAnswers.length >= 0 ?
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="rose">
                  <Poll />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>Assessments</h3>
              </CardHeader>
              <CardBody>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      {rows.map((row, index) => {
                        return (
                          <TableCell key={index}>
                            {row}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      surveyAnswers.map(({ participant, status, surveyId }, index) => {
                        return (
                          <TableRow key={participant.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {/*<Link to={status === eSurveyStatus.completed || status === eSurveyStatus.expired ?
                                `/participant/assessment/result/${surveyId}/${participant.id}` :
                                `/participant/assessment/${surveyId}`
                              }> */}
                                {surveyAnswers[index].surveyDTO.title}
                             {/*} </Link> */}
                            </TableCell>
                            <TableCell>{fullName(participant)}</TableCell>
                            <TableCell>{participant.email}</TableCell>
                            <TableCell>
                              <Link to={status === eSurveyStatus.completed || status === eSurveyStatus.expired ?
                                `/participant/assessment/result/${surveyId}/${participant.id}` :
                                `/participant/assessment/${surveyId}`
                              }>
                                <OpenInNew titleAccess="Open survey" />
                              </Link>
                            </TableCell>
                            <TableCell>
                              {status === eSurveyStatus.completed ?
                                <CheckCircleOutlined style={{ color: '#4caf50' }} titleAccess="Completed" /> :
                                status === eSurveyStatus.expired ?
                                  <ErrorOutline color="error" titleAccess="Expired" /> :
                                  <SvgIcon titleAccess="In progress">
                                    <path
                                      fill="#ff9800"
                                      d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M15.5,8.5L10.62,13.38L8.5,11.26L7.44,12.32L10.62,15.5L16.56,9.56L15.5,8.5M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37Z"
                                    />
                                  </SvgIcon>
                              }
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> :
        <ClipLoader
          className={overrideLoading}
          size={70}
          color={'#123abc'}
          loading={!surveyAnswers}
        />
    );

  }
}

function mapStateToProps(state) {
  return { surveyAnswers: state.surveyParticipantAnswer.sResponseByParticipant }
}

AssessmentResponseList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurveyAnswerByParticipantId }),
)(AssessmentResponseList);
