import "./manageProducts.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const ManageProducts = () => {
  const { user } = useAuth();
  const [helmets, setHelmets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://helmetshop.onrender.com/helmets`)
      .then((res) => {
        setHelmets(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const deleteHelmet = (id) => {
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
          .delete(`https://helmetshop.onrender.com/helmets/${id}`)
          .then((res) => {
            setLoading(false);
            setLoading(true);
            axios
              .get(`https://helmetshop.onrender.com/helmets`)
              .then((res) => {
                setHelmets(res.data);
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
    <div className="manage-orders product-edit">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center"> Update or Delete Products </h2>
          {helmets.length <= 0 && <h5 className="my-5"> You Have No Order </h5>}
          {helmets.map((order) => {
            const { _id, name, image, price, type, certification } = order;
            return (
              <div key={_id} className="row px-0 mx-0 my-4 py-3 my-order-item">
                <div className="col-md-2 text-center">
                  {" "}
                  <img src={`data:image/png;base64, ${image}`} alt="" />
                </div>
                <div className="col-md-1 d-flex align-items-center">
                  {" "}
                  {name}{" "}
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  {" "}
                  {type}{" "}
                </div>

                <div className="col-md-2 my-3 my-md-0 d-flex align-items-center">
                  {certification}
                </div>

                <div className="col-md-1 d-flex align-items-center">
                  {" "}
                  ${price}{" "}
                </div>
                <div className="col-md-1 my-3 d-flex align-items-center">
                  <NavLink to={`/dashboard/edit/${_id}`}>Edit </NavLink>
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <button onClick={() => deleteHelmet(_id)}>
                    Delete Helmet <i className="far fa-trash-alt "></i>
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

export default ManageProducts;
