import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'

export class MenuItemCard extends Component {
    render() {
        let itemName = this.props.itemName;
        let itemPrice = this.props.itemPrice;
        return (
            <div style={{width:"100%", height:"100%"}}>
                <Card style={{ borderStyle: "none", width:"100%", height:"100%" }}>
                    <Card.Body style={{width: "100%", height: "100%"}}>
                        <Card.Title>{itemName}</Card.Title>
                        <Card.Text>
                            {itemPrice}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default MenuItemCard
