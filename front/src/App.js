import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/LandingPages/MainPage";

import Auth from "./hoc/auth";

const Wrapper = styled.div`
    position: absolute;
    text-align:center;
    left:25%;
    top:15%;
    width:50vw;
    @media (max-width: 768px){
        left:5%;
        top:15%;
        width:90vw;
    } 
`;

const App = () => {
  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(MainPage, true)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)} />
        </Switch>
      </Router>
    </Wrapper>
  );
}

export default App;