
import React, {Component} from 'react'
import './css/custom.css';
import IpredictNav from './IpredictNav';
import PremierLeague from './images/PremierLeague.jpeg'
import ChampionsLeague from './images/ChampionsLeague.jpeg'
import LaLiga from './images/Laliga.jpeg'
import IPredictLogo from './images/ipredict.png'
import {Button, Image, Icon} from 'semantic-ui-react'

class Home extends Component{

    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div class="container-fluid">
        <IpredictNav/>

        <div class="row">
            <div class="col">
                <Image 
                size="small"
                src={IPredictLogo} alt="Logo" className={"logo-img mx-auto d-block"}/>                
            </div>
        </div>
        <div class="row margin-bottom-1">
            <div class="col- mx-auto d-block text-left">
                <input type="checkbox" class="custom-control-input check-red" id="odds" name="odds" checked="true"/>
                <label class="custom-control-label" for="odds"><span class="font-weight-bold check-label">ARE THE ODDS IN YOUR FAVOUR</span></label>

            </div> 
        </div>
        <div class={"row margin-bottom-2"}>
            <div class="col- mx-auto d-block text-left">
                <input type="checkbox" class="custom-control-input check-red" id="predict" name="predict" checked="true"/>
                <label class="custom-control-label" for="predict"><span class="font-weight-bold text-uppercase check-label">predict your own <i class="fa fa-check-square fa-1x"></i></span></label>
            </div>
        </div>

        <div class="row margin-bottom-2">
            <div class="col-12 ">
            <Image 
            as='a'
            target="_blank"
            size="tiny"
            src={LaLiga} className={"logo-img1 mx-auto d-block"} alt="La Liga"/>
            </div>

            <div class="col-6 ">
                <Image
                size="tiny" 
                src={PremierLeague} className={"logo-img1 float-right"} alt="Premier League"/>
            </div>
            <div class="col-6 ">
                <Image
                 size="tiny"
                 src={ChampionsLeague} className={"logo-img1 float-left"} alt="Champions League"/>
            </div>
        </div>

        <div class="row ">
            <div class="col-sm-12 col-md-4 mx-auto d-block margin-bottom-1">         
                <a href="/login"><Button primary className={"btn-block btn-purple"}>LOGIN</Button></a>               
            </div>            
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-4 mx-auto d-block margin-bottom-1">
                <a href="/register"><Button primary className={"btn-purple btn-block "}>SIGN UP</Button></a>
            </div>
        </div>
        
        <div class="row">   
            <div className={"col- mx-auto text-center"}>
                <a href="/help" class=""><Icon name="help" size="small" className={"fa fa-fw fa-question-circle fa-3x"}></Icon><span className={"fa-1x font-weight-bold text-purple"}>HELP</span></a>
            </div>
            
        </div>
        </div>

        )
    }
}

export default Home;