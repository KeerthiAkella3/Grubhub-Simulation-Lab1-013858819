import React, { Component } from 'react'
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { Redirect } from 'react-router'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class BuyerSignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emailId: "",
            password: "",
            SignedUpFlag: false
        }

        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)

        this.submitBuyerLogin = this.submitBuyerLogin.bind(this)
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
    
    submitBuyerLogin = (e) => {
        console.log("in submit Login")
        e.preventDefault();
        const data = {
            emailId: this.state.emailId,
            password: this.state.password
        }
        this.setState({
            message: "Invalid Credentials"
        })
        console.log("data is..")
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/buyerSignIn', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Response from Sign Up " + response);
                console.log(response);
                if (response.data.responseMessage === 'User authenticated!') {
                    this.setState({
                        SignedUpFlag: true,
                        message: "Buyer Logged in successfully"
                    })
                } else {
                    this.setState({
                        SignedUpFlag: true,
                        message: "Invalid Credentials"
                    })
                }
            });
    }

    render() {
        var nextpage = null
        if (this.state.SignedUpFlag === true) {
            nextpage = <Redirect to="/buyerHomePage" />
        }
        return (
            <div>
                {nextpage}
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <center>
                <Card style={{ width: '22rem' }}>
                <br></br>
                <h4>Sign in with your Grubhub account</h4>
                <br></br>
                <center>
                <Form style={{ width: '18rem' }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required  name="emailId" onChange={this.emailIdChangeHandler}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required  name="password" onChange={this.passwordChangeHandler}/>
                    </Form.Group>
                    <Form.Text variant="danger">
                    {this.state.message}
                    </Form.Text>
                    <Button variant="danger" type="submit"onClick={this.submitBuyerLogin}>
                        Sign in
                    </Button>
                    <br></br>
                </Form>
                <br></br>
                </center>
                </Card>
                </center>
                {/* <form>

                    <label htmlFor="field2"><span>E-Mail ID<span className="required" >*</span></span><input type="text" className="input-field" name="emailId" onChange={this.emailIdChangeHandler} /></label><br />
                    <label htmlFor="field2"><span>Password<span className="required">*</span></span><input type="text" className="input-field" name="password" onChange={this.passwordChangeHandler} /></label><br />

                    <label><input type="submit" onClick={this.submitBuyerLogin} /></label>

                </form> */}
            </div>
        )
    }
}

export default BuyerSignInForm