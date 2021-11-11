import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row mx-0 px-0">
        <div className="col-md-4 pt-4 pt-md-0">
          <h2>Get In Touch</h2>
          <h4>
            <span>Address:</span>
          </h4>
          <p> Island Tank Rd Beaufort, South Carolina(SC).</p>
          <h4>
            <span>Email:</span>
          </h4>
          <p>example@mail.com</p>
          <p>sample@mail.com</p>
        </div>
        <div className="col-md-4 pt-4 pt-md-0">
          <h2>Our Services</h2>
          <a href="">
            <i class="fas fa-check-double"></i> Delivery Information
          </a>

          <a href="">
            <i class="fas fa-check-double"></i> Contact Us
          </a>
          <a href="">
            <i class="fas fa-check-double"></i> Information
          </a>

          <a href="">
            <i class="fas fa-check-double"></i> Lets Talk
          </a>

          <a href="">
            <i class="fas fa-check-double"></i> Terms And Conditions
          </a>
        </div>
        <div className="col-md-4 pt-4 pt-md-0">
          <h2>Subscribe</h2>

          <p>
            Here You can subscribe us to help for improving our services and
            quality .
          </p>
          <div className="footer-subs">
            <input type="text" placeholder="Your Email Address" />
            <button>
              {" "}
              <i class="fas fa-envelope"></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
