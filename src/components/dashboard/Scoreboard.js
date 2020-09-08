import React, {Component} from 'react'
import DashboardNav from './DashboardNav'
import IPredictLogo from  '../images/ipredict.png'
import PremierLeague from '../images/PremierLeague.jpeg'
import ChampionsLeague from '../images/ChampionsLeague.jpeg'
import LaLiga from '../images/Laliga.jpeg'
import {Image} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-bootstrap'
import {BootstrapTable} from 'react-bootstrap-table-next'
class Scoreboard extends Component{

   constructor(props){
       super(props);
       this.state ={scoreboard:[], leagueType:"PREMIER_LEAGUE", seasonYear:"2020/2021", currentWeek:1}
   }

  componentDidMount(){
      let user = JSON.parse(localStorage.getItem("user"));

      fetch(`/api/v1/scoreboards/${this.state.seasonYear}/${this.state.leagueType}`,{
          method:"GET",
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json",
              "Authorization":`Bearer ${user.token}`
          }
      })
      .then(res=> {return res.json()})
      .then(data=>{
          console.log(data);
          this.setState({scoreboard:data})

      })
  }

   render(){
       let position = 0;
    let tableRows = this.state.scoreboard.map(item=>{
        item = item.scoreBoard
       return(
        <tr className={"table-active text-center font-weight-bold text-grey text-uppercase"}>
        <td>{position=position+1}</td>
        <td>{item.username}</td>
        <td>{item.points}</td>
        <td>{this.state.currentWeek}</td>
        <td>{item.noOfPerfectScore}</td>
    </tr>
    )
       });
       return(

        
            <Container fluid>
                <DashboardNav/>
                <div class="row">
                  <div class="col mx-auto d-block padding-left-2">
                    <Image size="small" src={IPredictLogo} alt="Logo" className={"logo-img mx-auto d-block padding-left-8"} />                
                 </div> 

                  <a href="/logout" class="float-right padding-right-0 padding-top-5 padding-right-3 text-capitalize text-red font-weight-bold"> Log Out</a>

               </div>

            <div class="row ">
                <div class="col-sm-12 col-md-4 mx-auto d-block margin-bottom-1">
                    <a href="/dashboard/scoreboard"><button type="button" class="btn btn-red btn-block ">PREDICTION LOG</button></a>
                </div>            
            </div>       
            <div class="row margin-bottom-5">
                <div class="col- mx-auto d-block">
                    <Row>
                        <Col>
                             <Image size="tiny" src={LaLiga} className={"logo-img1 float-right"}/>          
                        </Col>
                        <Col>
                            <Image size="tiny" src={PremierLeague} className ={"logo-img1"}/>
                        </Col>
                        <Col>
                          <Image size="tiny" src={ChampionsLeague} className={"logo-img1 float-left"}/>      
                        </Col>
                    </Row>
                </div>
            </div>

            <div class="row " >
                <div class="col-sm-12 col-md-8 mx-auto d-block ">
                    <h1 class="h1 text-center text-uppercase text-grey font-weight-bold"> Complete Scoreboard</h1>
                    <span class="text-grey h1 font-weight-bold"><hr class="hr"/></span>
                </div>
                
                <div class="col-sm-12 col-md-8 mx-auto d-block table-center" >
                
                    <table class="table table-responsive table-center table-bordered-10 table-purple mx-auto col-sm-12 col md-6 ">
                        <thead class="thead-purple">
                            <tr>
                                <th>POS</th>
                                <th>NAME</th>
                                <th>POINTS</th>           
                                <th>WEEK</th>
                                <th>PERFECT_SCORE</th>             
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>

                </div>

            </div>
        </Container>
       )
   }
}

export default Scoreboard;