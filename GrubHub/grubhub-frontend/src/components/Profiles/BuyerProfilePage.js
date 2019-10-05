import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'




export class BuyerProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buyerName: '',
            readonly: '',
            emailId: '',
            Address: '',
            userPassword: '',
            phoneNumber: '',
            id:''
        }
    }



    componentWillMount() {
        var emailId = cookie.load('cookie1');
        var id = cookie.load('cookie2');
        console.log("id  "+id)
        console.log(emailId)
        
        if (emailId) {
            console.log("able to read cookie");
            let buyerName = cookie.load('cookie3');
           
            console.log(buyerName);
            this.setState({
               
                buyerName: buyerName//,
                //Address: Address,
                //phoneNumber: phoneNumber
            });


            axios({
                method: 'get',
                url: 'http://localhost:3001/profile',
                params: { "emailId": emailId, "table": "buyerTable" },
                config: { headers: { 'Content-Type': 'application/json' } }
            })
                .then((response) => {
                    if (response.status >= 500) {
                        throw new Error("Bad response from server");
                    }
                    console.log(response);
                    return response.data;
                })
                .then((responseData) => {
                    if (responseData.buyerName != null) {
                        this.setState({
                            buyerName: buyerName
                        });
                    }
                    if (responseData.phoneNumber != null) {
                        this.setState({
                            phoneNumber: responseData.phoneNumber
                        });
                    }
                    if (responseData.Address != null) {
                        this.setState({
                            Address: responseData.Address
                        });
                    }

                }).catch(function (err) {
                    console.log(err)
                });
        }
    }
    onClose() {
        this.setState({ preview: null })
    }

    updateProfile = async (event) => {
        event.preventDefault();
        var emailId = cookie.load('cookie1');
        var id = cookie.load('cookie2');

        console.log("In update profile cookie 1 " + emailId)

        console.log("In update profile cookie 2 " + id)
        const formData = new FormData(event.target);
        let givenName = formData.get('buyerName')
        console.log("Data " + formData.get('phoneNumber'))

        console.log("Data " + formData.get('buyerName'))
        await axios({
            method: 'post',
            url: 'http://localhost:3001/updateProfile',
            data: {
                "emailId": emailId, "table": "buyerTable",
                "buyerName": formData.get('buyerName'),
                "phoneNumber": formData.get('phoneNumber'),
                "Address": formData.get('Address'), 
                "id":id
            },
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                console.log(response);
                return response.data;
            })
            .then((responsedata) => {
                alert("Sucessfully edited");
                
                //window.location.reload();
            }).catch(function (err) {
                console.log(err)
            });


    }

    render() {
        return (
            <div>
                <h4>Your account</h4>

                <Form onSubmit={this.updateProfile}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="buyerName" defaultValue={this.state.buyerName} required readOnly={this.state.readonly}/>
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="Address" placeholder="1234 Main St" defaultValue={this.state.Address} required readOnly={this.state.readonly}/>
                        </Form.Group>

                    <Form.Group controlId="formBasicphoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="phoneNumber" defaultValue={this.state.phoneNumber} required readOnly={this.state.readonly} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                    Update Profile
                     </Button>
                </Form>
            </div>
        )
    }
}

export default BuyerProfilePage