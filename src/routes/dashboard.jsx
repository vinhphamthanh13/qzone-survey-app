import DashboardIcon from "@material-ui/icons/Dashboard";
import {  Person } from "@material-ui/icons";
import SurveyForm from "views/Survey/SurveyForm.jsx";
import SurveyList from "views/Survey/SurveyList.jsx";
import SurveyCreate from "views/Survey/SurveyCreate.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import Profile from "views/Profile/Profile.jsx";


export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard    
  },
  {
    path: "/profile",
    name: "My Profile",
    icon: Person,
    component: Profile
  },
  {
    path: "/survey/list",
    name: "Survey List",
    icon: Person,
    component: SurveyList
  },
  
  
];
export const otherRoutes=[
  {
    path: "/survey/create",
    name: "Survey Create",
    component: SurveyCreate
  },
  {
    path: "/survey/form",
    name: "Survey Form",
    component: SurveyForm
  },
]
