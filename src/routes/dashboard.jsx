import DashboardIcon from "@material-ui/icons/Dashboard";
import { Person } from "@material-ui/icons";
import SurveyQuestionnaire from "views/Survey/SurveyQuestionnaire";
import SurveyList from "views/Survey/SurveyList";
import SurveyCreate from "views/Survey/SurveyCreate";
import Dashboard from "views/Dashboard/Dashboard";
import Profile from "views/Profile/Profile";
import SurveyEdit from "views/Survey/SurveyEdit";
import ParticipantList from "views/Participant/ParticipantList";
import ParticipantResponseResult from "views/Participant/ParticipantResponseResult";
import ParticipantDetail from "views/Participant/ParticipantDetail";
import ParticipantResponseCreate from "views/Participant/ParticipantResponseCreate";

export const commonRoutes = [
  {
    path: "/profile",
    name: "My Profile",
    icon: Person,
    component: Profile
  },
];

export const participantRoutes = [
  {
    redirect: true,
    path: '/',
    pathTo: '/participants/survey/survey-answers',
  },
  {
    path: "/participants/survey/survey-answers",
    name: "Assessments",
    icon: Person,
    component: ParticipantList
  },
];

export const adminRoutes = [
  {
    redirect: true,
    path: '/',
    pathTo: '/admin/dashboard',
  },
  {
    path: "/admin/dashboard",
    name: "Assessment Chart",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    path: "/admin/survey/list",
    name: "Assessments",
    icon: Person,
    component: SurveyList
  },
];

export const otherRoutes = [
  {
    path: '/survey/:id',
    name: 'Assessment Answer',
    component: ParticipantResponseCreate,
  },
  {
    path: "/admin/survey/create",
    name: "Assessment Create",
    component: SurveyCreate
  },
  {
    path: "/survey/show/:id",
    name: "Assessments Details",
    component: SurveyQuestionnaire
  },
  {
    path: "/admin/survey/edit/:id",
    name: "Assessment Edit",
    component: SurveyEdit
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
];
