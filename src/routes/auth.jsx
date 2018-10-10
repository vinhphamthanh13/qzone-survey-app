import RegisterPage from "modules/auth/register-page";
import LoginPage from "modules/auth/login-page";

import { PersonAdd,Fingerprint } from "@material-ui/icons";

const authRoutes = [
  {
    path: "/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/register",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
];

export default authRoutes;
