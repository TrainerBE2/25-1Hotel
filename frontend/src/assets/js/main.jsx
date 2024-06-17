import React, { useEffect } from "react";
import jQuery from "jquery"; // Pastikan jQuery diimpor terlebih dahulu
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/font-awesome.min.css";
import "../css/elegant-icons.css";
import "../css/nice-select.css";
import "../css/jquery-ui.min.css"; // Sesuaikan dengan tema jQuery UI yang Anda gunakan
import "../css/owl.carousel.min.css";
import "../css/slicknav.min.css"; // Sesuaikan dengan path file CSS Anda
import "../styles/style.scss";

/* 
Js start
*/
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery-nice-select/js/jquery.nice-select";
import "jquery-ui/dist/jquery-ui";
import "slicknav/dist/jquery.slicknav";
import "owl.carousel/dist/owl.carousel";
/* 
JS END
*/
const MainComponent = () => {
  useEffect(() => {
    // Inisialisasi jQuery ketika komponen dimuat
    $(window).on("load", function () {
      $(".loader").fadeOut();
      $("#preloder").delay(200).fadeOut("slow");
    });

    $(".set-bg").each(function () {
      const bg = $(this).data("setbg");
      $(this).css("background-image", `url(${bg})`);
    });

    $(".canvas__open").on("click", function () {
      $(".offcanvas-menu-wrapper").addClass("active");
      $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on("click", function () {
      $(".offcanvas-menu-wrapper").removeClass("active");
      $(".offcanvas-menu-overlay").removeClass("active");
    });

    $(".menu__class").slicknav({
      appendTo: "#mobile-menu-wrap",
      allowParentLinks: true,
    });

    $(".gallery__slider").owlCarousel({
      loop: true,
      margin: 10,
      items: 4,
      dots: false,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
      responsive: {
        992: { items: 4 },
        768: { items: 3 },
        576: { items: 2 },
        0: { items: 1 },
      },
    });

    $(".room__pic__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      navText: [
        "<i class='arrow_carrot-left'></i>",
        "<i class='arrow_carrot-right'></i>",
      ],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: false,
    });

    $(".room__details__pic__slider").owlCarousel({
      loop: true,
      margin: 10,
      items: 2,
      dots: false,
      nav: true,
      navText: [
        "<i class='arrow_carrot-left'></i>",
        "<i class='arrow_carrot-right'></i>",
      ],
      autoHeight: false,
      autoplay: false,
      mouseDrag: false,
      responsive: {
        576: { items: 2 },
        0: { items: 1 },
      },
    });

    const testimonialSlider = $(".testimonial__slider");
    testimonialSlider
      .owlCarousel({
        loop: true,
        margin: 30,
        items: 1,
        dots: true,
        nav: true,
        navText: [
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>",
        ],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false,
        onInitialized: function (e) {
          const a = this.items().length;
          $("#snh-1").html(`<span>01</span><span>${"0" + a}</span>`);
          const presentage = Math.round(100 / a);
          $(".slider__progress span").css("width", `${presentage}%`);
        },
      })
      .on("changed.owl.carousel", function (e) {
        const b = --e.item.index;
        const a = e.item.count;
        $("#snh-1").html(
          `<span>${"0" + (1 > b ? b + a : b > a ? b - a : b)}</span><span>${
            "0" + a
          }</span>`
        );

        const current = e.page.index + 1;
        const presentage = Math.round((100 / e.page.count) * current);
        $(".slider__progress span").css("width", `${presentage}%`);
      });

    $(".logo__carousel").owlCarousel({
      loop: true,
      margin: 100,
      items: 5,
      dots: false,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: false,
      responsive: {
        992: { items: 5 },
        768: { items: 3 },
        320: { items: 2 },
        0: { items: 1 },
      },
    });

    $("select").niceSelect();

    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = months[mm - 1];
    const formattedToday = `${dd} ${month} ${yyyy}`;
    $(".check__in").val(formattedToday);
    $(".check__out").val(formattedToday);

    $(".datepicker_pop").datepicker({
      dateFormat: "dd M yy",
      minDate: 0,
    });

    // Cleanup function for useEffect
    return () => {
      $(window).off("load");
      $(".canvas__open").off("click");
      $(".offcanvas-menu-overlay").off("click");
      $(".menu__class").slicknav("destroy");
      $(".gallery__slider").trigger("destroy.owl.carousel");
      $(".room__pic__slider").trigger("destroy.owl.carousel");
      $(".room__details__pic__slider").trigger("destroy.owl.carousel");
      testimonialSlider.trigger("destroy.owl.carousel");
      $(".logo__carousel").trigger("destroy.owl.carousel");
      $("select").niceSelect("destroy");
      $(".datepicker_pop").datepicker("destroy");
    };
  }, []); // Efek ini hanya dijalankan sekali saat komponen dimuat

  return (
    <div>
      {/* Content Anda di sini */}
      <div id="root"></div>
      {/* Tambahkan elemen dan komponen lainnya di sini */}
    </div>
  );
};

export default MainComponent;
