import React, {Component} from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import IPredictLogo from '../images/ipredict.png'

class DashboardNav extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/dashboard/home">
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
                    <Nav.Link href="/dashboard/home">Home</Nav.Link>
                    <Nav.Link href="/dashboard/scoreboard">ScoreBoard</Nav.Link>
                    <Nav.Link href="/dashboard/predict/edit">Predict</Nav.Link>
                    <Nav.Link href="/dashboard/subscribe">Subscribe</Nav.Link>
                    <Nav.Link href="/dashboard/history">History</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
           
        )
    }

}

export default DashboardNav;