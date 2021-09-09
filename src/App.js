import React from "react"
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"

import Chats from "./components/Chats"
import Login from "./components/Login"

function App() {
  return (
      <div style={{fontFamily: 'Avenir'}}>
          <Router>
              <AuthProvider>
                  <Switch>
                      <Route path="/chats" component={Chats}/>
                      <Route path="/" component={Login}/>
                  </Switch>
              </AuthProvider>
          </Router>
          <div></div>
      </div>
  );
}

export default App;
