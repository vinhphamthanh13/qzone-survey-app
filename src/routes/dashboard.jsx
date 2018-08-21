// import SurveyForm from "views/SurveyForm/SurveyForm.jsx";
import SurveyList from "views/Survey/SurveyList.jsx";
import SurveyCreate from "views/Survey/SurveyCreate.jsx";


export const dashboardRoutes = [
  
];

export const otherRoutes=[
  {
    path: "/survey/list",
    name: "Survey List",
    component: SurveyList
  },
  {
    path: "/survey/create",
    name: "Survey Create",
    component: SurveyCreate
  },
  // {
  //   path: "/survey/form",
  //   name: "Survey Form",
  //   component: SurveyForm
  // },
]
