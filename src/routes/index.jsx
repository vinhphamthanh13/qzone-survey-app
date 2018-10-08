import Dashboard from "layouts/dashboard.jsx";
import Auth from "layouts/auth.jsx";
import AssessmentResponse from "layouts/assessment-response.jsx";

var indexRoutes = [
  { path: '/login', name: "Auth", component: Auth },
  { path: '/register', name: "Auth", component: Auth },
  { path: "/surveys/:id", name: "AssessmentResponse", component: AssessmentResponse},
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;