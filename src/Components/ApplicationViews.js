import { Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Map from "./home/Map";
import AddGymForm from "./gym/CreateGym";
import GymDetails from "./gym/GymDetails";
import UpdateGym from "./gym/UpdateGym";
import AddClassForm from "./classesOffered/CreateClass";
import UpdateClass from "./classesOffered/UpdateClass"

const ApplicationViews = () => {
  const { isAuthenticated } = useSimpleAuth();

  return (
    <React.Fragment>
      <Route
        path="/register"
        render={props => {
          return <Register {...props} />;
        }}
      />

      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
      />

      <Route
        exact
        path="/"
        render={props => {
          return <Map {...props} />;
        }}
      />
      <Route
        exact
        path="/addgym"
        render={props => {
          return <AddGymForm {...props} />;
        }}
      />
      <Route
        exact
        path="/gyms/:gymId(\d+)"
        render={props => {
          return <GymDetails {...props} />;
        }}
      />
      <Route
        exact
        path="/editgym/:gymId(\d+)"
        render={props => {
          return <UpdateGym {...props} />;
        }}
      />
      <Route
        exact
        path="/createclass/:gymId(\d+)"
        render={props => {
          return <AddClassForm {...props} />;
        }}
      />
      <Route
        exact
        path="/editclass/:classId(\d+)"
        render={props => {
          return <UpdateClass {...props} />;
        }}
      />
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
