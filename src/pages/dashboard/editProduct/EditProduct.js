import "./editProduct.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";

const EditProduct = () => {
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const history = useHistory();

  const [helmet, setHelmet] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://helmetshop.onrender.com/helmets/${id}`)
      .then((res) => {
        const {
          _id,
          name,
          price,
          image,
          type,
          certification,
          rating,
          description,
        } = res.data;

        setValue("name", name);
        setValue("price", price);
        // setValue("image", image);
        setValue("type", type);
        setValue("certification", certification);
        setValue("rating", rating);
        setValue("description", description);

        setHelmet(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const onSubmit = (data) => {
    data.rating = parseFloat(data.rating);
    data.price = parseFloat(data.price);

    if (!data.image) {
      return;
    }

    const formData = new FormData();
    formData.append("certification", data.certification);
    formData.append("description", data.description);
    formData.append("image", data?.image[0]);
    formData.append("price", data.price);
    formData.append("rating", data.rating);
    formData.append("type", data.type);
    formData.append("name", data.name);

    if (data.image[0].size / 1024 > 70) {
      alert("Picture is more than 70 KB ... I need an image under 70KB");
      return;
    }

    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .put(`https://helmetshop.onrender.com/helmets/${id}`, formData)
          .then((res) => {
            setLoading(false);

            Swal.fire({
              icon: "success",
              title: "Product Updated successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            history.push("/dashboard/manageproducts");
          })
          .catch((error) => {
            setLoading(false);
            console.log(error.message);
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
        <div className="buynow place-order container py-3">
          <h2 className="text-center pb-4"> Update Product </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <input
              className="form-control my-2"
              type="text"
              placeholder="Helmet Name"
              {...register("name", { required: true })}
            />

            <input
              className="form-control my-2"
              type="number"
              placeholder="Price"
              {...register("price", {
                required: true,
              })}
            />

            <input
              className="form-control my-2"
              type="file"
              placeholder="Image Url "
              {...register("image", {
                required: true,
              })}
            />
            <input
              className="form-control my-2"
              type="text"
              placeholder="Type of Helmet (As many as Possible)"
              {...register("type", {
                required: true,
              })}
            />

            <input
              className="form-control my-2"
              type="text"
              placeholder="Certification"
              {...register("certification", {
                required: true,
              })}
            />

            <input
              className="form-control my-2"
              type="number"
              placeholder="Rating ( Must be between 1-5 )"
              {...register("rating", {
                required: true,
                max: 5,
                min: 1,
              })}
            />

            <input
              className="form-control my-2"
              style={{ height: "80px" }}
              type="text"
              placeholder="Description"
              {...register("description", {
                required: true,
              })}
            />

            <button className="email-login my-2" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
