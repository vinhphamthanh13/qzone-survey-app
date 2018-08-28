import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";

const listPageStyle = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  buttonDisplay:{
    position: "absolute",
    right: 0,
    top: 10,
    backgroundColor: "#d81b60",
    "&:hover,&:focus": {
      backgroundColor: "#d81b60"
    }
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  ...buttonStyle
};
export default listPageStyle;