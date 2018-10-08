import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import SurveyEditor from 'modules/shared/SurveyEditor.jsx';
import { fetchUserTypeList } from 'services/api/auth.jsx';
import Assessor from 'modules/assessor/assessor.jsx';
import { sessionService } from 'redux-react-session';

var editor = false
class SurveyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'ASSESSOR',
      token: '',
      assessorList: ''
    }
  }

  componentWillMount() {
    sessionService.loadSession().then(currentSession => {
      this.setState({ token: currentSession.token }, () => {
        this.props.fetchUserTypeList(this.state)
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assessorList: nextProps.AssessorList })
  }

  reloadAssessorList = () => {
    this.props.fetchUserTypeList(this.state)
  }

  render() {
    const { classes, survey } = this.props;
    const { surveyInfo, titleState, descriptionState, mode } = survey
    if (mode === 'create' || surveyInfo.survey)
      editor = true
    if (!this.state.assessorList)
      return <div></div>
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              *Title
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              labelText="Title"
              success={titleState === "success"}
              value={surveyInfo.title || ''}
              error={titleState === "error"}
              id="title"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.props.change(event, "title", "title"),
                type: "text"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              *Description
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              labelText="Description"
              id="description"
              success={descriptionState === "success"}
              error={descriptionState === "error"}
              value={surveyInfo.description || ''}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.props.change(event, "description"),
                type: "text"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Assessor
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <FormControl
              fullWidth
              className={classes.selectFormControl}
            >
              <Select
                value={surveyInfo.userId || ''}
                onChange={event =>
                  this.props.change(event, "userId")}
                classes={{ select: classes.select }}
                style={{ paddingTop: '20px' }}
              >
                {(this.state.assessorList).map(assessor => (
                  <MenuItem
                    key={assessor.id}
                    value={assessor.id}
                  >
                    {assessor.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <Assessor classes={classes} reloadAssessorList={this.reloadAssessorList} />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Logo
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              id="logo"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.props.change(event, "logo"),
                type: "file"
              }}
              style={{ paddingTop: '20px' }}

            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel
              className={
                classes.labelHorizontal +
                " " +
                classes.labelHorizontalRadioCheckbox
              }
            >
              Privacy
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomCheckbox
              value=""
              checked={surveyInfo.privacy || false}
              label=""
              onClick={event => this.props.change(event, "privacy")}
              classes={classes}
            />
          </GridItem>
        </GridContainer>

        <hr />
        <GridContainer>
          {editor && <SurveyEditor change={this.props.changeQuestions} data={surveyInfo.survey} />}
        </GridContainer>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { AssessorList: state.user.userTypeList }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, { fetchUserTypeList })
)(SurveyForm);