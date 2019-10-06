import React, { Component } from 'react'
import SideNavInstance from '../Sidebars/SideNavInstance'
import MenuPage from './MenuPage';
import OrderPage from './OrderPage';
import ProfilePage from './ProfilePage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cookie from 'react-cookies'

import 'bootstrap/dist/css/bootstrap.min.css';



export class CompOwnerPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageName: "Orders",
            restaurantId: undefined,
        }
    }


    componentDidMount = () => {
        this.setState({
            restaurantId: cookie.load('cookie2'),
        })
    }

    handleSideBarSelect = (pageName) => {
        if (pageName === "Orders") {
            this.setState({
                pageName: "Orders"
            })
        } else if (pageName === "Menu") {
            this.setState({
                pageName: "Menu"
            })

        } else if (pageName === "Profile") {
            this.setState({
                pageName: "Profile"
            })

        }
    }

    render() {
        const isOrdersPage = (this.state.pageName === "Orders");
        const isMenuPage = (this.state.pageName === "Menu");
        const isProfilePage = (this.state.pageName === "Profile");
        // TODO : Get restaurant ID from cookie
        let restaurantId = this.state.restaurantId;
        let page = <OrderPage restaurantId={restaurantId}/>;
        if (isOrdersPage) {
            page = <OrderPage restaurantId={restaurantId}/>;
        } else if (isMenuPage) {
            page = <MenuPage restaurantId={restaurantId}/>;
        } else if (isProfilePage) {
            page = <ProfilePage restaurantId={restaurantId}/>;
        }


        let grubhubRow = {
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "0%",
            marginRight: "0%",
            paddingLeft: "0%",
            paddingRight: "0%",
            height: "100%",
        };
        
        let mainPageCol = {
            flexBasis: "0",
            flexGrow: "1",
            maxWidth: "100%",
            marginLeft: "0%",
            marginRight: "0%",
            paddingLeft: "0%",
            paddingRight: "0%",
            height: "100%",
        }

        let sideBarCol = {
            flexBasis: "0",
            flexGrow: "1",
            maxWidth: "250px",
            marginLeft: "0%",
            marginRight: "0%",
            paddingLeft: "0%",
            paddingRight: "0%",
            height: "100%",
        }
        
        let grubhubContainer = {
            width: "100%",
            padding: "0%",
            marginLeft: "0%",
            marginRight: "0%",
            paddingRight: "0%",
            paddingLeft: "0%",
            height: "100%",
        }

        let ownerPageDiv = {
            width: "100%",
            height: "100%",
        }

        return (
            <div style={ownerPageDiv}>
                <div style={grubhubContainer}>
                    <Row style={grubhubRow}>
                        <Col style={sideBarCol}><SideNavInstance onOptionClick={this.handleSideBarSelect} /> </Col>
                        {/* Based on what user clicks in sidebar, we need to display appropriate component. Default is Orders page */}
                        <Col className={mainPageCol}>{page}</Col>
                    </Row>
                </div>
            </div>

        )
    }
}

export default CompOwnerPage
