import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <form
      onSubmit={onSubmit}
      className="container mt-5"
      style={{ maxWidth: "500px" }}
    >
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="mb-4 text-center">Sign Up</h1>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Create a password"
              required
            />
          </div>

          {errors && <div className="alert alert-danger">{errors}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default signup;
