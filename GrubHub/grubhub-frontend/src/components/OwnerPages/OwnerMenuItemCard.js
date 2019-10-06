import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class OwnerMenuItemCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            handleDeleteItem : undefined,
            stopRendering : false,
        }
        this.deleteMenuItemHandler = this.deleteMenuItemHandler.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            handleDeleteItem: this.props.handleDeleteItem,
            itemSection: this.props.itemSection,
        })
    }

    deleteMenuItemHandler = (e, itemId) => {
        // Tell parent component that an item is deleted and update state with now available items in menu
        this.state.handleDeleteItem(e, itemId);
        this.setState({
            stopRendering : true,
        })
    }

    render() {
        let itemName = this.props.itemName;
        let itemPrice = this.props.itemPrice;
        if (this.state.stopRendering === true) {
            return null;
        }
        console.log("Menu Card item name " + itemName + " and section: " + this.props.itemSection);
        return (
            <div style={{ width: "inherit", 
            height: "inherit",
            marginRight: '10px',
            marginBottom: '10px',
            zIndex: '3',
            boxShadow: '3px'
             }}>
                <Card style={{ borderStyle: "none", width: "inherit", height: "100%" }}>
                    <Card.Body style={{ width: "inherit", height: "100%" }}>
                        <Card.Title>{itemName}</Card.Title>
                        <Card.Text>
                            {itemPrice}
                        </Card.Text>
                        <Button variant="danger" onClick={ (e) => {
                            this.deleteMenuItemHandler(e, this.props.itemId)
                            }}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default OwnerMenuItemCard
