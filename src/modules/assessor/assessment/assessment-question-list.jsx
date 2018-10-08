import React from "react";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Alert from 'react-s-alert';
import { Delete, FileCopy } from "@material-ui/icons";
import ReactTooltip from 'react-tooltip';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/modules/listPageStyle.jsx";
import { fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey } from "services/api/assessment";
import { checkAuth } from 'services/api/auth';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { SURVEY_APP_URL } from '../../../constants';
import { sessionService } from 'redux-react-session';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const iconStyle = {
  marginRight: 30
};

class AssessorAssessmentQuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetAlert: '',
      deleteAll: false,
      loading: true,
      token: '',
      userId:'',
    }
  }

  componentDidMount() {
    this.props.checkAuth(async (session) => {
      if (session) {
        this.setState({ token: session.token });
        sessionService.loadUser().then(currentUser => {
          this.props.fetchSurveysByAssessorId(currentUser.userId, session.token);
        })
      }
    });
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  warningWithConfirmMessage(id) {
    var SID = ""
    if (id) {
      SID = id
    }
    this.setState({
      sweetAlert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(SID)}
          onCancel={() => this.setState({ sweetAlert: '' })}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover the Assessment!
        </SweetAlert>
      ),
      deleteAll: false
    });
  }

  successDelete = (SID) => {
    var api = ""
    if (SID) {
      api = this.props.deleteSurvey
    }
    else
      api = this.props.deleteAllSurvey
    api(SID, this.state.token, (response) => {
      this.setState({
        sweetAlert: (
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() =>
              this.setState({ sweetAlert: '' }
              )}
            onCancel={() => this.setState({ sweetAlert: '' })}
            confirmBtnCssClass={
              this.props.classes.success
            }
          >
            Assessment has been deleted.
          </SweetAlert>
        )
      });
      this.props.fetchSurveys(this.state.token)
    })
  }

  handleClick(e) {
    e.preventDefault();
    Alert.closeAll()
    Alert.success('Copied', {
      position: 'bottom-right',
      effect: 'bouncyflip'
    });
  }

  render() {
    const { classes, surveyList } = this.props;

    return (
      surveyList && surveyList.length >= 0 &&
      <GridContainer>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={70}
          color={'#123abc'}
          loading={this.state.loading}
        />
        <GridItem xs={12}>
          <Card>
            <CardBody>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        checked={this.state.deleteAll || false}
                        onChange={(event) => this.setState({ deleteAll: !this.state.deleteAll })}
                      />
                    </TableCell>
                    <TableCell
                      key={'title'}
                    >
                      Title
                    </TableCell>
                    <TableCell />
                    <TableCell>
                      {this.state.deleteAll && <Link to="#" data-tip='Delete' onClick={() => this.warningWithConfirmMessage("")}><Delete /></Link>}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(surveyList)
                    .map((n, index) => {
                      return (
                        <TableRow
                          hover
                          key={index}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell><Link data-tip='Show' to={`/assessment/show/${n.id}`}>{n.title}</Link></TableCell>
                          <TableCell>
                            <Link style={iconStyle} data-tip='Delete' to="#" onClick={() => this.warningWithConfirmMessage(n.id)}><Delete /></Link>
                            <CopyToClipboard text={`${SURVEY_APP_URL}/surveys/${n.id}`}
                            >
                              <Link data-tip='Copy Link' to="#" onClick={this.handleClick}><FileCopy /></Link>
                            </CopyToClipboard>
                          </TableCell>
                          <TableCell>
                            <ReactTooltip />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
              {this.state.sweetAlert}
              <Alert stack={true} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

AssessorAssessmentQuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
  surveyList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return { surveyList: state.surveys.list };
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurveysByAssessorId, deleteSurvey, deleteAllSurvey, checkAuth }),
)(AssessorAssessmentQuestionList);
