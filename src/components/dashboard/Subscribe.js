import React, {Component} from 'react'
import DashboardNav from './DashboardNav';
import PremierLeague from '../images/PremierLeague.jpeg'
import ChampionsLeague from '../images/ChampionsLeague.jpeg'
import LaLiga from '../images/Laliga.jpeg'
import  {Container, Row, Col, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {Image, Button } from 'semantic-ui-react'
import IPredictLogo from '../images/ipredict.png'
import IPredictFooter from '../IPredictFooter'
class Subscribe extends Component{


    constructor(props){
        super(props);
        this.state={league:"PREMIER_LEAGUE",
        ticket:{amountPaid:500, week:1},
        services:[]};
        this.handleChange= this.handleChange.bind(this);
        this.getServices = this.getServices.bind(this);

    }

    componentDidMount(){
       this.getServices(this.state.league);

    }

    getServices(league){
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(`/services/leagueType/${league}`,{
            method:"GET",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`

            }
        }).then(res=>{
            if (res.status === 200)
                return res.json()
            else if (res.status === 500){
                return [];
            }else if (res.status === 404){
                return []
            }
        }).then(data =>{
            this.setState({
                services:data
            })
        }).catch(err=>console.log(err))
    }

    payForService(service){
        let currentTicket = this.state.ticket;
        currentTicket['service'] = service
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(`/tickets/${user.id}`,{
            method:"POST",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`

            },
            body:JSON.stringify(currentTicket)
        }).then(res=>{
            if (res.status ===  201)
            return res.json()
            else throw Error(res)
        }).then(data =>{
            this.props.history.push("/dashboard/home")
        }).catch(err=>console.log(err))
 
    }

    handleChange = (value) => {
      
        this.setState({ league:value })
        this.getServices(value);
    }

    render(){
        let availableServices = this.state.services.map(service=>{
          
            return(
                <div class="row margin-bottom-5" key={service.id}>
                    <div class="col-sm-10 col-md-4  mx-auto d-block bg-red border-radius-5 text-center margin-bottom-5 padding-right-3">
            <h3><span class=" lead text-uppercase font-weight-bold text-white">{service.competitionType} SUBSCRIPTION {service.season}</span></h3>               
                    </div>
            <div class="col-sm-10 col-md-10 mx-auto d-block text-center">
                    <div>
                        <input type="checkbox" class="custom-control-input check-red" id="odds" name="odds" checked="true"/>
                        <label class="custom-control-label" for="odds">
                            <span className={"font-weight-bold check-label text-uppercase"}>Subscribe for {service.competitionType} competitions {service.season}<br/> 
            <span class="text-left">{service.leagueType} (<span>&#8358;</span>{service.price})
                                </span>
                            </span>
                            </label>

                    </div> 
                    <div class="col-sm-12 col-md-2 mx-auto d-block margin-bottom-1 bordered-div">
                        <span class=""> <span>&#8358;</span>{service.price}</span>
                        <Button primary className={"btn btn-purple text-uppercase btn-stake"} onClick={(event)=>this.payForService(service)}>Stake</Button>
                    </div> 
                <span class="text-uppercase text-red font-10-bold">Expired|season already began</span>
            </div>

        </div>
        
            )
        });
        return(
            <Container>

            <DashboardNav/>
            <div class="row">
            <div class="col mx-auto d-block padding-left-2">
                <Image size="small" src={IPredictLogo} alt="Logo" className={"logo-img mx-auto d-block padding-left-8"}/>                
            </div>

            <a href="/logout" class="float-right padding-right-0 padding-top-5 padding-right-3 text-capitalize text-red font-weight-bold"> Log Out</a>
            
        </div>
        <Row className="margin-bottom-5">
                      <ToggleButtonGroup type="checkbox" value={this.league} onChange={this.handleChange}>
                     <ToggleButton value="PREMIER_LEAGUE">Premier League</ToggleButton>
                     <ToggleButton value="LA_LIGA">La Liga</ToggleButton>
                     <ToggleButton value="CHAMPIONS_LEAGUE">Champions League</ToggleButton>
                     </ToggleButtonGroup>
                 </Row>
         {availableServices}
       <IPredictFooter/>
        </Container>
        )
    }
}

export default Subscribe;