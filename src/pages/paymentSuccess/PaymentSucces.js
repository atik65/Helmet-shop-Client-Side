import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";

const PaymentSucces = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  useEffect(() => {
    axios
      .put(`http://localhost:5000/orders/payment/${id}`)
      .then((res) => {
        history.push("/dashboard/myorders");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5 text-success">Payment Completing...</h1>
    </div>
  );
};

export default PaymentSucces;
