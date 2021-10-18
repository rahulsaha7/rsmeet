import React from 'react'
import {
    Link
   
 } from 'react-router-dom';
import Header from '../Header/Header';
import {BsArrowRight} from 'react-icons/bs';

const ProfileSet = () => {
    return (
        <>
            <Header haderTitle= 'Set Profile' height='100px' width='100px' />


            <form className="w-100" action="">

<section className=" mt-3">
<label className="form-label" htmlFor="username">username</label>
   <div className="usernameHolder p-3 d-flex justify-content-center">
      
    <input className="form-control"  type="text" name="userName" id="username" placeholder="Please Choose a username" autoComplete="off" pattern='^(?=.*[a-z](?=.*[A-Z])(?=.*[0-9])(?.{5,}))' onInvalid={(e) =>{e.target.setCustomValidity('The string must contain at least 1 lowercase alphabetical character The string must contain at least 1 uppercase alphabetical character\nThe string must contain at least 1 numeric character')}} autoComplete="off" required=" " />

   </div>

    
    </section>



   
    <section className="w-100 " style={{textAlign:"right"}}>
               <button  className="py-2 px-3 signInButton mt-3" type="submit"> <span style={{color:"white"}}> Sign In  <BsArrowRight color="black" /></span> </button>

            </section>

   
</form>
            
           
        </>
    )
}

export default ProfileSet
