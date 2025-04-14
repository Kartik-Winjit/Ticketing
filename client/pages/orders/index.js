import React from "react";

const OrderIndex = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "created":
        return "primary";
      case "awaiting:payment":
        return "warning";
      case "complete":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };
  return (
    <ul className="m-auto list-group w-75 p-5">
      {orders.map((order) => (
        <li
          key={order.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span className="fw-bold">{order.ticket.title}</span>
          <span
            className={`badge bg-${getStatusColor(order.status)} rounded-pill`}
          >
            {order.status}
          </span>
        </li>
      ))}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
