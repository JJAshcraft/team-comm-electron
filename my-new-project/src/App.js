import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ScreensLogin from "./screens/Login";
import ScreensRegister from "./screens/Register";
import ScreensMeetingList from "./screens/MeetingList";
import { connect } from "react-redux";

import styled from "styled-components";
import Header from "./components/Header";
import { Logo, Overpane } from "./components/Common";
import CreateMeeting from "./components/CreateMeeting";
import socketClient from "./components/socketClient";
import Meeting from "./components/Meeting";

import { toggleOverpane } from "./actions/index";

import UserPreferences from "./components/UserPreferences";
import hook from "css-modules-electron/register";
import "./App.css";

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  background: #374353;
  background-position: fixed;
  color: #374353;
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 5rem 25rem 5rem;
`;

const FadedLogo = styled(Logo)`
  margin-left: 35px;
  margin-top: 10px;
`;

const Content = styled.div`
  grid-column: 1/3;
  grid-row: 2;
`;

const Footer = styled.div`
  grid-column: 2;
  grid-row: 4;
  background: black;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper history={this.props.history}>
        <FadedLogo src="../images/logo.png" width="190x" height="60px" />
        <Header history={this.props.history} />
        <Route
          exact
          path="/"
          render={props =>
            this.props.logInSuccess ? (
              <Redirect history={props.history} to="/dashboard" />
            ) : (
              <Redirect history={props.history} to="/landing" />
            )
          }
        />
        <Switch>
          <Route exact path="/landing" component={ScreensLanding} />
          <Content>
            <Route
              exact
              path="/register"
              render={props => {
                return <ScreensRegister history={this.props.history} />;
              }}
            />
            <Route exact path="/meeting/:id" component={Meeting} />
            <Route path="/dashboard/:token?" component={ScreensMeetingList} />
            <Route path="/preferences" component={UserPreferences} />
            <Route path="/createMeeting" component={CreateMeeting} />
          </Content>
        </Switch>
        <ScreensLogin />
      </AppWrapper>
    );
  }
}
// export default App;
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { toggleOverpane }
)(App);
