import React from "react";
import Header from "../Header/Header";
import {
    Link
   
 } from 'react-router-dom';


const ForgotPassword = () => {
    return (
        <>
            <Header haderTitle='Forgot Password' height='100px' width='100px' />

            <form action="">

                <section className=" mt-3">
                    <label className="form-label" htmlFor="username">username</label>
                    <div className="usernameHolder p-3 input-group">
                        <input className="form-control" type="text" name="userName" id="username" placeholder="username" required=" " onInvalid ={(e) =>{e.target.setCustomValidity("Username field can't be empty")}} />

                    </div>


                </section>



                <section className="w-100 " style={{ textAlign: "center" }}>
                    <button className="py-2 px-3 signInButton mt-3" type="submit"> <span style={{ color: "white" }}> send </span> </button>

                </section>


            </form>

            <Link className="mt-3" to="/Login" style={{color:"#3EEC5A"}}>Back to Login</Link>

        </>
    )

}

export default ForgotPassword;