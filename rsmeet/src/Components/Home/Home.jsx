import React,{useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import GetStarted from '../GetStarted/GetStarted';
import Login from '../Login/Login';
import ForgotPassword from '../Forgot/ForgotPassword';
import Signup from '../Signup/Signup';
import ProfileSet from '../ProfileSet/ProfileSet';
import './Home.css';

const Home = ({backImage}) => {
    

    //Every prop will be sent to child componenets using context api or redux of react but for testing.
    // but  let's do it using props sending 

    const loginApi = (data) =>{
        let loginformData = new FormData();
        loginformData.append("username",data.username);
        loginformData.append("password",data.password);
        console.log(loginformData);
    }

    useEffect(() => {
       
        
        //This will be used to check whether a user is already exist or not 
       
       
    }, [])
    return (
    <Router>
          <div className="container-fluid background m-0 p-0 overflow-auto" style={{backgroundImage: `url(${backImage})` }}>
        <div className="d-flex w-100 h-100 justify-content-center align-items-center p-2" >
                <section className="home-view d-flex flex-column justify-content-center align-items-center">
                <Switch>
                   
                    <Route exact path = '/' component={GetStarted} ></Route>

                    <Route exact path = '/Login' render = {props=>(
                        <Login loginApi = {loginApi} />
                    )} />
                    <Route exact path = '/Sign-Up' component={Signup}></Route>
                    <Route exact path = '/Forgot-Password' component={ForgotPassword} ></Route>
                    <Route exact path = '/Profile-Set' component = {ProfileSet} ></Route>
                </Switch>
                        
                </section>
        </div>
                   
            </div>
    </Router>
    )
}

export default Home
