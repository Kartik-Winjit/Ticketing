import { useEffect, useState } from "react";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm text-center">
        <div className="card-body">
          <h5 className="mb-3 text-danger fw-semibold">
            {timeLeft} seconds left until order expires
          </h5>

          <div className="mb-3 d-flex justify-content-center">
            <StripeCheckout
              token={({ id }) => doRequest({ token: id })}
              stripeKey="pk_test_51RCI0nPFsydBUc2pYE4sGinkhgx122wLCoPUWJINvtjFnQxaCTLOrj1LYH6Wc1LnZ90qp34tEU4umXOI1ffphv7300vQWmK6Ue"
              amount={order.ticket.price * 100}
              email={currentUser.email}
            />
          </div>

          {errors && <div className="alert alert-danger mt-3">{errors}</div>}
        </div>
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};
export default OrderShow;
