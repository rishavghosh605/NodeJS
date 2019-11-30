import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

class App extends Component{

  constructor(){
    super();
    this.state ={isAuthenticated:false,user:null,token:''};
  }

  logout = ()=>{
    this.setState({isAuthenticated:false,user:null,token:''});
  }

  twitterResponse = (e)=> {};
  facebookResponse = (e)=>{};
  googleResponse = (e)=>{};

  onFailure = (error)=>{
    alert(error);
  }

  render(){
    let content = !!  this.state.isAuthenticated ?
    (
      <div>
        <p>Authenticated</p>
        <div>
          {this.state.user.email}
        </div>
        </div>
    )
  }

}