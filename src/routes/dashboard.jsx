import DashboardIcon from "@material-ui/icons/Dashboard";
import {  Person } from "@material-ui/icons";
import SurveyQuestionnaire from "views/Survey/SurveyQuestionnaire.jsx";
import SurveyList from "views/Survey/SurveyList.jsx";
import SurveyCreate from "views/Survey/SurveyCreate.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import Profile from "views/Profile/Profile.jsx";
import SurveyEdit from "views/Survey/SurveyEdit.jsx";
import ParticipantList from "views/Participant/ParticipantList.jsx";
import ParticipantResponseResult from "views/Participant/ParticipantResponseResult.jsx";
import ParticipantDetail from "views/Participant/ParticipantDetail.jsx";

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
    path: "/admin/survey/list",
    name: "Survey List",
    icon: Person,
    component: SurveyList
  },
  
  
];
export const otherRoutes=[
  {
    path: "/admin/survey/create",
    name: "Survey Create",
    component: SurveyCreate
  },
  {
    path: "/admin/survey/show/:id",
    name: "Survey Questionnaire",
    component: SurveyQuestionnaire
  },
  {
    path: "/admin/survey/edit/:id",
    name: "Survey Edit",
    component: SurveyEdit
  },
  {
    path: "/admin/survey/participants/:sid",
    name: "Participant List",
    component: ParticipantList
  },
  {
    path: "/admin/survey/p_result/:sid/:pid",
    name: "Participant Result",
    component: ParticipantResponseResult
  },
  {
    path: "/admin/survey/p_detail/:sid/:pid",
    name: "Participant Detail",
    component: ParticipantDetail
  }

]
