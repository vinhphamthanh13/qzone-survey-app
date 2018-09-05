import React from 'react';
import PropTypes from "prop-types";
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";

var sid= '';
class ParticipantDetail extends React.Component{
  componentWillMount(){
    sid = this.props.match.params.sid
  }

	render() {
    const { classes } = this.props;
		return(
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Participant Detail</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          Not completed Yet!
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
        	<Button color="rose" href={`/admin/survey/participants/${sid}`}>
            Back To Participant List
          </Button>
        </CardFooter>
      </Card>
		)
	}
}

ParticipantDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(listPageStyle),
)(ParticipantDetail);

