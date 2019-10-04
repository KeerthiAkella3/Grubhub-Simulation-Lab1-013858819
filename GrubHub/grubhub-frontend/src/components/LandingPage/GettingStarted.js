import React, { Component } from 'react'
import {Container, Row, Col} from 'reactstrap'

class GettingStarted extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={5}><a href="/BuyerSignUp" className="c-button">Buyer Sign Up</a></Col>
                    <br/>
                    <Col xs={5}><a href="/OwnerSignUp" className="c-button">Owner Sign Up</a></Col>
                    <br/>
                    <Col xs={5}><a href="/BuyerSignIn" className="c-button">Buyer Sign In</a></Col>
                    <br/>
                    <Col xs={5}><a href="/OwnerSignIn" className="c-button">Owner Sign In</a></Col>
                    <br/>
                </Row>
            </Container>
        )
    }
}

export default GettingStarted
