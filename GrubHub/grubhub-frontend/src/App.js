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
import BuyerProfilePage from './components/Profiles/BuyerProfilePage'
import BuyerPicture from './components/Profiles/BuyerPicture'
import OwnerPicture from './components/Profiles/OwnerPicture'
import CompOwnerPage from './components/OwnerPages/CompOwnerPage';
import BuyerHomePage from './components/BuyerPages/BuyerHomePage';
import BuyerSearchPage from './components/BuyerPages/BuyerSearchPage';
import BuyerDetailsPage from './components/BuyerPages/BuyerDetailsPage';
import LandingPage from './components/LandingPage/LandingPage'
// import buyerOrdersPage from './components/BuyerPages/BuyerOrdersPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/BuyerSignUp" component={BuyerSignUp} />
        <Route path="/OwnerSignUp" component={OwnerSignUp} />
        <Route path="/BuyerSignIn" component={BuyerSignIn} />
        <Route path="/OwnerSignIn" component={OwnerSignIn} />
        <Route path="/BuyerProfilePage" component={BuyerProfilePage} />
        <Route path="/BuyerPicture" component={BuyerPicture} />
        <Route path="/OwnerPicture" component={OwnerPicture} />
        <Route path='/buyerHomePage' component={BuyerHomePage}/>
        <Route path='/ownerHomePage' component={CompOwnerPage}/>
        <Route path="/buyerSearchPage" component={BuyerSearchPage}/>
        <Route path='/restaurantDetailsPage' component={BuyerDetailsPage}/>
        {/* <Route path='/buyerOrdersPage' component={BuyerOrdersPage}/> */}
      </div>
    </Router>
  );
}

export default App;
