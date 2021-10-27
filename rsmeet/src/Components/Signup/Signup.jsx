import React, { useState } from "react";
import {
    Link

} from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import { AiFillEye } from 'react-icons/ai';
import './Signup.css';

const Signup = ({ regData, setregData, handleRegSubmit }) => {
    const [viewPass, setviewPass] = useState('password');
    const [pdisplay, setpdisplay] = useState("none");


    const [passMatched, setpassMatched] = useState({
        mPdisplay: "none",
        mPmessage: "Password not matched with the password you have entered",
        button: false
    });

    const [emailExist, setemailExist] = useState({
        ePdisplay: "none",
        ePmessage: "Email is already exist",
        ebutton: false
    })

    const CheckEmail = (e) => {
        let email = new FormData();
        email.append('email', e.target.value);
        axios.post('http://localhost:9000/login/check', email, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            const { data } = res;
            data.exist ? setemailExist({ ePdisplay: "block", ePmessage: "Email is already exist", ebutton: true }) : setemailExist({ ePdisplay: "none", ePmessage: "", ebutton: false });
            // if(data.)
        }).catch((err) => {
            // console.log(err);
        })
    }




    return (
        <>
            <Header haderTitle='Signup Here' height='100px' width='100px' />
            <form className="w-100" action="" method="post" onSubmit={(e) => handleRegSubmit(e)} >

                <section className=" mt-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <div className="usernameHolder p-3 d-flex justify-content-center">

                        <input className="form-control" onInput={(e) => { e.target.setCustomValidity('') }} value={regData.name} onChange={(event) => { setregData({ ...regData, name: event.target.value }) }} type="text" name="name" id="name" placeholder="Name" autoComplete="off" pattern='^[a-zA-Z\s]*$' onInvalid={(e) => { e.target.setCustomValidity('Name should not contain any special character or number') }} autoComplete="off" required=" " />

                    </div>


                </section>





                <section className=" mt-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <div className="usernameHolder p-3 d-flex justify-content-center">

                        <input className="form-control" type="email" name="email" id="email" onBlur={(e) => { CheckEmail(e) }} onInput={(e) => { e.target.setCustomValidity('') }} placeholder="Email" value={regData.email} onChange={(event) => { setregData({ ...regData, email: event.target.value }) }} pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' onInvalid={(e) => { e.target.setCustomValidity('Please provide correct mail id') }} autoComplete="off" required=" " />

                    </div>

                    <div style={{ display: emailExist.ePdisplay }}>
                        <ul className='mt-2'>
                            <li style={{ color: "red" }}>{emailExist.ePmessage}</li>
                        </ul>
                    </div>


                </section>



                <section className=" mt-3">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <div className="usernameHolder p-3 d-flex justify-content-center">

                        <input className="form-control" type="text" name="phone" id="phone" placeholder="Phone" onInput={(e) => { e.target.setCustomValidity('') }} value={regData.phone} onChange={(event) => { setregData({ ...regData, phone: event.target.value }) }} onInvalid={(e) => { e.target.setCustomValidity('Phone number is mandatory') }} autoComplete="off" required=" " />

                    </div>


                </section>



                <section className=' mt-3 '>

                    <label className="form-label" htmlFor="password">password</label>
                    <div className="passwordHolder p-3 d-flex justify-content-center">

                        <input className="form-control" onInput={(e) => { e.target.setCustomValidity('') }} onFocus={() => { setpdisplay('block') }} onBlur={() => { setpdisplay('none') }} type={viewPass} name="password" id="password" placeholder="password" value={regData.password} onChange={(event) => { setregData({ ...regData, password: event.target.value }) }} autoComplete="off" required=" " pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\*])(?.={8,})" onInvalid={(e) => { e.target.setCustomValidity('Please enter correct combination') }} />
                        <span style={{ color: "white", alignSelf: "center" }} onClick={() => { viewPass === 'password' ? setviewPass('text') : setviewPass('password') }}> <AiFillEye /> </span>

                    </div>

                    <div style={{ display: pdisplay }}>
                        <ul>
                            <li style={{ color: "white" }}>The string must contain at least 1 lowercase alphabetical character </li>
                            <li style={{ color: "white" }}>The string must contain at least 1 uppercase alphabetical character</li>
                            <li style={{ color: "white" }}>The string must containt at least 1 special character</li>
                            <li style={{ color: "white" }}>The string must contain at least 1 numeric character</li>

                        </ul>
                    </div>

                </section>

                <section className=" mt-3">
                    <label className="form-label" htmlFor="m-password">Match Password</label>
                    <div className="usernameHolder p-3 d-flex justify-content-center">

                        <input className="form-control" onInput={(e) => { e.target.setCustomValidity('') }} type="text" name="m-password" id="m-password" onBlur={(event) => { regData.password === regData.mPassword ? setpassMatched({ ...regData, mPdisplay: "none" }) : setpassMatched({ mPdisplay: "block", mPmessage: "Password Missmatched", button: true }) }} value={regData.mPassword} onChange={(event) => { setregData({ ...regData, mPassword: event.target.value }) }} placeholder="Match Password" autoComplete="off" pattern='^(?=.*[a-z](?=.*[A-Z])(?=.*[0-9])(?.{5,}))' onInvalid={(e) => { e.target.setCustomValidity('Please enter correct combination') }} autoComplete="off" required=" " />

                    </div>

                    <div style={{ display: passMatched.mPdisplay }}>
                        <ul className='mt-2'>
                            <li style={{ color: "red" }}>{passMatched.mPmessage}</li>
                        </ul>
                    </div>


                </section>



                <section className="w-100 " style={{ textAlign: "center" }}>
                    <button className="py-2 px-3 signInButton mt-3" type="submit" disabled={passMatched.button || emailExist.ebutton}> <span style={{ color: "white" }}> Sign In </span> </button>

                </section>


            </form>
            <p className="text-break mt-3">Already have an account? <Link to="/Login" style={{ color: "#3EEC5A" }}>Signin</Link></p>
        </>
    )
}

export default Signup