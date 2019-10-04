import React from 'react';
import './App.css';
import './Form.css';
import Home from './components/LandingPage/Home';
import GettingStarted from './components/LandingPage/GettingStarted';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, } from 'react-router-dom';
import BuyerSignIn from './components/SignIn/BuyerSignIn';
import OwnerSignIn from './components/SignIn/OwnerSignIn';
import OwnerSignUp from './components/SignUp/OwnerSignUpForm';
import BuyerSignUp from './components/SignUp/BuyerSignUpForm';
import BuyerHomePage from './components/HomePages/BuyerHomePage';
import BuyerUpdate from './components/Profiles/BuyerProfilePage'
import OwnerUpdate from './components/Profiles/OwnerProfilePage'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={GettingStarted} />
        <Route path="/Home" component={Home} />
        <Route path="/BuyerSignUp" component={BuyerSignUp} />
        <Route path="/OwnerSignUp" component={OwnerSignUp} />
        <Route path="/BuyerSignIn" component={BuyerSignIn} />
        <Route path="/OwnerSignIn" component={OwnerSignIn} />
        <Route path="/BuyerHome" component={BuyerHomePage} />
        <Route path="/BuyerUpdate" component={BuyerUpdate} />
        <Route path="/OwnerUpdate" component={OwnerUpdate} />
      </div>
    </Router>
  );
}

export default App;
