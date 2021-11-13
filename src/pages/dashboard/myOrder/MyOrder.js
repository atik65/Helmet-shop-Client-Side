import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import "./myOrder.css";
import Swal from "sweetalert2";

const MyOrder = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://radiant-beach-55778.herokuapp.com/${user.email}/orders`)
      .then((res) => {
        setMyOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const deleteOrder = (id) => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://radiant-beach-55778.herokuapp.com/orders/${id}`)
          .then((res) => {
            setLoading(false);
            setLoading(true);
            axios
              .get(
                `https://radiant-beach-55778.herokuapp.com/${user.email}/orders`
              )
              .then((res) => {
                setMyOrders(res.data);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error.message);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.log(error.message);
            setLoading(false);
          });
        Swal.fire({
          icon: "success",
          title: "You Order Deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center"> My Orders </h2>
          {myOrders.length <= 0 && (
            <h5 className="my-5"> You Have No Order </h5>
          )}
          {myOrders.map((order) => {
            const { _id, name, product, price, address, phone, status } = order;
            return (
              <div key={_id} className="row px-0 mx-0 my-4 py-3 my-order-item">
                <div className="col-md-2"> {product} </div>
                <div className="col-md-2"> ${price} </div>
                <div className="col-md-2"> {name} </div>
                <div className="col-md-2"> {address} </div>

                <div className="col-md-2 my-3 my-md-0">
                  {" "}
                  {status === "approved" ? (
                    <span className="text-success"> Shipped </span>
                  ) : (
                    <span className="text-danger"> Pending </span>
                  )}{" "}
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <button onClick={() => deleteOrder(_id)}>
                    Cancel order <i className="far fa-trash-alt "></i>{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
