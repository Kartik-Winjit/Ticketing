import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import React from "react";
import Router from "next/router";

const signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  });
  return <div>signing you out...</div>;
};

export default signout;
