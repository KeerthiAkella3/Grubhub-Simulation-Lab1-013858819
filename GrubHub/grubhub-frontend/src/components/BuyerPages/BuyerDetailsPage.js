import React, { Component } from 'react'
import axios from 'axios';
import MenuItemCard from './MenuItemCard';
import Table from 'react-bootstrap/Table';
import RestaurantBanner from './RestaurantBanner';
import ListGroup from 'react-bootstrap/ListGroup'
import DefineQuantity from './DefineQuantity'
import ShoppingCart from './ShoppingCart';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cookie from 'react-cookies';
import PlaceOrder from './PlaceOrder';
import BuyerNavBar from './BuyerNavBar';

export class BuyerDetailsPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            breakfast: [],
            lunch: [],
            appetizer: [],
            restaurantName: "",
            restaurantId: 0,
            restaurantEmailId: "",
            restaurantAddress: "",
            restaurantPhone: 0,
            restaurantCusine: "",
            buyerName: "",
            buyerEmailId: "",
            buyerAddress: "",
            buyerOrderStatus: "",
            showQuantitySelector: false,
            clickedItem: undefined,
            cartItems: [],
            showPlaceOrderModal: false,
        }

        this.launchQuantitySelector = this.launchQuantitySelector.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this)
        this.onMouseOver = this.onMouseOver.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
    }

    onMouseOver = (e) => {
        this.setState({
            listGroupItemColor: "#BBB9B9"
        })
    }

    onMouseOut = (e) => {
        this.setState({
            listGroupItemColor: "#F7F7F7"
        })
    }

    launchQuantitySelector = (e, clickedItem) => {
        console.log("Handling Click on Menu Item");
        console.log(clickedItem);
        this.setState({
            clickedItem: clickedItem,
            showQuantitySelector: true,
        })
    }

    saveCallback = (order, orderedItem) => {
        this.setState({
            cartItems: this.state.cartItems.concat({
                itemId: orderedItem.itemId,
                itemName: orderedItem.itemName,
                itemQuantity: order.quantity,
                itemTotalPrice: order.totalPrice
            }),
            showQuantitySelector: false
        })
    }

    closeCallback = () => {
        this.setState({
            showQuantitySelector: false
        })
    }

    closePlaceOrderCallback = () => {
        this.setState({
            showPlaceOrderModal: false,
        })
    }

    componentDidMount() {
        let restaurantId = this.props.location.state.restaurantId;
        let buyerId = cookie.load('cookie2');
        console.log("Getting details of restaurant with ID: " + restaurantId);
        axios.defaults.withCredentials = true;

        axios.get('http://localhost:3001/buyerDetails', {
            params: {
                buyerId: buyerId,
            }
        }).then(response => {
            console.log("Response on buyer details: ");
            console.log(response.data.buyerDetails);
            if (response.status === 200) {
                let buyerDetails = response.data.buyerDetails;
                if (buyerDetails) {
                    this.setState({
                        buyerName: buyerDetails.buyerName,
                        buyerEmailId: buyerDetails.buyerEmailId,
                        buyerAddress: buyerDetails.buyerAddress,
                    })
                }
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }
        }).catch(error => {

        });

        axios.get('http://localhost:3001/restaurantDetails', {
            params: {
                restaurantId: restaurantId,
            }
        }).then(response => {
            console.log("Response on restaurant details: ");
            console.log(response.data.restaurantDetails);
            if (response.status === 200) {
                let restaurantDetails = response.data.restaurantDetails;
                if (restaurantDetails) {
                    this.setState({
                        restaurantName: restaurantDetails.restaurantName,
                        restaurantEmailId: restaurantDetails.restaurantEmailId,
                        restaurantAddress: restaurantDetails.restaurantAddress,
                        restaurantCuisine: restaurantDetails.restaurantCuisine,
                        restaurantPhone: restaurantDetails.restaurantPhone,
                        restaurantId: restaurantDetails.restaurantId,
                    })
                }
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }
        }).catch(error => {

        });


        axios.get('http://localhost:3001/menu', {
            params: {
                restaurantId: restaurantId
            }
        })
            .then(response => {
                if (response.status === 200) {
                    let menu = response.data.menu;
                    let index = 0;
                    for (index = 0; index < menu.length; index++) {
                        if (menu[index].itemSection === "Breakfast") {
                            this.setState({
                                breakfast: this.state.breakfast.concat(menu[index])
                            })
                        } else if (menu[index].itemSection === "Lunch") {
                            this.setState({
                                lunch: this.state.lunch.concat(menu[index])
                            })
                        } else {
                            this.setState({
                                appetizer: this.state.breakfast.concat(menu[index])
                            })
                        }
                    }
                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
            }).catch(error => {
                console.log(error);
            });
    }

    /**
 * Order Summary:
 * RestaurantName, RestaurantEmailId, Restaurant Address
 * BuyerName, BuyerAddress, BuyerAddress
 * Status of Order for Buyer
 * All the items and corresponding quantity
 * Price of each item purchased
 * Total Price of all items
 */

    // Send data to backend and then to database.
    // buyerName
    // buyerAddress
    // OrderedItems
    // Total Price
    // restaurant E-Mail Id
    placeOrder = (completeOrder) => {
        console.log("Handling place order");
        const data = {
            restaurantEmailId: this.state.restaurantEmailId,
            restaurantId: this.state.restaurantId,
            buyerEmailId: this.state.buyerEmailId,
            buyerAddress: this.state.buyerAddress,
            cartItems: this.state.cartItems,
            buyerName: this.state.buyerName,
        }
        axios.post('http://localhost:3001/postOrder', data)
            .then(response => {
                if (response.status === 200) {
                    let menu = response.data.menu;
                    let restaurantDetails = response.data.restaurantDetails;
                    let index = 0;

                    this.setState({
                        restaurantId: restaurantDetails.restaurantId,
                        restaurantEmailId: restaurantDetails.restaurantEmailId,
                        restaurantName: restaurantDetails.restaurantName,
                        restaurantCuisine: restaurantDetails.restaurantCuisine,
                        restaurantPhone: restaurantDetails.restaurantPhone,
                    })

                    for (index = 0; index < menu.length; index++) {
                        if (menu[index].itemSection === "Breakfast") {
                            this.setState({
                                breakfast: this.state.breakfast.concat(menu[index])
                            })
                        } else if (menu[index].itemSection === "Lunch") {
                            this.setState({
                                lunch: this.state.lunch.concat(menu[index])
                            })
                        } else {
                            this.setState({
                                appetizer: this.state.breakfast.concat(menu[index])
                            })
                        }
                    }
                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
            }).catch(error => {
                console.log(error);
            });
        console.log("Printing Complete Order")
        console.log(completeOrder);
        this.setState({
            showPlaceOrderModal: true,
            buyerOrderStatus: "New",
        })
    }

    placeOrderClose = () => {
        this.setState({
            showPlaceOrderModal: false,
        })
    }

    render() {
        let MenuDOM = [];
        let ModalQuantitySelector = [];
        let placeOrderModalDOM = [];
        let restaurantName = this.props.location.state.restaurantName;
        let listGroupStyle = {
            paddingTop: "5px",
            paddingBottom: "5px",
            color: "inherit",
            backgroundColor: "inherit",
            borderStyle: "none",
        }
        if (this.state.showPlaceOrderModal === true) {
            placeOrderModalDOM = <PlaceOrder
                cartItems={this.state.cartItems}
                onClose={this.closePlaceOrderCallback}
                restaurantName={this.state.restaurantName}
                restaurantAddress={this.state.restaurantAddress}
                buyerName={this.state.buyerName}
                buyerAddress={this.state.buyerAddress}
            />;
        }


        if (this.state.breakfast) {
            let sectionData = [];
            let allBreakfastItems = this.state.breakfast;
            for (let index = 0; index < allBreakfastItems.length; index++) {
                sectionData.push(
                    <ListGroup.Item action eventKey={index} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={(e) => {
                        this.launchQuantitySelector(e, allBreakfastItems[index])
                    }} style={listGroupStyle}>
                        <MenuItemCard itemName={allBreakfastItems[index].itemName} itemPrice={allBreakfastItems[index].itemPrice} />
                    </ListGroup.Item>
                );
            }
            if (allBreakfastItems.length > 0) {
                MenuDOM.push(
                    <Row>
                        <h4>Breakfast</h4>
                        {sectionData}
                    </Row>);
            }

            sectionData = [];
            let allLunchItems = this.state.lunch;
            for (let index = 0; index < allLunchItems.length; index++) {
                sectionData.push(
                    <ListGroup.Item action eventKey={index} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={(e) => {
                        this.launchQuantitySelector(e, allLunchItems[index])
                    }} style={listGroupStyle}>
                        <MenuItemCard itemName={allLunchItems[index].itemName} itemPrice={allLunchItems[index].itemPrice} />
                    </ListGroup.Item>
                );
            }
            if (allLunchItems.length > 0) {
                MenuDOM.push(<Row style={{
                    marginBottom: '15px',
                    paddingBottom: '5px',
                    borderStyle:'1px solid',
                    borderRadius: '5px',
                }}>
                    <h4>Lunch</h4>
                    {sectionData}
                </Row>);
            }

            sectionData = [];
            let allAppterizerItems = this.state.appetizer;
            for (let index = 0; index < allAppterizerItems.length; index++) {
                sectionData.push(
                    <ListGroup.Item action eventKey={index} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={(e) => {
                        this.launchQuantitySelector(e, allAppterizerItems[index])
                    }} style={listGroupStyle}>
                        <MenuItemCard itemName={allAppterizerItems[index].itemName} itemPrice={allAppterizerItems[index].itemPrice} />
                    </ListGroup.Item>
                );
            }
            if (allAppterizerItems.length > 0) {
                MenuDOM.push(<Row>
                    <h4>Appetiizer</h4>
                    {sectionData}
                </Row>)
            }

            if (this.state.showQuantitySelector === true) {
                ModalQuantitySelector = <DefineQuantity
                    clickedItem={this.state.clickedItem}
                    onSave={this.saveCallback}
                    onClose={this.closeCallback}
                />;
            }

            let ShoppingCartDOM = [];
            if (this.state.cartItems.length > 0) {
                ShoppingCartDOM.push(
                    <Col>
                        <ShoppingCart cartItems={this.state.cartItems} placeOrder={this.placeOrder} />
                    </Col>
                );
            }

            // make a query to database and get items, sections in restaurant's menu
            // Load the information to cards 
            // Section
            // Item-Name
            // Item-Price
            // Dropdow to mention quantity
            // Button to add to cart
            // Cart symbol that updates with each item
            // Place Order button 
            // Similar to grubhub page

            return (
                <div>
                    <BuyerNavBar />
                    <RestaurantBanner restaurantName={restaurantName} />
                    <Container style={{
                        maxWidth: "100%",
                        width: "100%",
                        heigth: "100%",
                        marginLeft: "0",
                        marginRight: "0",
                    }}>
                        <Row style={{
                            width: "100%",
                            height: "100%",
                            marginLeft: "0",
                            marginRight: "0",
                        }}>
                            <Col sm={7} style={{
                                paddingLeft: "0",
                                paddingRight: "0",
                            }}>
                                <Container style={{
                                    maxWidth: "100%",
                                    width: "100%",
                                }}>
                                    {MenuDOM}
                                </Container>
                            </Col>
                            <Col sm={5}>
                                {ShoppingCartDOM}
                            </Col>
                        </Row>
                    </Container>
                    {ModalQuantitySelector}
                    {placeOrderModalDOM}
                </div>
            );
        }
    }
}

export default BuyerDetailsPage
