import Dashboard from "layouts/Dashboard.jsx";
import SurveyResponse from "layouts/SurveyResponse.jsx";

var indexRoutes = [
  { path: "/surveys/:id", name: "SurveyResponse", component: SurveyResponse},
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
