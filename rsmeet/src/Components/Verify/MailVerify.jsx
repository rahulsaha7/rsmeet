import React from "react";
import Header from "../Header/Header";

const MailVerify = () => {
  return (
    <>
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
              example@gmail.com
            </b>
          </span>
        </section>

        <section className="d-flex flex-row flex-wrap mt-5">
          <div
            className="usernameHolder me-3  input-group justify-content-center align-items-center"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="email"
              id="forgot-email"
              required=""
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Must not be empty");
              }}
            />
          </div>

          <div
            className="usernameHolder  me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="email"
              id="forgot-email"
              required=""
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Must not be empty");
              }}
            />
          </div>
          <div
            className="usernameHolder me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="email"
              id="forgot-email"
              required=""
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Must not be empty");
              }}
            />
          </div>

          <div
            className="usernameHolder me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="email"
              id="forgot-email"
              required=""
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Must not be empty");
              }}
            />
          </div>

          <div
            className="usernameHolder me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="email"
              id="forgot-email"
              required=""
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Must not be empty");
              }}
            />
          </div>

          <div
            className="usernameHolder py-2 me-3  input-group"
            style={{ width: "60px", borderRadius: "15px" }}
          >
            <input
              className="form-control text-center"
              type="text"
              name="email"
              id="forgot-email"
              required=""
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Must not be empty");
              }}
            />
          </div>
        </section>

        <div class="text-center mt-5">
          <span class="d-block mobile-text">Don't receive the code?</span>
          <span
            class="font-weight-bold cursor"
            style={{
              color: "rgb(62, 236, 90)",
            }}
          >
            Resend
          </span>
        </div>
      </main>
    </>
  );
};

export default MailVerify;
