import React from "react";
import "./contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Contact = () => {
  return (
    <div className="contact-page bg-success">
      <main className="main py-5">
        <div className="container text-center mb-5">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle text-dark">
            Feel free to reach out to us for any inquiries or support - we're here to help!
          </p>
        </div>

        <div className="container">
          <div className="row gy-4  align-items-stretch">
            {/* Contact Info Box */}
            <div className="col-lg-5 d-flex">
              <div className="contact-info-box shadow-sm p-4  rounded w-100" style={{
background:" rgba(255, 255, 255, 0.51)",
borderRadius:"16px",
boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
backdropFilter: "blur(5px)",
webkitbackdropfilter: "blur(5px)",
border: "1px solid rgba(255, 255, 255, 0.3)"}}>
                <div className="info-item d-flex mb-2">
                  <i className="bi bi-geo-alt fs-4 me-3 text-primary"></i>
                  <div>
                    <h5>Address</h5>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>
                <div className="info-item d-flex mb-2">
                  <i className="bi bi-telephone fs-4 me-3 text-primary"></i>
                  <div>
                    <h5>Call Us</h5>
                    <p>+1 5589 55488 55</p>
                  </div>
                </div>
                <div className="info-item d-flex mb-2">
                  <i className="bi bi-envelope fs-4 me-3 text-primary"></i>
                  <div>
                    <h5>Email Us</h5>
                    <p>info@example.com</p>
                  </div>
                </div>
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119039.15469731732!2d85.69116235!3d20.29605885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909a6e24b2e65%3A0xfed4288a06aa2eb4!2sGITA%20Autonomous%20College%2C%20Bhubaneswar%2C%20Odisha%20752054!5e0!3m2!1sen!2sin!4v1713033600000!5m2!1sen!2sin"
  style={{ border: 0, width: "100%", height: "270px" }}
  allowFullScreen=""
  loading="lazy"
  title="GITA Autonomous College Location"
/>

              </div>
            </div>

            {/* Contact Form Box */}
            <div className="col-lg-7 d-flex">
              <div className="contact-form-box shadow-sm p-4  rounded w-100" style={{
background:" rgba(255, 255, 255, 0.51)",
borderRadius:"16px",
boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
backdropFilter: "blur(5px)",
webkitbackdropfilter: "blur(5px)",
border: "1px solid rgba(255, 255, 255, 0.3)"}}>
                <form className="php-email-form">
                  <div className="row gy-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        name="message"
                        rows="9"
                        className="form-control"
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn btn-teal w-100 bg-primary text-white">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
