// import DashboardIcon from "@material-ui/icons/Dashboard";
// import {  Person,
//           ContentPaste,
//           BusinessCenter,
//           Report,
//           BubbleChart,
//           LocationOn,
//         } from "@material-ui/icons";
// import Dashboard from "views/Dashboard/Dashboard.jsx";
// import Administration from "views/Administration/Administration.jsx";
// import BusinessDetails from "views/BusinessDetails/BusinessDetails.jsx";
// import BusinessEdit from "views/BusinessDetails/BusinessEdit.jsx";
// import Calendar from "views/Calendar/Calendar.jsx";
// import CustomerFlow from "views/CustomerFlow/CustomerFlow.jsx";
// import ProviderDetails from "views/Provider/ProviderDetails.jsx";
// import ProviderCreate from "views/Provider/ProviderCreate.jsx";
// import ProviderEdit from "views/Provider/ProviderEdit.jsx";
// import Reports from "views/Reports/Reports.jsx";
import SurveyList from "views/Survey/SurveyList.jsx";
import SurveyCreate from "views/Survey/SurveyCreate.jsx";


export const dashboardRoutes = [
  
];

export const otherRoutes=[
  {
    path: "/survey/list",
    name: "Survey List",
    component: SurveyList
  },
  {
    path: "/survey/create",
    name: "Survey Create",
    component: SurveyCreate
  },
]
