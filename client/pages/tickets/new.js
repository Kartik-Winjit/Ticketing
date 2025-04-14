import { useState } from "react";
import useRequest from "../../hooks/use-request";
import React from "react";
import Router from "next/router";
const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    doRequest();
  };
  return (
    <div className="container p-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-4">Create a Ticket</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter ticket title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onBlur={onBlur}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                placeholder="Enter ticket price"
                min="0"
                step="0.01"
              />
            </div>

            {errors && <div className="alert alert-danger">{errors}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
