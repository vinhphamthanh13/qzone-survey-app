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
import AlertMessage from 'components/Alert/Message';
import { Delete, QuestionAnswer as QAIcon, Email as EIcon } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import ReactTooltip from 'react-tooltip';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import DeletionModal from 'modules/shared/deletion-modal';
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
    user: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteAll: false,
      token: '',
      isOpenDeleteSurvey: false,
      sId: '',
      dialogType: CTA.DELETE,
      cachedSurveyList: null,
      assessorEmail: null,
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

  componentWillReceiveProps(nextProps) {
    const { surveyList, user: { detail: { email } } } = nextProps;
    this.setState({ cachedSurveyList: surveyList, assessorEmail: email });
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
      fetchSurveysAction();
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    Alert.closeAll();
    Alert.success(<AlertMessage>Assessment link is copied!</AlertMessage>);
  };

  render() {
    const { classes } = this.props;
    const {
      deleteAll, isOpenDeleteSurvey, sId,
      dialogType, cachedSurveyList, assessorEmail,
    } = this.state;
    let disableDeleteAll = true;
    let assessmentList = null;
    if (Object.is(cachedSurveyList, null) || Object.is(cachedSurveyList, undefined)) {
      assessmentList = <Loading isLoading />;
    } else if (cachedSurveyList.length === 0) {
      assessmentList = <CustomInfo content="There is no Assessment in your list" />;
    } else {
      disableDeleteAll = false;
      assessmentList = (
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" className={classes.order}>
                <Checkbox
                  className={classes.deleteAllChecked}
                  checked={deleteAll || false}
                  onChange={this.deleteAllShowingHandler}
                  disabled={disableDeleteAll}
                />
              </TableCell>
              <TableCell key="title">
                Title
              </TableCell>
              <TableCell>
                {deleteAll
                && (
                  <React.Fragment>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                      to="#"
                      data-tip="Delete all assessments"
                      onClick={() => this.onOpenSurveyDeleteHandler('')}
                    >
                      <Delete />
                    </Link>
                    <ReactTooltip className={classes.assessTooltip} />
                  </React.Fragment>)
                }
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cachedSurveyList.map((surveyItem, index) => (
              <TableRow hover key={surveyItem.id}>
                <TableCell padding="checkbox" className={classes.order}>{index + 1}</TableCell>
                <TableCell><Link data-tip="Show assessment" to={`/assessment/show/${surveyItem.id}`}>{surveyItem.title}</Link></TableCell>
                <TableCell>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link style={iconStyle} data-tip="Delete assessment" to="#" onClick={() => this.onOpenSurveyDeleteHandler(surveyItem.id)}><Delete /></Link>
                  <CopyToClipboard text={`${SURVEY_APP_URL}/surveys/${surveyItem.id}`}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link style={iconStyle} data-tip="Copy assessment link" to="#" onClick={this.handleClick}><LinkIcon /></Link>
                  </CopyToClipboard>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a style={iconStyle} data-tip="Send Email" href={`mailto:${assessorEmail}`}><EIcon /></a>
                </TableCell>
                <TableCell>
                  <ReactTooltip className={classes.assessTooltip} />
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>);
    }

    const deletionPopup = isOpenDeleteSurvey
      ? (
        <DeletionModal
          openDialog={isOpenDeleteSurvey}
          closeDialog={this.onCloseDeleteSurveyHandler}
          itemId={sId}
          itemDeleteHandler={this.successDelete}
          type={dialogType}
          itemName="Assessment"
        />
      ) : null;

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
        {deletionPopup}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveyList: state.surveys.list || [],
    user: state.user,
  };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {
    fetchSurveys, fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey, checkAuth,
  }),
)(AssessorAssessmentQuestionList);
