import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Image, Button} from 'semantic-ui-react'


import IPredictLogo from  '../images/ipredict.png'
import PremierLeague from '../images/PremierLeague.jpeg'
import ChampionsLeague from '../images/ChampionsLeague.jpeg'
import LaLiga from '../images/Laliga.jpeg'
import style from '../css/custom.css'
import DashboardNav from './DashboardNav'


class EditPredict extends Component{

    constructor(props){
        super(props);
        this.state={week: "1", weekPrediction:{predictions:[]}, scores:{}};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleScoreChanges = this.handleScoreChanges.bind(this)

    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(`/api/v1/weekpredictions/${user.id}/${this.state.week}`,{
            method:"GET",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`

            }
        }).then(res=>{
            if (res.status === 204)
                this.props.history.push("/dashboard/predict/new");
            else if (res.status === 404){

            }else if (res.status === 200)
               return res.json()
            else{
                   throw Error(res.status)
               }
        }).then(data =>{
            console.log(data)
            let scores ={};
            data.predictions.forEach(prediction=>{
               let home = prediction.score.substring(0, prediction.score.indexOf(":"));
               let away = prediction.score.substring(prediction.score.indexOf(":")+1, prediction.score.length);
               let id = prediction.id
               scores[id]={home:home, away:away};
            })
            console.log("Scores")
            console.log(scores);
            console.log("end")
            this.setState({
                weekPrediction:data,
                scores:scores
            })
        }).catch(err=>console.log(err))
    }

    handleScoreChanges(e){
        let {name,value} =  e.target;

       let target = name.substring(name.indexOf("-")+1, name.length);
       let id = name.substring(0, name.indexOf("-"))

       let formerScores = this.state.scores;
       console.log(formerScores);
       formerScores[id][target] = value;
       console.log(formerScores);
       this.setState({
               scores : formerScores
       })

    }

    handleEdit(){
    let weekPrediction = this.state.weekPrediction;
       console.log(weekPrediction);
       weekPrediction['predictions']= weekPrediction.predictions.map(prediction => {
           let score = this.state.scores[prediction.id];
           let fixture = prediction.fixture;
           let convertedScore= `${score.home}:${score.away}`;
           return {id:prediction.id, fixture:fixture, score:convertedScore}
       })

       console.log(weekPrediction)
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(`/api/v1/weekpredictions/edit/${user.id}`,{
            method:"POST",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`
            },
            body: JSON.stringify(weekPrediction)
        }).then(res=>{
           if (res.status === 200){
               this.props.history.push("/dashboard/predict/edit")
           }else{
               throw Error(res.status);
           }
        }).catch(err=>console.log(err))
    }


    render(){

        let fixtures = this.state.weekPrediction.predictions.map(prediction=>{
            console.log(prediction);
            let home = prediction.score.substring(0, prediction.score.indexOf(":"))
            let away = prediction.score.substring(prediction.score.indexOf(':')+1, prediction.score.length)

            // let awayImage =require(`../images/${this.state.leagueType}/${fixture.away}.png`);
            // let homeImage = require(`../images/${this.state.leagueType}/${fixture.home}.png`);
            return (
            <tr className={"text-center text-uppercase font-weight-bold text-black"} key={prediction.id}>
                <td>
                            <span>
                             <label for="home">{prediction.fixture.home}</label>
                            </span>
                </td><td>
                            {/* <Image size="mini" src={homeImage} avatar/> */}
                </td>
                <td>
                    <input type="text" size="1" id={`${prediction.id}-home`} name={`${prediction.id}-home`} value={this.state.scores[prediction.id].home} onChange={this.handleScoreChanges}
                   />
                    </td><td>
                    
                    <input type="text" size="1" id={`${prediction.id}-away`} name={`${prediction.id}-away`} value={this.state.scores[prediction.id].away} onChange={this.handleScoreChanges}/>  
                </td>

              
                <td>   
                            {/* <Image size="mini" src={awayImage} avatar/> */}
                </td>
                <td>
                            <span>
                             <label for="away">{prediction.fixture.away}</label>
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
                   <button type="button" class="btn btn-red btn-lg mx-auto d-block font-weight-bold ">EDIT PREDICT</button>
 
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
            
        <Button primary onClick={this.handleEdit}>Edit Predict</Button>
        </div>
        </div>

        <pre>
            {JSON.stringify(this.state.weekPrediction.predictions)}
        </pre>
        </Container>
        )
    }
}

export default EditPredict;