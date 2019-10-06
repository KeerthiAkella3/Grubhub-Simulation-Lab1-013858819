import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import OwnerMenuItemCard from './OwnerMenuItemCard';
import { CardDeck } from 'reactstrap';

export class MenuPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lunch: [],
            breakfast: [],
            appetizers: [],
            isLunchPresent: false,
            isBreakfastPresent: false,
            isAppetizersPresent: false,
            restaurantId: 1,
        }

        this.onDeleteSectionHandler = this.onDeleteSectionHandler.bind(this);
        this.onAddSectionHandler = this.onAddSectionHandler.bind(this);
        this.onAddItemsHandler = this.onAddItemsHandler.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    onAddItemsHandler = () => {

    }

    onAddSectionHandler = () => {

    }

    handleDeleteItem = (e, itemId) => {
        // update state with now available items in menu
        console.log("Handling deletion of menu item");
        // delete entry of this item from menu
        let breakfastList = [];
        let lunchList = [];
        let appetizerList = [];
        axios.defaults.withCredentials = true;
        axios.delete('http://localhost:3001/restaurantMenu', {
            params: {
                menuItemId: itemId,
            }
        }).then(response => {
            console.log("Response on delete menu Item details: ");
            console.log(response.data.responseMessage);
            if (response.status === 200) {
                console.log("Successfully deleted Order");
                // window.alert("Successfully deleted order from " + anOrderData.buyerName);
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }

            let restaurantId = this.props.restaurantId;
            console.log("Getting details of restaurant with ID: " + restaurantId);
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3001/menu', {
                params: {
                    restaurantId: restaurantId
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log('response from DB: ');
                        console.log(response.data);
                        let menu = response.data.menu;
                        for (let index = 0; index < menu.length; index++) {
                            if (menu[index].itemSection === "Breakfast") {
                                breakfastList.push(menu[index]);
                            } else if (menu[index].itemSection === "Lunch") {
                                lunchList.push(menu[index]);
                            } else {
                                appetizerList.push(menu[index]);
                            }
                        }
                    } else {
                        console.log("Status Code: ", response.status);
                        console.log(response.data.responseMessage);
                    }
                }).catch(error => {
                    console.log(error);
                });
        }).catch(error => {
            console.log(error);
        });

        this.setState({
            lunch: lunchList,
            breakfast: breakfastList,
            appetizer: appetizerList,
        })
    }

    componentDidMount = () => {
        // Load menu Items from Database and setState
        let restaurantId = this.props.restaurantId;
        console.log("Getting details of restaurant with ID: " + restaurantId);
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/menu', {
            params: {
                restaurantId: restaurantId
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('response from DB: ');
                    console.log(response.data);
                    let menu = response.data.menu;
                    let sections = response.data.sections;
                    this.setState({
                        isBreakfastPresent: sections.isBreakfast,
                        isLunchPresent: sections.isLunch,
                        isAppetizersPresent: sections.isAppetizer
                    })
                    let index = 0;
                    for (index = 0; index < menu.length; index++) {
                        if (menu[index].itemSection === "Breakfast") {
                            console.log('breakfast match found = ')
                            console.log(menu[index]);
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
        this.setState({
            restaurantId: this.props.restaurantId,
        })
    }

    onDeleteSectionHandler = (e) => {
        console.log("Deleting Menu Section");
    }

    render() {
        let MenuSectionsDOM = [];
        let count = 0;
        // Go through appetizers first
        while (count < 3) {
            let sectionData = [];
            let sectionName = "Breakfast";
            let currentSection = this.state.breakfast;
            let isCurrentSectionPresent = this.state.isBreakfastPresent;
            let index = 0;
            let curColumn = 0;
            if (count === 1) {
                sectionName = "Appetizers";
                currentSection = this.state.appetizers;
                isCurrentSectionPresent = this.state.isAppetizersPresent;
            } else if (count === 2) {
                sectionName = "Lunch";
                currentSection = this.state.lunch;
                isCurrentSectionPresent = this.state.isLunchPresent;
            }
            for (index = 0; index < currentSection.length;) {
                let twoMenuItemsDom = [];
                for (curColumn = 0; curColumn < 3 && index < currentSection.length; curColumn++ , index++) {
                    console.log("creating cards for " + currentSection[index].itemName)
                    twoMenuItemsDom.push(
                        <OwnerMenuItemCard
                            itemName={currentSection[index].itemName}
                            itemPrice={currentSection[index].itemPrice}
                            itemId={currentSection[index].itemId}
                            itemSection={currentSection[index].itemSection}
                            handleDeleteItem={this.handleDeleteItem}
                        />
                    );
                }
                sectionData.push(
                    <Row style={{
                        width: "inehrit",
                        height: "inherit",
                        marginLeft: "5px",
                    }}>
                        <CardDeck style={{
                            flexFlow: 'wrap',
                            width: '420px',
                            height: '180px',
                            flexDirection: 'column',
                            flexBasis: "auto",
                        }}>
                            {twoMenuItemsDom}
                        </CardDeck>
                    </Row>
                );
            }

            // TODO: Add "Add Items Button"
            sectionData.push(
                <Button variant="success" size="sm" onClick={this.onAddItemsHandler}
                    style={{
                        width: "175px",
                        fontSize: "20px",
                        marginLeft: '5px',
                    }}>Add Items</Button>

            )
            if (currentSection.length > 0) {
                MenuSectionsDOM.push(
                    <Row style={{
                        marginTop: '5px',
                        marginBottom: '40px',
                        boxShadow: "0 0 0 1px rgba(67,41,163,.08), 0 1px 5px 0 rgba(67,41,163,.08)",
                        borderRadius: "3px",
                    }}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            paddingBottom: '5px',
                            marginTop: '10px'
                        }}>
                            <Container style={{
                                maxWidth: "100%"
                            }}>
                                <Row style={{
                                    width: "100%",
                                }}>
                                    <Col sm={10}>
                                        <h1 style={{
                                            fontSize: "30px",
                                            height: "40px"
                                        }}>{sectionName}</h1>
                                    </Col>
                                    <Col sm={2}>
                                        <Button variant="danger" onClick={this.onDeleteSectionHandler} style={{
                                            width: "175px",
                                            fontSize: "20px",
                                        }}>Delete Section</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            marginBottom: '20px',
                        }}>
                            {sectionData}
                        </div>
                    </Row>
                );
            } else if (isCurrentSectionPresent === true) {
                MenuSectionsDOM.push(
                    <Row style={{
                        marginTop: '5px',
                        marginBottom: '40px',
                    }}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            paddingBottom: '5px',
                            marginTop: '10px',
                        }}>
                            <Container style={{
                                maxWidth: "100%"
                            }}>
                                <Row style={{
                                    width: "100%",
                                }}>
                                    <Col sm={10}>
                                        <h1 style={{
                                            fontSize: "30px",
                                            height: "40px"
                                        }}>{sectionName}</h1>
                                    </Col>
                                    <Col sm={2}>
                                        <Button variant="danger" onClick={this.onDeleteSectionHandler} style={{
                                            width: "175px",
                                            fontSize: "20px",
                                        }}>Delete Section</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            marginBottom: '20px'
                        }}>
                            {sectionData}
                        </div>
                    </Row>
                );
            } else if (isCurrentSectionPresent === false) {
                // Add Section Button
                MenuSectionsDOM.push(
                    <Row style={{
                        marginTop: '5px',
                        marginBottom: '40px',
                    }}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            paddingBottom: '5px',
                            marginTop: '10px'
                        }}>
                            <Container style={{
                                maxWidth: "100%"
                            }}>
                                <Row style={{
                                    width: "100%",
                                }}>
                                    <Col sm={10}>
                                        <h1 style={{
                                            fontSize: "30px",
                                            height: "40px"
                                        }}>{sectionName}</h1>
                                    </Col>
                                    <Col sm={2}>
                                        <Button variant="success" onClick={this.onAddSectionHandler} style={{
                                            width: "175px",
                                            fontSize: "20px",
                                        }}>Add Section</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Row>
                );
            }
            count = count + 1;
        }

        return (
            <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "inherit",
            }}>
                {/* <p>THIS IS MENU PAGE</p>  */}
                <Container style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                }}>
                    {MenuSectionsDOM}
                </Container>
            </div>
        )
    }
}

export default MenuPage