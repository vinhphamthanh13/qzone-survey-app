// ##############################
// // // ValidationForms view styles
// #############################

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const validationFormsStyle = theme => ({
  ...customCheckboxRadioSwitch,
  ...customSelectStyle,
  ...modalStyle,
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  formCategory: {
    marginBottom: "0",
    color: "#999999",
    fontSize: "14px",
    padding: "10px 0 10px"
  },
  center: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  registerButton: {
    float: "right"
  },
  buttonDisplay:{
    position: "absolute",
    right: 0,
    top: 10,
    backgroundColor: "#303f9f",
    "&:hover,&:focus": {
      backgroundColor: "#303f9f"
    }
  },
  linkDisplay:{
    position: "absolute",
    right: 0,
    top: 10,
    // backgroundColor: "#303f9f",
    "&:hover,&:focus": {
      // backgroundColor: "#303f9f"
    }
  },
  ...modalStyle(theme)
});

export default validationFormsStyle;

