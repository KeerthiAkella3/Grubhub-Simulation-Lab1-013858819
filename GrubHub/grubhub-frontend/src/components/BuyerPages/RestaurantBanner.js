import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'


export class RestaurantBanner extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>{this.props.restaurantName}</h1>
                    <p> 1 Washington Sq, San Jose, CA 95192 </p>
                </Container>
            </Jumbotron>
        )
    }
}

export default RestaurantBanner
