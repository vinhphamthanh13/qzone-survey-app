import Dashboard from 'layouts/dashboard';
import Auth from 'layouts/auth';
import AssessmentResponse from 'layouts/assessment-response';

const indexRoutes = [
  {
    exact: true, strict: true, path: '/login', name: 'Auth', component: Auth,
  },
  {
    exact: true, strict: true, path: '/register', name: 'Auth', component: Auth,
  },
  {
    exact: true, strict: true, path: '/surveys/:id', name: 'AssessmentResponse', component: AssessmentResponse,
  },
  { path: '/', name: 'Home', component: Dashboard },
];

export default indexRoutes;
