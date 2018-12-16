import {
  Person as PersonIcon, Timeline as TimelineIcon, Poll as PollIcon, Group as GroupIcon,
  QuestionAnswer as QAIcon, GroupOutlined as GroupOutlinedIcon,
} from '@material-ui/icons';
import Dashboard from 'modules/dashboard/dashboard';
import Profile from 'modules/profile/profile';
import AssessmentResponseList from 'modules/participant/assessment/assessment-response-list';
import AdminAssessmentQuestionList from 'modules/admin/assessment/assessment-question-list';
import AssessorAssessmentQuestionList from 'modules/assessor/assessment/assessment-question-list';
import AssessmentResponseResult from 'modules/participant/assessment/assessment-response-result';
import AssessmentQuestionnaire from 'modules/shared/assessment-questionnaire';
import AssessmentQuestionCopy from 'modules/shared/assessment-question-copy';
import AssessmentQuestionEdit from 'modules/shared/assessment-question-edit';
import AssessmentQuestionCreate from 'modules/admin/assessment/assessment-question-create';
import ParticipantList from 'modules/sponsor/participant-list';
import CreateUser from 'modules/admin/create-user';

export const commonRoutes = [
  {
    path: '/profile',
    name: 'My Profile',
    icon: PersonIcon,
    component: Profile,
  },
];

export const participantRoutes = [
  {
    path: '/participant/assessment/answers',
    name: 'Assessments',
    icon: PollIcon,
    component: AssessmentResponseList,
  },
];

export const assessorRoutes = [
  {
    path: '/assessor/assessment/list',
    name: 'Assessment Questions',
    icon: QAIcon,
    component: AssessorAssessmentQuestionList,
  },
];

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'Assessment Chart',
    icon: TimelineIcon,
    component: Dashboard,
  },
  {
    path: '/admin/assessment/list',
    name: 'Assessments',
    icon: PollIcon,
    component: AdminAssessmentQuestionList,
  },
  {
    path: '/admin/user/list',
    name: 'User Management',
    icon: GroupIcon,
    component: CreateUser,
  },
];

export const sponsorRoutes = [
  {
    path: '/sponsor/participant/list',
    name: 'Participants',
    icon: GroupOutlinedIcon,
    component: ParticipantList,
  },
];

export const otherRoutes = [
  {
    path: '/assessment/result/:sid/:pid',
    name: 'Assessment Response Result',
    component: AssessmentResponseResult,
  },
  {
    path: '/assessment/show/:id',
    name: 'Assessments Question',
    component: AssessmentQuestionnaire,
  },
  {
    path: '/assessment/edit/:id',
    name: 'Assessment Question Edit',
    component: AssessmentQuestionEdit,
  },
  {
    path: '/admin/assessment/create',
    name: 'Assessment Create',
    component: AssessmentQuestionCreate,

  },
  {
    path: '/admin/assessment/copy/:id',
    name: 'Copy Survey',
    component: AssessmentQuestionCopy,
  },
];
