import React, {Component} from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import IPredictLogo from '../images/ipredict.png'

class DashboardNav extends Component{
    constructor(props){
        super(props);
        this.state = {user:{username:"IPredict User"}, hasTicket:false}
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"))
        this.setState({user:user})
        this.getTicketPaidFor(user.id, user.token)
    }

    getTicketPaidFor(userId, token){
        fetch(`/tickets/paid/${userId}`,{
            method:"GET",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`

            }
        }).then(res=>{
            return res.json()
        }).then(data =>{
            this.setState({
                hasTicket: data
            })
        }).catch(err=>console.log(err))
 
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
                    {this.state.hasTicket && <Nav.Link href="/dashboard/predict/edit">Predict</Nav.Link> }
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