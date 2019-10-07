import React, { Component } from 'react'
import Axios from 'axios'

/**
 * - See All Past Orders
 * - See All Upcoming Orders (Should also display the orderStatus according to restaurantOwner)
 */
export class BuyerOrdersPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount = () => {
        // get order details of this buyer
        // and render it
        let buyerEmailId = cookie.load('cookie2');
        axios.get('http://localhost:3001/getBuyerOrder', {
            params: {
                buyerEmailId: buyerEmailId,
            }
        }).then(response => {
            console.log("Response on buyer details: ");
            console.log(response.data.buyerDetails);
            let thisBuyerUpcomingOrders = [];
            let thisBuyerPastOrders = [];
            let thisBuyerRejectedOrders = [];
            if (response.status === 200) {
                let allData = response.data.buyerOrderTableData;
                for (let index = 0; index < allData.length; index++) {
                    let anOrder = allData[index];
                    if (anOrder.buyerEmailId === buyerEmailId) {
                        if (anOrder.buyerOrderStatus === "New") {
                            thisBuyerUpcomingOrders.push(anOrder);
                        } else if (anOrder.buyerOrderStatus === "Rejected") {
                            thisBuyerRejectedOrders.push(anOrder);
                        } else {
                            thisBuyerPastOrders.push(anOrder);
                        }
                    }
                }
                this.setState({
                    upcomingOrders: thisBuyerUpcomingOrders,
                    pastOrders: thisBuyerPastOrders,
                    rejectedOrders: thisBuyerRejectedOrders,
                })
            } else {
                console.log("Status Code: ", response.status);
                console.log(response.data.responseMessage);
            }
        }).catch(error => {
            console.log('error! while getting data from buyer order table');
        });

    }

    render() {
        var listGroupOrders = [];
        const listOfAllOrders = this.state.allOrdersData;
        let listGroupStyle = {
            paddingTop: "5px",
            paddingBottom: "5px",
        }
        // listOfAllOrders is an array that contains each order information
        for (let index = 0; index < listOfAllOrders.length; index++) {
            let anOrderData = listOfAllOrders[index];
            listGroupOrders.push(
                <OrderBrief anOrderData={anOrderData} orderStatus={this.state.orderStatus}/>
            );
        }

        return (
            <ListGroup defaultActiveKey="#link1">
                {listGroupOrders}
            </ListGroup>
        )
    }
}

export default BuyerOrdersPage
