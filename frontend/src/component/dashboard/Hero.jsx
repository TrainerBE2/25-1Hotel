import React, { useState, useEffect } from "react";

const Hero = () => {
  return (
    <>
      <section className="hero spad set-bg" data-setbg="/img/hero.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero__text">
                <h5>WELCOME TO RARA</h5>
                <h2>Experience the greatest for your holidays.</h2>
              </div>
              <form action="#" className="filter__form">
                <div className="filter__form__item">
                  <p>Check In</p>
                  <div className="filter__form__datepicker">
                    <span className="icon_calendar"></span>
                    <input type="text" className="datepicker_pop check__in" />
                    <i className="arrow_carrot-down"></i>
                  </div>
                </div>
                <div className="filter__form__item">
                  <p>Check Out</p>
                  <div className="filter__form__datepicker">
                    <span className="icon_calendar"></span>
                    <input type="text" className="datepicker_pop check__out" />
                    <i className="arrow_carrot-down"></i>
                  </div>
                </div>
                <div className="filter__form__item filter__form__item--select">
                  <p>Room</p>
                  <div className="filter__form__select">
                    <span className="icon_group"></span>
                    <select>
                      <option value="">Pilih Kamar</option>
                      <option value="1">Pilih Kamar 1</option>
                      <option value="2">Pilih Kamar 2</option>
                      <option value="3">Pilih Kamar 3</option>
                    </select>
                  </div>
                </div>
                <button type="submit">BOOK NOW</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="home__about__text">
                <div className="section-title">
                  <h5>ABOUT US</h5>
                  <h2>Welcome Rara Hotel In Street L’Abreuvoir</h2>
                </div>
                <p className="first-para">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </p>
                <p className="last-para">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque.
                </p>
                <img src="/img/home-about/sign.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="home__about__pic">
                <img src="/img/home-about/home-about.png" alt="" />
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
      <section className="home-room spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h5>OUR ROOM</h5>
                <h2>Explore Our Hotel</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div
                className="home__room__item set-bg"
                data-setbg="img/home-room/hr-1.jpg"
              >
                <div className="home__room__title">
                  <h4>Deluxe Room</h4>
                  <h2>
                    <sup>$</sup>55<span>/day</span>
                  </h2>
                </div>
                <a href="#">Booking Now</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div
                className="home__room__item set-bg"
                data-setbg="img/home-room/hr-2.jpg"
              >
                <div className="home__room__title">
                  <h4>Deluxe Room</h4>
                  <h2>
                    <sup>$</sup>85<span>/day</span>
                  </h2>
                </div>
                <a href="#">Booking Now</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div
                className="home__room__item set-bg"
                data-setbg="img/home-room/hr-3.jpg"
              >
                <div className="home__room__title">
                  <h4>Deluxe Room</h4>
                  <h2>
                    <sup>$</sup>94<span>/day</span>
                  </h2>
                </div>
                <a href="#">Booking Now</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div
                className="home__room__item set-bg"
                data-setbg="img/home-room/hr-4.jpg"
              >
                <div className="home__room__title">
                  <h4>Deluxe Room</h4>
                  <h2>
                    <sup>$</sup>71<span>/day</span>
                  </h2>
                </div>
                <a href="#">Booking Now</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="home__explore">
            <div className="row">
              <div className="col-lg-9 col-md-8">
                <h3>Planning your next trip? Save up to 25% on your hotel</h3>
              </div>
              <div className="col-lg-3 col-md-4 text-center">
                <a href="#" className="primary-btn">
                  Explorer More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="testimonial__pic">
                <img src="/img/testimonial-left.jpg" alt="Testimonial Pic" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="testimonial__text">
                <div className="section-title">
                  <h5>Testimonials</h5>
                  <h2>What do customers say about us?</h2>
                </div>
                <div className="testimonial__slider__content">
                  <div className="testimonial__slider owl-carousel">
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                      </p>
                      <div className="testimonial__author">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>Richard Houston</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Testimonial Item 2 */}
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                      </p>
                      <div className="testimonial__author">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>John Smith</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Testimonial Item 3 */}
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                      </p>
                      <div className="testimonial__author">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>Jack Kelly</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Testimonial Item 4 */}
                    <div className="testimonial__item">
                      <h5>Detailed Review:</h5>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                      </p>
                      <div className="testimonial__author">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__title">
                              <h5>Richard Hobson</h5>
                              <span>Director Colorlib</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="testimonial__author__social">
                              <a href="#">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide-num" id="snh-1"></div>
                  <div className="slider__progress">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="chooseus spad set-bg" data-setbg="img/chooseus-bg.jpg">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="chooseus__text">
                <div className="section-title">
                  <h5>WHY CHOOSE US</h5>
                  <h2>
                    Contact us now to get the latest deals and for the next
                    booking
                  </h2>
                </div>
                <a href="#" className="primary-btn">
                  Booking Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="gallery spad">
        <div className="gallery__text">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="section-title">
                  <h5>OUR GALLERY</h5>
                  <h2>Explore The Most Beautiful In The Hotel</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="gallery__title">
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Sunt in culpa
                    qui officia deserunt mollit anim.
                  </p>
                  <a href="#" className="primary-btn">
                    View Gallery <span className="arrow_right"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery__slider owl-carousel">
          <div
            className="gallery__item small__item set-bg"
            data-setbg="img/gallery/gallery-1.jpg"
          ></div>
          <div
            className="gallery__item set-bg"
            data-setbg="img/gallery/gallery-2.jpg"
          ></div>
          <div
            className="gallery__item set-bg"
            data-setbg="img/gallery/gallery-3.jpg"
          ></div>
          <div
            className="gallery__item set-bg"
            data-setbg="img/gallery/gallery-4.jpg"
          ></div>
        </div>
      </section>
      <section className="latest-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h5>NEWS & EVENT</h5>
                <h2>From Our Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 p-0 order-lg-1 col-md-6 order-md-1">
              <div
                className="latest__blog__pic set-bg"
                data-setbg="img/latest-blog/lb-1.jpg"
              ></div>
            </div>
            <div className="col-lg-3 p-0 order-lg-2 col-md-6 order-md-2">
              <div className="latest__blog__text">
                <div className="label">Hotel</div>
                <h5>Ut enim ad minim veniam, quis nostrud</h5>
                <p>
                  <i className="fa fa-clock-o"></i> 19th March, 2019
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
            <div className="col-lg-3 p-0 order-lg-3 col-md-6 order-md-4">
              <div
                className="latest__blog__pic set-bg"
                data-setbg="img/latest-blog/lb-2.jpg"
              ></div>
            </div>
            <div className="col-lg-3 p-0 order-lg-4 col-md-6 order-md-3">
              <div className="latest__blog__text">
                <div className="label">Restaurant</div>
                <h5>Ut enim ad minim veniam, quis nostrud</h5>
                <p>
                  <i className="fa fa-clock-o"></i> 22th March, 2019
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
            <div className="col-lg-3 p-0 order-lg-6 col-md-6 order-md-5">
              <div
                className="latest__blog__pic latest__blog__pic__last__row set-bg"
                data-setbg="img/latest-blog/lb-3.jpg"
              ></div>
            </div>
            <div className="col-lg-3 p-0 order-lg-5 col-md-6 order-md-6">
              <div className="latest__blog__text">
                <div className="label">Travel</div>
                <h5>Ut enim ad minim veniam, quis nostrud</h5>
                <p>
                  <i className="fa fa-clock-o"></i> 25th March, 2019
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
            <div className="col-lg-3 p-0 order-lg-8 col-md-6 order-md-8">
              <div
                className="latest__blog__pic latest__blog__pic__last__row set-bg"
                data-setbg="img/latest-blog/lb-4.jpg"
              ></div>
            </div>
            <div className="col-lg-3 p-0 order-lg-7 col-md-6 order-md-7">
              <div className="latest__blog__text">
                <div className="label">Booking</div>
                <h5>Ut enim ad minim veniam, quis nostrud</h5>
                <p>
                  <i className="fa fa-clock-o"></i> 29th March, 2019
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
