import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { FormControl, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar'
import BuyerProfileForm from '../SignUp/BuyerSignUpForm'
import BuyerSignUpSidebar from '../Sidebars/BuyerSignUpSidebar'
import BuyerSignInForm from '../SignIn/BuyerSignInForm'



export class BuyerHomePage extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <BuyerSignInForm />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        SignedUpFlag: state.user.authFlag,
        username: state.user.emailId
    }
}

export default connect(mapStateToProps)(BuyerHomePage);
