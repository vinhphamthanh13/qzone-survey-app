import axios from 'axios';

export const FETCH_SURVEYS = 'fetch_surveys';

export function fetchSurveys() {
  const request = axios.get(`http://45.117.170.211:8090/listAllSurvey`)
  console.log(request)
  console.log("kkkkkkkkkkkkkkk")
  return {
    type: FETCH_SURVEYS,
    payload: request
  };
}

