import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import LaLiga from './images/Laliga.jpeg'
import PremierLeague from './images/PremierLeague.jpeg'
import ChampionsLeague from './images/ChampionsLeague.jpeg'
import {Image} from 'semantic-ui-react'

class IPredictFooter extends Component{

     render(){
         return (
            <div className={"row margin-bottom-2"}>
            <div className={"col- mx-auto d-block"}>
              <Row>
                  <Col>
                    <div >
                        <Image size="tiny" src={LaLiga} className={"logo-img1 float-right"}/>          
                    </div>
                  </Col>
                  <Col>
                    <div>
                        <Image size="tiny" src={PremierLeague} className={"logo-img1"}/>
                    </div>
                  </Col>
                  <Col>
                    <div>
                    <Image size="tiny" src={ChampionsLeague} className={"logo-img1 float-left"}/>
                    </div>
                  </Col>
              </Row>
            
            </div>
        </div>
         )
     }
}
export default IPredictFooter;