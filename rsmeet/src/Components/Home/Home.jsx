import React, { useState, useEffect } from 'react'
import {
    Router,
    Switch,
    Route,
    useHistory,
    Redirect
} from 'react-router-dom';
import GetStarted from '../GetStarted/GetStarted';
import Login from '../Login/Login';
import ForgotPassword from '../Forgot/ForgotPassword';
import Signup from '../Signup/Signup';
import ProfileSet from '../ProfileSet/ProfileSet';
import BlankDp from '../../Assets/image/blankDp.png'
import axios from 'axios';
import './Home.css';

const Home = ({ backImage }) => {


    //Every prop will be sent to child componenets using context api or redux of react but for testing.
    // but  let's do it using props sending 
    const [regData, setregData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        mPassword: "",
        username: "",
        image: null,
        dp: BlankDp
    });

    const [urlChanged, seturlChanged] = useState(false);

    const history = useHistory();
    let historyChanged = false;

    const loginApi = (data) => {

        let loginformData = new FormData();
        loginformData.append("username", data.username);
        loginformData.append("password", data.password);
    }



    const isRegDetails = () => {
        if (regData.email)
            return true;
        return false;
    }




    const HandleRegSubmit = (e) => {
        e.preventDefault();

        //First call axios 

        const formData = new FormData();
        formData.append('name',regData.name);
        formData.append('email',regData.email);
        formData.append('password',regData.password);
        formData.append('phone',regData.phone);

        
       

        axios.post('http://localhost:9000/login/r',formData,{
            headers:{
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {data} = res;

            //After successfull registration data should have to be empty
            data.error || data.exist ? alert('error') : setregData({ name: "",
            email: "",
            password: "",
            phone: "",
            mPassword: "",
            username: "",
            image: null,
            dp: BlankDp});;

          
            history.push('/Profile-Set');
        }).catch((err)=>{
            console.log(err);
        })

        //After successfull registration jwt will contain data with verified email false 
        //If verified email false then redirect to verify email 

        //Else  will be redicred to set profile data

        //for first time registration verified mail will always be false 


        //but verify page will come only when jwt exist else 

        //will not work 

        //After Registration a unique jqt token will be created and if that is set we have to push this history.
        //history.push("/Profile-Set");
    }


    useEffect(() => {




        //This will be used to check whether a user is already logged in or not 


    }, [historyChanged])
    return (
        <Router history={history}>
            <div className="container-fluid background m-0 p-0 overflow-auto" style={{ backgroundImage: `url(${backImage})` }}>
                <div className="d-flex w-100 h-100 justify-content-center align-items-center p-2" >
                    <section className="home-view d-flex flex-column justify-content-center align-items-center">
                        <Switch>
                            {/* Here Routing will be protected and for that we can use protected Routing feature of  React*/}
                            <Route exact path='/' component={GetStarted} ></Route>




                            {/* Example of private Route 
                        
                            <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />

        //Example of public and protected route

                 <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />


        */}


                            <Route exact path='/Login' render={props => (
                                <Login loginApi={loginApi} />
                            )} />
                            <Route exact path='/Sign-up' render={props => (
                                <Signup regData={regData} setregData={setregData} handleRegSubmit={HandleRegSubmit} />
                            )} />
                            <Route exact path='/Forgot-Password' component={ForgotPassword} ></Route>

                            <Route exact path='/Profile-Set' render={props => (
                                isRegDetails() ?
                                    <ProfileSet regData={regData} setregData={setregData} />
                                    : <Redirect to="/Sign-up" />
                            )} />


                            {/* If user is logged in that means jwt will created then redirect to dashboard else get started */}

                        </Switch>

                    </section>
                </div>

            </div>
        </Router>
    )
}

export default Home
