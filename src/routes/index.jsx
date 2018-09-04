import Dashboard from "layouts/Dashboard.jsx";
import SurveyResponse from "layouts/SurveyResponse.jsx";
import Auth from "layouts/Auth.jsx";

var indexRoutes = [
  // { path: '/login', name: "Auth", component: Auth },
  { path: '/register', name: "Auth", component: Auth },
  { path: "/surveys/:id", name: "SurveyResponse", component: SurveyResponse},
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
