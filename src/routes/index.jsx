import Dashboard from "layouts/dashboard";
import Auth from "layouts/auth";
import AssessmentResponse from "layouts/assessment-response";

var indexRoutes = [
  { path: '/login', name: "Auth", component: Auth },
  { path: '/register', name: "Auth", component: Auth },
  { path: "/surveys/:id", name: "AssessmentResponse", component: AssessmentResponse},
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;