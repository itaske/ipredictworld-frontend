import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import IPreditctFooter from '../IPredictFooter'
import IPredictLogo from '../images/ipredict.png'
import DashboardNav from './DashboardNav'

class Main extends Component{
  
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
       return (
           <Container fluid>
               <DashboardNav/>
        <div class="row">
        <div class="col mx-auto d-block padding-left-2">
            <img src={IPredictLogo} alt="IPredictWorld Logo" class="logo-img mx-auto d-block padding-left-8" />                
        </div>
        
            <a href="/logout" class="float-right padding-right-0 padding-top-5 padding-right-3 text-capitalize text-red font-weight-bold"> Log Out</a>
        
    </div>
    <div class="row">
        <div class="col-sm-10 col-md-4 mx-auto d-block bg-lm-green border-radius text-center margin-bottom-5 padding-right-3">
            <h3><span class=" lead text-uppercase font-weight-bold text-white">Welcome!</span></h3>
            <h2><span class="font-weight-bold text-uppercase text-white">{this.state.user.username}</span></h2>
        </div>
    </div>
    
    <div class="row ">
        <div class="col-sm-12 col-md-4 mx-auto d-block margin-bottom-1">
            <a href="/dashboard/scoreboard"><button type="button" class="btn btn-purple btn-block ">PREDICTION LOG</button></a>
        </div>            
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-4 mx-auto d-block margin-bottom-1">
            <a href="/dashboard/subscribe"><button type="button" class="btn btn-purple btn-block ">SUBSCRIBE</button></a>
        </div>
    </div>
    {
        this.state.hasTicket &&
        <div class="row">
            <div class="col-sm-12 col-md-4 mx-auto d-block margin-bottom-5">
                <a href="/dashboard/predict/edit"><button type="button" class="btn btn-purple btn-block ">PREDICT</button></a>
            </div>
        </div>
    }
       <IPreditctFooter/>

       </Container>
       )
    }
 
}

export default Main;