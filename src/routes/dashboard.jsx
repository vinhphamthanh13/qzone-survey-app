import DashboardIcon from "@material-ui/icons/Dashboard";
import { Person } from "@material-ui/icons";
import Dashboard from "modules/dashboard/dashboard";
import Profile from "modules/profile/profile";
import AssessmentResponseList from "modules/participant/assessment/assessment-response-list";
import AdminAssessmentQuestionList from "modules/admin/assessment/assessment-question-list";
import AssessorAssessmentQuestionList from "modules/assessor/assessment/assessment-question-list";
import AssessmentResponseResult from "modules/participant/assessment/assessment-response-result";
import AssessmentQuestionnaire from "modules/shared/assessment-questionnaire";
import AssessmentQuestionEdit from "modules/shared/assessment-question-edit";
import AssessmentQuestionCreate from "modules/admin/assessment/assessment-question-create";

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
    pathTo: '/participant/assessment/assessment-responses',
  },
  {
    path: "/participant/assessment/assessment-responses",
    name: "Assessments",
    icon: Person,
    component: AssessmentResponseList
  },
];

export const assessorRoutes = [
  {
    redirect: true,
    path: '/',
    pathTo: '/assessor/assessment/list',
  },
  {
    path: "/assessor/assessment/list",
    name: "Assessment Questions",
    icon: Person,
    component: AssessorAssessmentQuestionList
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
    path: "/admin/assessment/list",
    name: "Assessments",
    icon: Person,
    component: AdminAssessmentQuestionList
  },
  
];

export const otherRoutes = [
  {
    path: "/participant/assessment/result/:sid/:pid",
    name: "Assessment Resposne Result",
    component: AssessmentResponseResult
  },
  {
    path: "/assessment/show/:id",
    name: "Assessments Question",
    component: AssessmentQuestionnaire
  },
  {
    path: "/assessment/edit/:id",
    name: "Assessment Question Edit",
    component: AssessmentQuestionEdit
  },
  {
    path: "/admin/assessment/create",
    name: "Assessment Create",
    icon: Person,
    component: AssessmentQuestionCreate
  },
 ];
