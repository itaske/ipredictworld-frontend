import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Image, Button} from 'semantic-ui-react'


import IPredictLogo from  '../images/ipredict.png'
import PremierLeague from '../images/PremierLeague.jpeg'
import ChampionsLeague from '../images/ChampionsLeague.jpeg'
import LaLiga from '../images/Laliga.jpeg'
import style from '../css/custom.css'
import DashboardNav from './DashboardNav'


class Predict extends Component{

    constructor(props){
        super(props);
        this.state={leagueType:"PREMIER_LEAGUE", week:"1",seasonYear:"2020/2021",competitionType:"FULL_SEASON", fixtures:[],
    weekPrediction:{week:"1", leagueType:"PREMIER_LEAGUE", competitionType:"FULL_SEASON", season:"2020/2021", predictions:{}}};
    this.addChangePrediction = this.addChangePrediction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(`/api/v1/fixtures/${user.id}/${this.state.seasonYear}/${this.state.week}/${this.state.leagueType}/${this.state.competitionType}`,{
            method:"GET",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`

            }
        }).then(res=>{
            return res.json()
        }).then(data =>{
            console.log(data)
            this.setState({
                fixtures:data
            })
        }).catch(err=>console.log(err))
    }


    addChangePrediction(event, fixture){
        let {name, value} = event.target;
        let target = name.substring(name.indexOf("-")+1, name.length);
        let formerWeekPrediction = this.state.weekPrediction;
        let fixtureId = fixture.id
           if (formerWeekPrediction.predictions[fixtureId]){
         
                let score = formerWeekPrediction.predictions[fixtureId].score
                score[target] = value;
            formerWeekPrediction.predictions[fixtureId]= {fixture:fixture, score}
            this.setState((prevState)=>{
                    return({weekPrediction: formerWeekPrediction});
            })
           }else{
               let score = {}
               if (target === 'home'){
                   score[target] = value;
                   score['away'] = 0;
               }else if (target === 'away') {
                   score[target] = value;
                   score['home'] =0;
               }
            formerWeekPrediction.predictions[fixtureId]= {fixture:fixture, score}
            this.setState((prevState)=>{
                    return({weekPrediction: formerWeekPrediction});
            })
           }
    
    }

    handleSubmit(){

     let predictions = Object.values(this.state.weekPrediction.predictions);
    let weekPrediction = this.state.weekPrediction;
    weekPrediction['predictions'] = predictions;

       console.log(weekPrediction);
       weekPrediction['predictions']= weekPrediction.predictions.map(prediction => {
           let score = prediction.score;
           let fixture = prediction.fixture;
           let convertedScore= `${score.home}:${score.away}`;
           return {fixture:fixture, score:convertedScore}
       })

       console.log(weekPrediction)
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(`/api/v1/weekpredictions/new/${user.id}`,{
            method:"POST",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`

            },
            body: JSON.stringify(weekPrediction)
        }).then(res=>{
            return res.json()
        }).then(data =>{
            console.log(data)
            this.props.history.push("/dashboard/predict/edit")
            
        }).catch(err=>console.log(err))
    }


    render(){

        let fixtures = this.state.fixtures.map(fixture=>{

            // let awayImage =require(`../images/${this.state.leagueType}/${fixture.away}.png`);
            // let homeImage = require(`../images/${this.state.leagueType}/${fixture.home}.png`);
            return (
            <tr className={"text-center text-uppercase font-weight-bold text-black"} key={fixture.id}>
                <td>
                            <span>
                             <label for="home">{fixture.home}</label>
                            </span>
                </td><td>
                            {/* <Image size="mini" src={homeImage} avatar/> */}
                </td>
                <td>
                    <input type="text" size="1" id={`${fixture.id}-home`} name={`${fixture.id}-home`}
                     onChange={(event)=>this.addChangePrediction(event,fixture)}/>
                    </td><td>
                    
                    <input type="text" size="1" id={`${fixture.id}-away`} name={`${fixture.id}-away`} onChange={(event)=>this.addChangePrediction(event,fixture)}/>  
                </td>

              
                <td>   
                            {/* <Image size="mini" src={awayImage} avatar/> */}
                </td>
                <td>
                            <span>
                             <label for="away">{fixture.away}</label>
                            </span>
                        
                </td>

            </tr>)
        })
        return(
            <Container>
                <DashboardNav/>
                    <Row>
            <div class="col-md-3 col-sm-3 float-left padding-left-2">
                <img src={IPredictLogo} alt="Logo" class="logo-img-small mx-auto d-block" />                
            </div>
                <Col>
                        <a href="/logout" class="float-right padding-right-1 text-capitalize text-red font-weight-bold"> Log Out</a>
    
                </Col>            
            </Row>
    
            <Row>
                <Col>
                   <button type="button" class="btn btn-red btn-lg mx-auto d-block font-weight-bold ">PREDICT</button>
 
                    <h1 className={"text-center text-uppercase text-grey font-weight-bold h1"}> fixtures</h1>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center my-3 mx-2">
              <img  src={PremierLeague} className={"logo-img-small"} alt="Premier League"/>                
            </Row>
         
        <div class="row " >
        <div class="col-sm-6 col-md-6 mx-auto d-block ">

            <h5 class="h5 text-center text-uppercase text-grey font-weight-bold"> matchday {this.state.week}</h5>


            <table class="table table-responsive-md table-sm table-center table-bordered-2 mx-auto ">

             {fixtures}


            </table>
            
        <Button primary onClick={this.handleSubmit}>Predict</Button>
        </div>
        </div>

        <pre>
            {JSON.stringify(this.state.weekPrediction.predictions)}
        </pre>
        </Container>
        )
    }
}

export default Predict;