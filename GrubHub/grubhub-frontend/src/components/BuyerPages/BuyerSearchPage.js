import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import GrubHubForRestaurants from '../../images/grubhub-full-logo.svg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BuyerFilterSearchPage from './BuyerFilterSearchPage'
import { Redirect } from 'react-router-dom'

/**
 * List all search results:
 * - Each result will have item Name and restaurant which has that item
 * - filter based on the cuisine 
 * - Left "div" to support filtering
 * - Right "div" to list search results
 * - Top "div" with GRUBHUB banner at left
 * - Select a restaurant and go to details view
 */
export class BuyerSearchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResults: [],
            listGroupItemColor: "inherit",
            nextPagePathName: undefined
        }
    }

    onMouseOver = (e) => {
        this.setState({
            listGroupItemColor: "#BBB9B9"
        })
    }

    onMouseOut = (e) => {
        this.setState({
            listGroupItemColor: "F7F7F7"
        })
    }

    searchResultClickHandler = (e, anItem) => {
        console.log("Clicked on ");
        console.log(anItem);
        console.log("Sending to details Page the restaurant ID=" + anItem.restaurantId);
        this.setState({
            nextPagePathName: "/restaurantDetailsPage",
            restaurantId : anItem.restaurantId,
            restaurantName: anItem.restaurantName,
        })
    }



    render() {

        if (this.state.nextPagePathName && this.state.nextPagePathName !== "") {
            return (
                <Redirect 
                    to={{
                        pathname: this.state.nextPagePathName,
                        state : { 
                            restaurantId : this.state.restaurantId,
                            restaurantName: this.state.restaurantName, 
                        }
                    }} 
                />
            );
        }

        let index = 0;
        let searchResults = undefined;
        if (this.props.location.state && this.props.location.state.searchResults) {
            searchResults = this.props.location.state.searchResults;
        }
        let listGroupOrders = [];
        // listOfAllOrders is an array that contains each order information
        for (index = 0; searchResults && index < searchResults.length; index++) {
            let anItem = searchResults[index];
            let listGroupStyle = {
                paddingTop: "5px",
                paddingBottom: "5px",
                color: "inherit",
                style:"{{ backgroundColor: this.state.listGroupItemColor }}",
            }

            listGroupOrders.push(
                <ListGroup.Item eventKey={anItem.restaurantName} action onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={(e) => {
                    this.searchResultClickHandler(e, anItem)
                }} style={listGroupStyle}>
                    <Card as="a" style={{
                        borderStyle: "none",
                        width: "100%",
                        height: "100%",
                        color: "inherit",
                        backgroundColor: "inherit",
                        marginLeft: "none",
                        marginRight: "none",
                        marginTop: "none",
                        marginBotton: "none",
                    }}>
                        <Card.Body>
                            <Card.Title>{anItem.restaurantName}</Card.Title>
                            <Card.Text>
                                Cuisine: {anItem.restaurantCuisine}
                            </Card.Text>
                            <Card.Text>
                                {anItem.itemName}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            );
        }

        return (
            <div style={{
                width: "100%",
                height: "100%"
            }}>
                {/* Navbar with GRUBHUB Brand Logo */}
                <Navbar expand="lg" style={{
                    paddingLeft: "25px",
                    paddingTop: "20px",
                    paddingRight: "0%",
                    marginLeft: "0%",
                    marginRight: "0%",
                    marginBottom: "0%",
                    height: "61px",
                    boxShadow: "0 0 0 1px rgba(67,41,163,.1), 0 1px 8px 0 rgba(67,41,163,.1)",
                    backgroundColor: "white",
                    zIndex: "2",
                }}>
                    <a className="mainNavBrand-logo" title="GRUBHUB" href="/" style={{
                        width: "inherit",
                        height: "inherit"
                    }}>
                        <img useMap="#" src={GrubHubForRestaurants} className="authentication-view__header__image" alt="GH Restaurant" style={{
                            width: "100px",
                            heigth: "50px",
                        }} />
                    </a>
                </Navbar>
                <Container style={{
                    marginLeft: "0%",
                    marginRight: "0%",
                    paddingBottom: "5px",
                    width: "100%",
                    height: "100%",
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    maxWidth: "100%",
                }}>
                    <Row style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginLeft: "0%",
                        marginRight: "0%",
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        height: "100%",
                        width: "100%",
                        borderRight: "none",
                    }}>
                        <Col style={{
                            flexBasis: "0",
                            flexGrow: "1",
                            marginLeft: "0%",
                            marginRight: "0%",
                            paddingLeft: "0%",
                            paddingRight: "0%",
                            height: "100%",
                            width: "100%",
                            maxWidth: "25%",
                            boxShadow: "0 0 0 1px rgba(67,41,163,.1), 0 1px 8px 0 rgba(67,41,163,.1)",
                            backgroundColor: "#fbfbfc",
                            zIndex: "3",
                        }}>
                            {/* <BuyerFilterSearchPage onOptionClick={this.handleSideBarSelect} />  */}
                            <BuyerFilterSearchPage />
                        </Col>
                        {/* Based on what user clicks in sidebar, we need to display appropriate component. Default is Orders page */}
                        <Col style={{
                            borderRight: "none",
                            flexBasis: "0",
                            flexGrow: "1",
                            marginLeft: "0%",
                            marginRight: "0%",
                            paddingLeft: "0%",
                            paddingRight: "0%",
                            height: "100%",
                            // marginLeft: "25%",
                            maxWidth: "100%",
                            // borderRight: "1px solid",
                            boxShadow: "0 0 0 1px rgba(67,41,163,.1), 0 1px 8px 0 rgba(67,41,163,.1)",
                            backgroundColor: "white",
                            zIndex: "1",
                        }}>
                            <ListGroup defaultActiveKey="#link1">
                                {listGroupOrders}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>


        )
    }
}

export default BuyerSearchPage