import React,{useState} from "react";
import {
    Link
   
 } from 'react-router-dom';
 import Header from '../Header/Header';
import { AiFillEye } from 'react-icons/ai';

const Signup = () =>{
    const [viewPass, setviewPass] = useState('password');
    const [pdisplay, setpdisplay] = useState("none");
    return(
        <>
         <Header haderTitle= 'Signup Here' height='100px' width='100px' />
             <form className="w-100" action="">

<section className=" mt-3">
<label className="form-label" htmlFor="name">Name</label>
   <div className="usernameHolder p-3 d-flex justify-content-center">
       {/* This restriction should in register page but I am cheking here only  */}
    <input className="form-control"  type="text" name="name" id="name" placeholder="Name" autoComplete="off" pattern='^[a-zA-Z\s]*$' onInvalid={(e) =>{e.target.setCustomValidity('Name should not contain any special character or number')}} autoComplete="off" required=" " />

   </div>

    
    </section>





    <section className=" mt-3">
<label className="form-label" htmlFor="email">Email</label>
   <div className="usernameHolder p-3 d-flex justify-content-center">
       {/* This restriction should in register page but I am cheking here only  */}
    <input className="form-control"  type="email" name="email" id="email" placeholder="Email"  pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' onInvalid={(e) =>{e.target.setCustomValidity('Please provide correct mail id')}} autoComplete="off" required=" " />

   </div>

    
    </section>



    <section className=" mt-3">
<label className="form-label" htmlFor="phone">Phone</label>
   <div className="usernameHolder p-3 d-flex justify-content-center">
      
    <input className="form-control"  type="text" name="phone" id="phone" placeholder="Phone"  onInvalid={(e) =>{e.target.setCustomValidity('Phone number is mandatory')}} autoComplete="off" required=" " />

   </div>

    
    </section>



<section className=' mt-3 '>

<label className="form-label" htmlFor="password">password</label>
<div className="passwordHolder p-3 d-flex justify-content-center">

    <input className="form-control" onFocus={()=>{setpdisplay('block')}} onBlur={()=>{setpdisplay('none')}} type={viewPass} name="password" id="password" placeholder="password" autoComplete="off" required=" " pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\*])(?.={8,})" onInvalid = {(e)=>{e.target.setCustomValidity('Please enter correct combination')}} />
    <span  style={{color:"white",alignSelf: "center"}} onClick = {()=>{viewPass === 'password' ? setviewPass('text'):setviewPass('password')}}> <AiFillEye /> </span>

</div>

<div style={{display:pdisplay}}>
        <ul>
            <li style={{color:"white"}}>The string must contain at least 1 lowercase alphabetical character </li>
            <li style={{color:"white"}}>The string must contain at least 1 uppercase alphabetical character</li>
            <li style={{color:"white"}}>The string must containt at least 1 special character</li>
            <li style={{color:"white"}}>The string must contain at least 1 numeric character</li>
            
        </ul>
</div>

</section>

<section className=" mt-3">
<label className="form-label" htmlFor="m-password">Match Password</label>
   <div className="usernameHolder p-3 d-flex justify-content-center">
      
    <input className="form-control"  type="text" name="m-password" id="m-password" placeholder="Match Password" autoComplete="off" pattern='^(?=.*[a-z](?=.*[A-Z])(?=.*[0-9])(?.{5,}))' onInvalid={(e) =>{e.target.setCustomValidity('Please enter correct combination')}} autoComplete="off" required=" " />

   </div>

    
    </section>


   
<section className="w-100 " style={{textAlign:"center"}}>
   <button  className="py-2 px-3 signInButton mt-3" type="submit"> <span style={{color:"white"}}> Sign In </span> </button>

</section>

   
</form>
<p className="text-break mt-3">Already have an account? <Link to="/Login" style={{color:"#3EEC5A"}}>Signin</Link></p>
        </>
    )
}

export default Signup