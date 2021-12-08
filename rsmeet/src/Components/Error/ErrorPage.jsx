import React from "react";
import Header from "../Header/Header";

const ErrorPage = () => {
  return (
    <div className="pt-4">
      <Header haderTitle="404" height="100px" width="100px" />
      <h5 className="mt-3">Oops ! No page found</h5>
    </div>
  );
};

export default ErrorPage;
