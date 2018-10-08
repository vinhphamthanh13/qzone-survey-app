import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import {surveyLocalData} from "../constants"
console.log(' init private route');
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      Storage.local.get(surveyLocalData.USER_TYPE) 
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)