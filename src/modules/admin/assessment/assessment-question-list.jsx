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
import { Delete, FileCopy, Poll } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import ReactTooltip from 'react-tooltip';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import {
  fetchSurveys, deleteSurvey, deleteAllSurvey,
} from 'services/api/assessment';
import DeletionModal from 'modules/shared/deletion-modal';
import { checkAuth } from 'services/api/user';
import { classesType, historyType } from 'types/global';
import Loading from 'components/Loader/Loading';
import CustomInfo from 'components/CustomInfo/CustomInfo';
import { SURVEY_APP_URL, CTA } from '../../../constants';

const iconStyle = {
  marginRight: 30,
};

class AdminAssessmentQuestionList extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    surveyList: PropTypes.arrayOf(PropTypes.object).isRequired,
    checkAuth: PropTypes.func.isRequired,
    fetchSurveys: PropTypes.func.isRequired,
    deleteSurvey: PropTypes.func.isRequired,
    deleteAllSurvey: PropTypes.func.isRequired,
    history: historyType.isRequired,
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
    const { checkAuth: checkAuthAction, fetchSurveys: fetchSurveysAction } = this.props;
    checkAuthAction(async (session) => {
      if (session) {
        fetchSurveysAction(session.token);
        this.setState({ token: session.token });
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
      this.setState({ dialogType: CTA.DELETE_CONFIRMED, deleteAll: false });
      fetchSurveysAction(token);
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    Alert.closeAll();
    Alert.success(<AlertMessage>Assessment link is copied!</AlertMessage>);
  };

  copySurvey = (id) => {
    const { history } = this.props;
    history.push(`/admin/assessment/copy/${id}`);
  };

  render() {
    const { classes, surveyList, history } = this.props;
    const {
      deleteAll, isOpenDeleteSurvey, sId, dialogType,
    } = this.state;
    let disableDeleteAll = true;
    let assessmentList = null;
    if (Object.is(surveyList, null) || Object.is(surveyList, undefined)) {
      assessmentList = <Loading isLoading />;
    } else if (surveyList.length === 0) {
      assessmentList = <CustomInfo content="There is no Assessment in your list!" />;
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
              <TableCell
                key="title"
              >
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
            {(surveyList)
              .map((surveyItem, index) => (
                <TableRow hover key={surveyItem.id}>
                  <TableCell padding="checkbox" className={classes.order}>{index + 1}</TableCell>
                  <TableCell><Link data-tip="Show Survey" to={`/assessment/show/${surveyItem.id}`}>{surveyItem.title}</Link></TableCell>
                  <TableCell>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link style={iconStyle} data-tip="Delete Survey" to="#" onClick={() => this.onOpenSurveyDeleteHandler(surveyItem.id)}><Delete /></Link>
                    <CopyToClipboard text={`${SURVEY_APP_URL}/surveys/${surveyItem.id}`}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link style={iconStyle} data-tip="Copy Link" to="#" onClick={this.handleClick}><LinkIcon /></Link>
                    </CopyToClipboard>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link data-tip="Clone Survey" to="#" onClick={() => this.copySurvey(surveyItem.id)}><FileCopy /></Link>
                  </TableCell>
                  <TableCell>
                    <ReactTooltip className={classes.assessTooltip} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    }
    const deletionPopup = isOpenDeleteSurvey ? (
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
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Poll />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>Assessments</h3>
                <Button size="md" className={classes.buttonDisplay} onClick={() => { history.push('/admin/assessment/create'); }}>
                  New Assessment
                </Button>
              </CardHeader>
              <CardBody>
                {assessmentList}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {deletionPopup}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    surveyList: state.surveys.list || [],
    survey: state.surveys.detail,
  };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {
    fetchSurveys, deleteSurvey, deleteAllSurvey, checkAuth,
  }),
)(AdminAssessmentQuestionList);
