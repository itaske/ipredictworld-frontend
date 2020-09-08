import React, {Component} from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'

import IPredictLogo from './images/ipredict.png'

class IpredictNav extends Component{

    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(

            <Container>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">
                         <img
                            alt=""
                            src={IPredictLogo}
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}
                        IPredictWorld
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container> 
        )
    }
}

export default IpredictNav;