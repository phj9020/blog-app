import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import TopBar from './components/TopBar';
import './reset.css';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Setting from './routes/Setting';
import Single from './routes/Single';
import Write from './routes/Write';
import About from './routes/About';
import { useContextState } from './context/Context';

function App() {
  const state = useContextState();
  const user = state.user;
  
  return (
      <Router>
        <TopBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" >
            {user ? <Home /> : <Login />}
          </Route>
          <Route path="/register" >
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/setting" >
            {user ? <Setting /> : <Home />}
          </Route>
          <Route path="/write" >
            {user ? <Write /> : <Home />}
          </Route>
          <Route path="/about" >
            <About />
          </Route>
          <Route path="/post/:id" >
            <Single />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>

      </Router>
  );
}

export default App;
