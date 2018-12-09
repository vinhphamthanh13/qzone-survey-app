import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Checkbox,
} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Alert from 'react-s-alert';
import { Delete, QuestionAnswer as QAIcon } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import ReactTooltip from 'react-tooltip';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import DeleteAssessment from 'modules/shared/delete-assessment';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import {
  fetchSurveys, fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey,
} from 'services/api/assessment';
import { checkAuth } from 'services/api/user';
import { sessionService } from 'redux-react-session';
import { classesType } from 'types/global';
import { SURVEY_APP_URL, CTA } from '../../../constants';
import CardHeader from '../../../components/Card/CardHeader';
import CardIcon from '../../../components/Card/CardIcon';


const iconStyle = {
  marginRight: 30,
};

class AssessorAssessmentQuestionList extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    surveyList: PropTypes.arrayOf(PropTypes.object).isRequired,
    checkAuth: PropTypes.func.isRequired,
    fetchSurveysByAssessorId: PropTypes.func.isRequired,
    fetchSurveys: PropTypes.func.isRequired,
    deleteSurvey: PropTypes.func.isRequired,
    deleteAllSurvey: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteAll: false,
      token: '',
      isOpenDeleteSurvey: false,
      sId: '',
      dialogType: CTA.DELETE,
    };
  }

  componentDidMount() {
    const {
      checkAuth: checkAuthAction,
      fetchSurveysByAssessorId: fetchSurveysByAssessorIdAction,
    } = this.props;
    checkAuthAction(async (session) => {
      if (session) {
        this.setState({ token: session.token });
        sessionService.loadUser().then((currentUser) => {
          fetchSurveysByAssessorIdAction(currentUser.userId, session.token);
        });
      }
    });
  }

  onOpenSurveyDeleteHandler = (SID = '') => {
    this.setState({
      isOpenDeleteSurvey: true,
      sId: SID,
      dialogType: 'delete',
      deleteAll: SID === '',
    });
  };

  onCloseDeleteSurveyHandler = () => {
    this.setState({ isOpenDeleteSurvey: false });
  };

  deleteAllShowingHandler = () => {
    const { surveyList } = this.props;
    if (surveyList.length) {
      this.setState(prevState => ({
        deleteAll: !prevState.deleteAll,
      }));
    }
  };

  successDelete = (SID) => {
    const {
      deleteSurvey: deleteSurveyAction,
      deleteAllSurvey: deleteAllSurveyAction,
      fetchSurveys: fetchSurveysAction,
    } = this.props;

    const { token } = this.state;
    let api = deleteAllSurveyAction;

    if (SID) {
      api = deleteSurveyAction;
    }

    api(SID, token, () => {
      this.setState({
        dialogType: CTA.DELETE_CONFIRMED,
        deleteAll: false,
      });
      fetchSurveysAction(token);
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    Alert.closeAll();
    Alert.success('Copied');
  };

  render() {
    const { classes, surveyList } = this.props;
    const {
      deleteAll, isOpenDeleteSurvey, sId, dialogType,
    } = this.state;
    const surveyListLen = surveyList.length;
    const deleteAllCheckboxStatus = !surveyListLen;

    let assessmentList = (
      <Table className={classes.table} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                className={classes.deleteAllChecked}
                checked={deleteAll || false}
                onChange={this.deleteAllShowingHandler}
                disabled={deleteAllCheckboxStatus}
              />
            </TableCell>
            <TableCell key="title">
              Title
            </TableCell>
            <TableCell>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              {deleteAll && <Link to="#" data-tip="Delete" onClick={() => this.onOpenSurveyDeleteHandler('')}><Delete /></Link>}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {surveyList.map((surveyItem, index) => (
            <TableRow hover key={surveyItem.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell><Link data-tip="Show Survey" to={`/assessment/show/${surveyItem.id}`}>{surveyItem.title}</Link></TableCell>
              <TableCell>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link style={iconStyle} data-tip="Delete Survey" to="#" onClick={() => this.onOpenSurveyDeleteHandler(surveyItem.id)}><Delete /></Link>
                <CopyToClipboard text={`${SURVEY_APP_URL}/surveys/${surveyItem.id}`}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link data-tip="Copy Link" to="#" onClick={this.handleClick}><LinkIcon /></Link>
                </CopyToClipboard>
              </TableCell>
              <TableCell>
                <ReactTooltip />
              </TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    );
    if (Object.is(surveyList, null)) {
      assessmentList = <Loading isLoading={!surveyList} />;
    } else if (surveyListLen === 0) {
      assessmentList = <CustomInfo content="There is no assessment in your box" />;
    }
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose"><QAIcon /></CardIcon>
                <h3 className={classes.cardIconTitle}>Assessments</h3>
              </CardHeader>
              <CardBody>
                {assessmentList}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <DeleteAssessment
          openDialog={isOpenDeleteSurvey}
          closeDialog={this.onCloseDeleteSurveyHandler}
          surveyId={sId}
          surveyDeleteHandler={this.successDelete}
          type={dialogType}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { surveyList: state.surveys.list || null };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {
    fetchSurveys, fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey, checkAuth,
  }),
)(AssessorAssessmentQuestionList);
