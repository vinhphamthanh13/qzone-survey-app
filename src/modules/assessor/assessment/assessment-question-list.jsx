import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Checkbox,
} from '@material-ui/core';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Alert from 'react-s-alert';
import { Delete } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import ReactTooltip from 'react-tooltip';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import listPageStyle from 'assets/jss/material-dashboard-pro-react/modules/listPageStyle';
import { fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey } from 'services/api/assessment';
import { checkAuth } from 'services/api/auth';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { sessionService } from 'redux-react-session';
import { classesType } from 'types/global';
import { SURVEY_APP_URL } from '../../../constants';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

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
  }

  constructor(props) {
    super(props);
    this.state = {
      sweetAlert: '',
      deleteAll: false,
      loading: true,
      token: '',
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
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  warningWithConfirmMessage = (SID = '') => {
    const { classes } = this.props;

    this.setState({
      sweetAlert: (
        <SweetAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(SID)}
          onCancel={() => this.setState({ sweetAlert: '' })}
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
          cancelBtnCssClass={`${classes.button} ${classes.danger}`}
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover the Assessment!
        </SweetAlert>
      ),
      deleteAll: false,
    });
  }

  successDelete = (SID) => {
    const {
      deleteSurvey: deleteSurveyAction, deleteAllSurvey: deleteAllSurveyAction,
      fetchSurveys, classes,
    } = this.props;
    const { token } = this.state;
    let api = deleteAllSurveyAction;

    if (SID) {
      api = deleteSurveyAction;
    }

    api(SID, token, () => {
      this.setState({
        sweetAlert: (
          <SweetAlert
            success
            style={{ display: 'block', marginTop: '-100px' }}
            title="Deleted!"
            onConfirm={() => this.setState({ sweetAlert: '' })}
            onCancel={() => this.setState({ sweetAlert: '' })}
            confirmBtnCssClass={classes.success}
          >
            Assessment has been deleted.
          </SweetAlert>
        ),
      });
      fetchSurveys(token);
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    Alert.closeAll();
    Alert.success('Copied', {
      position: 'bottom-right',
      effect: 'bouncyflip',
    });
  }

  render() {
    const { classes, surveyList } = this.props;
    const { loading, deleteAll, sweetAlert } = this.state;

    return (
      surveyList && surveyList.length >= 0
      && (
        <GridContainer>
          <ClipLoader
            className={override}
            sizeUnit="px"
            size={70}
            color="#123abc"
            loading={loading}
          />
          <GridItem xs={12}>
            <Card>
              <CardBody>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={deleteAll || false}
                          onChange={() => this.setState(oldState => ({
                            deleteAll: !oldState.deleteAll,
                          }))}
                        />
                      </TableCell>
                      <TableCell key="title">
                        Title
                      </TableCell>
                      <TableCell />
                      <TableCell>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {deleteAll && <Link to="#" data-tip="Delete" onClick={() => this.warningWithConfirmMessage('')}><Delete /></Link>}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(surveyList)
                      .map((surveyItem, index) => (
                        <TableRow hover key={surveyItem.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell><Link data-tip="Show Survey" to={`/assessment/show/${surveyItem.id}`}>{surveyItem.title}</Link></TableCell>
                          <TableCell>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link style={iconStyle} data-tip="Delete Survey" to="#" onClick={() => this.warningWithConfirmMessage(surveyItem.id)}><Delete /></Link>
                            <CopyToClipboard text={`${SURVEY_APP_URL}/surveys/${surveyItem.id}`}>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <Link data-tip="Copy Link" to="#" onClick={this.handleClick}><LinkIcon /></Link>
                            </CopyToClipboard>
                          </TableCell>
                          <TableCell>
                            <ReactTooltip />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {sweetAlert}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )
    );
  }
}

function mapStateToProps(state) {
  return { surveyList: state.surveys.list };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, {
    fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey, checkAuth,
  }),
)(AssessorAssessmentQuestionList);
