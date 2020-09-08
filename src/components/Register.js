import React, {Component} from 'react'
import IPredictLogo from './images/ipredict.png'
import IPredictNav from './IpredictNav'
import {Image, Button as SemanticButton} from 'semantic-ui-react'
import {Button, Container, Col, Row, Alert} from 'react-bootstrap'
import IPredictFooter from './IPredictFooter'


class Register extends Component
{
   constructor(props){
       super(props);
       this.state={user:{
           name:"",
           email:"",
           username:"",
           password:"",
       }, loading:false, alert: false, message:""}
       this.handleChange = this.handleChange.bind(this);
       this.handleRegister = this.handleRegister.bind(this);
   }

   handleChange(event){
       let {name,value} = event.target;
       this.setState( prevState => {
           return(
            {
                user: { ...prevState.user, [name]: value},
            } 
           )
       
       })
   }

   handleRegister(){
       this.setState({loading:true})
       fetch("/api/v1/users", {
           method:"post",
           headers:{
               "Accept":"application/json",
               "Content-Type":"application/json"
           },
           body: JSON.stringify(this.state.user)
       }).then(res=>{

        return res.json();
       }).then(data=>{
           if (data.status !== 'error'){
            console.log(data);
            localStorage.setItem("user",JSON.stringify(data));
            
            setTimeout(()=>{
             this.props.history.push("/login")
             this.setState({loading:false})
            },1000)
           }else {
               this.setState({
                   message:data.error,
                   loading: false,
                   alert:true
               })
           }
       }).catch(err=>{
           console.log(err)
       })
   }

   render(){
       return(
           <Container fluid>
           <IPredictNav/>
             <div class="row">
                    <div class="col">
                        <Image src={IPredictLogo} alt="IPredictWorld Logo" className={"logo-img mx-auto d-block"} />                
                    </div>
                </div>
                <div class="row margin-bottom-1">
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
                    <div class="col-sm-12 col-md-4 mx-auto d-block  margin-bottom-5"> 
                    {
                        this.state.alert===true &&
                        <Alert variant="warning">{this.state.message}</Alert>
                    }
                            <input type="text" class="form-control margin-bottom-1" placeholder="Email" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                             <input type="text" class="form-control margin-bottom-1" placeholder="Name" name="name" value={this.state.user.name} onChange={this.handleChange}/>
                            <input type="text" class="form-control margin-bottom-1" placeholder="Username" name="username" value={this.state.user.username} onChange={this.handleChange}/>
                            <input type="password" class="form-control margin-bottom-1" placeholder="Password" name="password" value={this.state.user.password} onChange={this.handleChange}/>
                            <input type="password" class="form-control margin-bottom-1" placeholder="Confirm Password" />
                            {
                                this.state.loading === false && <Button variant="primary" className={"btn btn-block btn-purple"} onClick={this.handleRegister}> SIGN UP </Button>
                            }
                            {
                                this.state.loading!==false && <SemanticButton loading primary className={"btn btn-block btn-purple"}>{""}</SemanticButton>
                            }
                    </div>
                </div>

             <IPredictFooter/>

   </Container>

       )
   }
}

export default Register;