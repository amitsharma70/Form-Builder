import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import authService from "./services/authService";
import MyForms from "./components/myForms";
import FormResponses from "./components/FormResponses";
import FormDetails from "./components/Formdetails";
import AllForms from "./components/AllForms";
import "./App.css"; // Import the CSS file

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!authService.getToken());

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">Form Builder</Link>
          </div>
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <Link to="/create" className="nav-link">
                  Create Form
                </Link>
                <Link to="/myforms" className="nav-link">
                  My Forms
                </Link>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
        <h1 className="welcome-heading">Welcome to the Form Builder</h1>          <AllForms />
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </Route>
        <Route path="/register">
          {isLoggedIn ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/create">
          {isLoggedIn ? <FormBuilder /> : <Redirect to="/login" />}
        </Route>
        <Route path="/forms">
          {isLoggedIn ? <MyForms /> : <Redirect to="/login" />}
        </Route>
        <Route path="/forms/:formId">
          {isLoggedIn ? <FormResponses /> : <Redirect to="/login" />}
        </Route>
        <Route path="/myforms" exact>
          <MyForms />
        </Route>
        <Route path="/form/:id" component={FormDetails} />
        <Route path="*">
          <h1>404 - Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
