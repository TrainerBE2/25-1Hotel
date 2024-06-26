const About = () => {
  return (
    <div>
      <div
        className="breadcrumb-option set-bg"
        data-setbg="img/breadcrumb-bg.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h1>About Us</h1>
                <div className="breadcrumb__links">
                  <a href="./index.html">Home</a>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="about spad">
        <div className="container">
          <div className="about__content">
            <div className="row">
              <div className="col-lg-5">
                <div className="section-title">
                  <h5>Our Specialization</h5>
                  <h2>Welcome Hiroto</h2>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about__text">
                  <p>
                    Metasurfaces are generally designed by placing scatterers in
                    periodic or pseudo-periodic grids.
                  </p>
                  <p>
                    I am convinced the only way to make money online is to have
                    a consistent Advertising plan. A plan you are willing to
                    work hard on and commit to for a selected period of time.
                    When making this plan, you need to do two things.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img src="/img/services/services-1.png" alt="Free Wi-Fi" />
                <h4>Free Wi-Fi</h4>
                <p>
                  The massive investment in a hotel or resort requires constant
                  reviews and control in order to make it a successful
                  investment.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img src="/img/services/services-2.png" alt="Premium Pool" />
                <h4>Premium Pool</h4>
                <p>
                  Choose from 4 unique ready made concepts, let us help you
                  create the concept perfect for you or let HCA.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img src="/img/services/services-3.png" alt="Coffee Maker" />
                <h4>Coffee Maker</h4>
                <p>
                  HCA's Owner's Representation is taking care of just these
                  important factors, may it be through regular site visits and
                  spot checks.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img src="/img/services/services-4.png" alt="Bar Wine" />
                <h4>Bar Wine</h4>
                <p>
                  For properties with third party management companies, HCA
                  Consultants will as well administer the terms and conditions.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img src="/img/services/services-5.png" alt="TV HD" />
                <h4>TV HD</h4>
                <p>
                  We provide a critical analysis of a hotel's marketing
                  strategy, bench-marking it against industry and competitive
                  practices.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img src="/img/services/services-6.png" alt="Restaurant" />
                <h4>Restaurant</h4>
                <p>
                  A hotel and restaurant investment deserves careful and market
                  oriented financial planning and projections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
