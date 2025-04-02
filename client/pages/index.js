import React from "react";
import axios from "axios";
const LandingPage = (currentUser) => {
  console.log(currentUser);
  axios.get("/api/users/currentuser").catch((err) => {
    console.log(err.message);
  });

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};
LandingPage.getInitailProps = async () => {
  const res = await axios.get("/api/users/currentuser");

  return res.data;
};

export default LandingPage;
