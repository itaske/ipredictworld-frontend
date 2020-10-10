import React, {useState, useEffect} from 'react'
import IpredictNav from './IpredictNav'
import IPredictLogo from './images/ipredict.png'
import {Image, Button as SemanticButton} from 'semantic-ui-react'
import { Button, Row, Col, Container, Alert} from 'react-bootstrap'

import IPredictFooter from './IPredictFooter'



function Login (props){
  

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [message, setMessage] = useState("")
    let [alert, setAlert] = useState(false);


    function login(){
        setLoading(true);
        let loginDetails ={email:email,password:password};
       fetch("http://ipredictworld-backend.herokuapp.com/api/v1/users/login ",{
           method:"POST",
           headers:new Headers(),
           mode:"cors",
           body:JSON.stringify(loginDetails)
           
       }).then(res=>{
         return res.json();
       }).then(data=>
        {
         if (data.status !== 'error'){
             let user = data
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(()=>{
             props.history.push("/dashboard/home")
            }, 1000)
         }else{
             setAlert(true);
             setMessage(data.error)
             setLoading(false);
         }
       }).catch(err=>{
           setLoading(false);
           console.log(err);
       })
    }

    function handleEmailChange(event){
        let {value} = event.target;
        setEmail(value);

    }
    function handlePasswordChange(event){
        let {value} = event.target;
        setPassword(value);
    }



  return(
      <Container fluid>
          <IpredictNav/>
          <div class="row">
            <div class="col">
                <Image size="small" src={IPredictLogo} alt="IPredictWorld Logo" className={"logo-img mx-auto d-block"} />                
            </div>
        </div>
        <div className={"row margin-bottom-1"}>
            <div class="col- mx-auto d-block text-left">
                <input type="checkbox" class="custom-control-input check-red" id="odds" name="odds" checked="true"/>
                <label class="custom-control-label" for="odds"><span class="font-weight-bold check-label lead">ARE THE ODDS IN YOUR FAVOUR</span></label>

            </div> 
        </div>
        <div class="row margin-bottom-2">
            <div class="col- mx-auto d-block text-left">
                <input type="checkbox" class="custom-control-input check-red" id="predict" name="predict" checked="true"/>
                <label class="custom-control-label" for="predict"><span class="font-weight-bold text-uppercase check-label lead">predict your own <i class="fa fa-check-square fa-1x"></i></span></label>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-4 mx-auto d-block"> 
                    {
                        alert===true &&
                        <Alert variant="warning">{message}</Alert>
                    }
                    <input type="text" class="form-control margin-bottom-1" placeholder="Username"  value={email} onChange={handleEmailChange}/>
                    <input type="password" class="form-control margin-bottom-1" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    {
                        loading === false && 
                        <Button variant="primary" className={"btn btn-block btn-purple margin-bottom-1"} onClick={login}>LOGIN</Button>
                        }
                        {
                            loading!==false && <SemanticButton loading primary className={"btn btn-block btn-purple margin-bottom-1"}/>
                        }
                <div class="margin-bottom-5"> 
                    <a className={"float-right"} href="/reset-password"><span class="text-red font-weight-bold">Forgot Password?</span></a>
                </div>

            </div>
        </div>





      <IPredictFooter/>


     </Container>
  )
}

export default Login;
