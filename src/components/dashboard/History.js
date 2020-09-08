import React, {Component} from 'react'
import { Container, Image} from 'semantic-ui-react';

import IPredictLogo from '../images/ipredict.png'
import ChampionsLeague  from '../images/ChampionsLeague.jpeg'
import LaLiga from '../images/Laliga.jpeg'
import PremierLeague from '../images/PremierLeague.jpeg'

import DashboardNav from './DashboardNav'

class History extends Component{

    constructor(props){
        super(props);
        this.state ={matchdays:[]}
        this.getLogsFromMatchDay = this.getLogsFromMatchDay.bind(this);
    }

  getLogsFromMatchDay(matchday){
    return [];
  }

    render(){

        
      let matchday =1;

        let matchdays = this.state.matchdays.map(matchday=>{
            let counter = 1;
             let logs = this.getLogsFromMatchDay(matchday);
            let log = logs.map(item =>{

                return(
      
                  <tr class="table-active text-center font-weight-bold text-grey" key = {item.id}>
                                  <td>{counter++}</td>
                                  <td>{item.username}</td>
                                  <td>{item.points}</td>
      
                 </tr>)
              });

              return (
                <div class="row " >
                <div class="col-sm-12 col-md-8 mx-auto d-block ">
                    <h5 class="h5 text-center text-uppercase text-grey font-weight-bold"> matchday {matchday++}</h5>
                </div>
    
                 <table class="table table-responsive-sm table-center  table-bordered-10 col-lg-8 col-md-9 col-sm-11 mx-auto ">
                     <thead class="thead-purple">
                            <tr>
                                <th>S/N</th>
                                <th>USERNAME</th>
                                <th>POINTS</th>
    
                            </tr>
                        </thead>
                        <tbody>
                            {log}
                        </tbody>
                </table>

        

        </div>
              )

        })

        return(
            <Container fluid>
                <DashboardNav/>
                 <div class="row">
            <div class="col-3 float-left padding-left-2">
                <Image  size="tiny" src={IPredictLogo} alt="Logo" className={"logo-img-small mx-auto d-block"}/>                
            </div>

            <div class="col-6  margin-top-5 margin-bottom-1">
                <a href=".html"><button type="button" class="btn btn-red btn-block ">LEAGUE MATCHDAY LOG</button></a>
            </div> 
            <div class="col-3 float-right margin-top-5 ">
                <a href="/logout" class=" float-right padding-right-1 text-capitalize text-red font-weight-bold"> Log Out</a>
            </div>
        </div>

        <div class="row margin-bottom-2">
            <div class="col- mx-auto d-block">
                
                <Image size="tiny" className={"logo-img1"} src={PremierLeague}/>      

            </div>
        </div>


           {matchdays}
            </Container>

        )
    }
}

export default History;