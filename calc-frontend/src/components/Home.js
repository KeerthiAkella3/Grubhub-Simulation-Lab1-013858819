import React, { Component } from 'react'
import axios from 'axios';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'



import InputGroup from 'react-bootstrap/InputGroup'






export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: ''
        }
    }

    onClickHandler = (operation) => {
        let val = this.refs.textbox.value + operation;
        console.log(val);
        this.setState({
            input: val
        });
    }

    inputEntryHandler = () => {
        this.setState({
            input: this.refs.textbox.value
        });
        console.log(this.state.input)
    }

    onSubmitEnter = (event) => {
        event.preventDefault();
        let text = this.refs.textbox.value;

        axios({
            method: 'post',
            url: 'http://localhost:3001/server',
            data: { input: text }
        })
            .then((response) => {

                if (response.status === 200) {
                    return response.data.result
                }
            })
            .then((result) => {
                console.log(result);
                this.setState({
                    input: result
                });
            }).catch(function (err) {
                console.log(err)
            });
        console.log(this.state.input);
    }

    render() {
        return (
            <div>
                <center>
                <br></br>
                <h1>
                    Calculator <Badge variant="secondary">Basic</Badge>
                </h1>
                <br></br>
                
                <Card className="text-center" style={{ width: '20rem' }}bg="light" >
                    <Form onSubmit={this.onSubmitEnter}>

                        <Card.Header>
                            <input type="text" autoFocus ref="textbox" name="input" onChange={this.inputEntryHandler} pattern="^[0-9+-/*.]*$"
                                placeholder =" Enter here to calculate"value={this.state.input} required />
                        </Card.Header>
                        <Card.Body>
                            
                            <ButtonToolbar style={{display:"block"}}>
                            <pre className="tab">
                                <Button size="lg" variant="outline-primary" onClick={e => this.onClickHandler(e.target.name)} name="+" value="+" >+</Button>
                                
                                <Button size="lg" variant="outline-primary" onClick={e => this.onClickHandler(e.target.name)} name="-" value="-" >-</Button>
                                <Button size="lg" variant="outline-primary" onClick={e => this.onClickHandler(e.target.name)} name="*" value="*" >*</Button>
                                <Button size="lg" variant="outline-primary" onClick={e => this.onClickHandler(e.target.name)} name="/" value="/" >/</Button>
                                </pre>
                            </ButtonToolbar>
                            
                            <br></br>
                            <Button size="lg" variant="success" type="submit" value="Enter"> Enter </Button>
                        </Card.Body>
                    </Form>
                </Card>
               
   

               
                </center>

            </div>
        )
    }
}

export default Home
