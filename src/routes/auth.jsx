import RegisterPage from 'modules/auth/register-page';
// import LoginPage from 'modules/auth/login-page';
import Login from 'modules/auth/Login';

import { PersonAdd, Fingerprint } from '@material-ui/icons';

const authRoutes = [
  {
    path: '/login',
    name: 'Login Page',
    short: 'Login',
    mini: 'LP',
    icon: Fingerprint,
    component: Login,
  },
  {
    path: '/register',
    name: 'Register Page',
    short: 'Register',
    mini: 'RP',
    icon: PersonAdd,
    component: RegisterPage,
  },
];

export default authRoutes;
