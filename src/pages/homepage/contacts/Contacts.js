import React from "react";
import "./contact.css";

const Contacts = () => {
  return (
    <div className="contact">
      <h1 className="text-center py-5">Leave us a Message</h1>
      <div className="container contact-main pb-5">
        <div className="contact-left px-5 py-4">
          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i class="fas fa-phone"></i>
            </div>
            <div className="col-10">
              <h5> Call Us</h5>
              <h6>+0101112458</h6>
            </div>
          </div>

          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i class="far fa-envelope"></i>
            </div>
            <div className="col-10">
              <h5> Sent Us Email.</h5>
              <h6>contact@contact.com</h6>
            </div>
          </div>

          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i class="far fa-map"></i>
            </div>
            <div className="col-10">
              <h5> Meet Us At </h5>
              <h6>
                1379 Shoreline Parkway, Mountain View, CA 94043, United States.
              </h6>
            </div>
          </div>

          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i class="fas fa-globe"></i>
            </div>
            <div className="col-10">
              <h5> Website </h5>
              <h6> demo.website.com </h6>
            </div>
          </div>
        </div>
        <div className="contact-right py-4">
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
