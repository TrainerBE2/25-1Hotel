const Contact = () => {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.5524090066037!2d-71.10245469994108!3d42.47980730490846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3748250c43a43%3A0xe1b9879a5e9b6657!2sWinter%20Street%20Public%20Parking%20Lot!5e0!3m2!1sen!2sbd!4v1577299251173!5m2!1sen!2sbd";
  return (
    <div>
      <div className="map">
        <iframe
          src={mapUrl}
          height="600"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-5">
              <div className="contact__widget">
                <div className="contact__widget__item">
                  <h4>Contact Us</h4>
                  <ul>
                    <li>(123) 456-78-910</li>
                    <li>Info.colorlib@gmail.com</li>
                  </ul>
                </div>
                <div className="contact__widget__item">
                  <h4>Address</h4>
                  <p>
                    96 Ernser Vista Suite 437, NY, <br /> United Stated
                  </p>
                </div>
                <div className="contact__widget__time">
                  <h4>Opentime</h4>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="contact__widget__time__item">
                        <ul>
                          <li>Monday - Friday</li>
                          <li>
                            <span>8 am - 9 pm</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="contact__widget__time__item">
                        <ul>
                          <li>Saturday - Sunday</li>
                          <li>
                            <span>8 am - 9 pm</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 offset-lg-1 col-md-6 col-sm-7">
              <div className="contact__form">
                <h2>Your question?</h2>
                <form action="#">
                  <input type="text" placeholder="Your Name" />
                  <input type="text" placeholder="Email" />
                  <textarea placeholder="Your Message"></textarea>
                  <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
