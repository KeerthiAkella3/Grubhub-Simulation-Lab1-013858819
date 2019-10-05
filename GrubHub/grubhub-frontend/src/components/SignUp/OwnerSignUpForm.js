import React, { Component } from 'react'
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { Redirect } from 'react-router'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class OwnerProfileForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerName: "",
            emailId: "",
            password: "",
            restaurentName: "",
            phoneNumber: "",
            cuisine: "",
            Address: "",
            finishedSignUp: false,
            message: ""
        }

        this.ownerNameChangeHandler = this.ownerNameChangeHandler.bind(this)
        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.restaurentNameChangeHandler = this.restaurentNameChangeHandler.bind(this)
        this.phoneNumberChangeHandler = this.phoneNumberChangeHandler.bind(this)
        this.AddressChangeHandler = this.AddressChangeHandler.bind(this)
        this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this)
        this.submitOwnerSignUp = this.submitOwnerSignUp.bind(this)
    }
    ownerNameChangeHandler = (e) => {
        this.setState({
            ownerName: e.target.value
        })
    }
    emailIdChangeHandler = (e) => {
        this.setState({
            emailId: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    restaurentNameChangeHandler = (e) => {
        this.setState({
            restaurentName: e.target.value
        })
    }
    phoneNumberChangeHandler = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    cuisineChangeHandler = (e) => {
        this.setState({
            cuisine: e.target.value
        })

    }
    AddressChangeHandler = (e) => {
        this.setState({
            Address: e.target.value
        })
    }

    submitOwnerSignUp = (e) => {
        //console.log("in submit ")
        e.preventDefault();
        const data = {
            ownerName: this.state.ownerName,
            emailId: this.state.emailId,
            password: this.state.password,
            restaurentName: this.state.restaurentName,
            phoneNumber: this.state.phoneNumber,
            cuisine: this.state.cuisine,
            Address: this.state.Address
        }
        //console.log("data is..")
        //console.log(data);

        this.setState({
            message: "Owner already exists"
        })

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/ownerSignUp', data)
            .then(response => {
                console.log("frontend")
                console.log("Status Code : ", response.status);
                console.log("In response")
                console.log(response)
                if (response.data.responseMessage === "Successfully Added!") {
                    this.setState({
                        finishedSignUp: true,
                        message: "Owner signed up successfully"
                    })
                } else {
                    this.setState({
                        finishedSignUp: false,
                        message: "Owner already exists"
                    })

                }
            });
    }

    render() {
        var nextpage = null
        if (this.state.finishedSignUp === true) {
            nextpage = <Redirect to="/OwnerSignIn" />
        }
        return (
            <div>
                {nextpage}
                <center>
                    <br></br>
                    <Card style={{ width: '22rem' }} >
                        <br></br>
                        <h3>Create your account</h3>
                        <br></br>
                        <center>
                            <Form style={{ width: '18rem' }}>
                                <Form.Group controlId="formGridName" >
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control placeholder="Ryan Gosling" required type="text" name="ownerName" onChange={this.ownerNameChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter email" name="emailId" onChange={this.emailIdChangeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" required placeholder="Password" required name="password" onChange={this.passwordChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formGridPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control required placeholder="### ### ####" input type="text" name="phoneNumber" maxLength="15" onChange={this.phoneNumberChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formGridRetaurentName" >
                                    <Form.Label>Retaurent Name</Form.Label>
                                    <Form.Control placeholder="Dusita" required type="text" name="restaurentName" onChange={this.restaurentNameChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formGridCuisine" >
                                    <Form.Label>Cuisine</Form.Label>
                                    <Form.Control placeholder="Thai" required type="text" name="cuisine" onChange={this.cuisineChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Restaurent Address</Form.Label>
                                    <Form.Control placeholder="1234 Main St, city, state" required input type="text" name="address" onChange={this.addressChangeHandler} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.submitOwnerSignUp}>
                                    Create your account
                                </Button>

                            </Form>
                            <br></br>
                        </center>
                    </Card>
                </center>
            </div>
        )
    }
}

export default OwnerProfileForm