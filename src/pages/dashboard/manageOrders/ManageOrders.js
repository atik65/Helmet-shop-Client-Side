import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import "./manageorder.css";
import Swal from "sweetalert2";

const MyOrder = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://helmetshop.onrender.com/orders`)
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
          .delete(`https://helmetshop.onrender.com/orders/${id}`)
          .then((res) => {
            setLoading(false);
            setLoading(true);
            axios
              .get(`https://helmetshop.onrender.com/orders`)
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

  const approveOrder = (id) => {
    setLoading(true);
    axios
      .put(`https://helmetshop.onrender.com/orders/${id}`, {
        status: "approved",
      })
      .then((res) => {
        setLoading(false);

        setLoading(true);
        axios
          .get(`https://helmetshop.onrender.com/orders`)
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
          <h2 className="text-center"> Manage All Orders </h2>
          {myOrders.length <= 0 && (
            <h5 className="my-5"> You Have No Order </h5>
          )}
          {myOrders.map((order) => {
            const { _id, name, product, price, address, phone, email, status } =
              order;
            return (
              <div key={_id} className="row px-0 mx-0 my-4 py-3 my-order-item">
                <div className="col-md-2"> {product} </div>
                <div className="col-md-1"> ${price} </div>
                <div className="col-md-3"> {email} </div>

                <div className="col-md-1 my-3 my-md-0">
                  {" "}
                  {status === "approved" ? (
                    <span className="text-success"> Shipped </span>
                  ) : (
                    <span className="text-danger"> Pending </span>
                  )}{" "}
                </div>

                <div className="col-md-1 mb-md-0 mb-2">
                  {order?.paid ? (
                    <span className="text-success"> Paid </span>
                  ) : (
                    <span className="text-danger"> Unpaid </span>
                  )}
                </div>

                <div className="col-md-2">
                  <button
                    disabled={status === "approved"}
                    className="approve-button mb-2 mb-md-0"
                    onClick={() => approveOrder(_id)}
                  >
                    {status === "approved" ? (
                      <span> Already Shipped </span>
                    ) : (
                      <span>
                        {" "}
                        Ship Now <i className="far fa-check-square"></i>{" "}
                      </span>
                    )}
                  </button>
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <button onClick={() => deleteOrder(_id)}>
                    Cancel order <i className="far fa-trash-alt "></i>
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
