import React from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-3">{ticket.title}</h1>
          <h4 className="card-text text-muted mb-4">Price: ${ticket.price}</h4>

          <button onClick={() => doRequest()} className="btn btn-primary w-100">
            Purchase
          </button>

          {errors && <div className="alert alert-danger mt-3">{errors}</div>}
        </div>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
