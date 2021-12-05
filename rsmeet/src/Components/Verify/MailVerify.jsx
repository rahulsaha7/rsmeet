
import Header from "../Header/Header";

const MailVerify = ({handleVerifyEmail,verifyEmailData,setverifyEmailData}) => {

  

  

  return (
    <div className="p-4">
      <Header haderTitle="Mail Verification" height="100px" width="100px" />

      <main>
        <section>
          <h5 className="m-0 word-break">Email verification</h5>
          <span className="mobile-text word-break">
            Enter the code we just send on your Email <br />
            <b
              class="word-break"
              style={{
                color: "rgb(62, 236, 90)",
              }}
            >
              {verifyEmailData.email}
            </b>
          </span>
        </section>

        <form action="" method="post" onSubmit={(e)=>handleVerifyEmail(e)} >

        <section className="d-flex flex-row flex-wrap mt-5 justify-content-center">
        
          <div
            className="usernameHolder me-3  input-group justify-content-center align-items-center"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="digit1"
              required
              value = {verifyEmailData.digit1}
              maxLength = '1'
              autoComplete="off"
              
              onChange = {(e)=>{setverifyEmailData({...verifyEmailData,digit1:e.target.value})}}
            />
          </div>

          <div
            className="usernameHolder  me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="digit2"
             
              required
              value = {verifyEmailData.digit2}
              maxLength = '1'
              autoComplete="off"
             
              onChange = {(e)=>{setverifyEmailData({...verifyEmailData,digit2:e.target.value})}}
            />
          </div>
          <div
            className="usernameHolder me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="digit3"
              value = {verifyEmailData.digit3}
              id="forgot-email"
              required
              maxLength="1"
              autoComplete="off"
             
             
              onChange = {(e)=>{setverifyEmailData({...verifyEmailData,digit3:e.target.value})}}
            />
          </div>

          <div
            className="usernameHolder me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="digit4"
              id="forgot-email"
              required
              maxLength="1"
              value = {verifyEmailData.digit4}
              autoComplete="off"
             
              
              onChange = {(e)=>{setverifyEmailData({...verifyEmailData,digit4:e.target.value})}}
            />
          </div>

          <div
            className="usernameHolder me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="digit5"
              id="forgot-email"
              required
              maxLength="1"
              value = {verifyEmailData.digit5}
              autoComplete="off"
             
             
              onChange = {(e)=>{setverifyEmailData({...verifyEmailData,digit5:e.target.value})}}
            />
          </div>

          <div
            className="usernameHolder py-2 me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="digit6"
              id="forgot-email"
              required
              maxLength="1"
              value = {verifyEmailData.digit6}
              autoComplete="off"
              
              onChange = {(e)=>{setverifyEmailData({...verifyEmailData,digit6:e.target.value})}}
            />
          </div>

          <section className="w-100 " style={{ textAlign: "center" }}>
          <button
            className="py-2 px-3 signInButton mt-3"
            type="submit"
          >
            <span style={{ color: "white" }}> Verify </span>
          </button>
        </section>


        <span style={{ color: "red",display:verifyEmailData.display }}> {verifyEmailData.message} </span>

          
        </section>

        </form>


       
      </main>
    </div>
  );
};

export default MailVerify;
