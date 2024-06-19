import React, { useEffect } from "react";
import $ from "jquery";
import "metismenu";
import "slimscroll"; // Adjust the path as per your project structure
import "owl.carousel";

// CSS Imports
import "../../assets/css/font-awesome.min.css";
import "../../assets/css/slicknav.min.css";
import "../../assets/css/typography.css";
import "../../assets/css/default-css.css";
import "../../assets/css/styles.css";
import "../../assets/css/responsive.css";

// JS Imports
// import "../../assets/js/vendor/modernizr-2.8.3.min.js";
import slimscroll from "slimscroll";
import "../../assets/js/jquery.slicknav.min.js";

const Header = () => {
  useEffect(() => {
    /*================================
        sidebar collapsing
    ==================================*/
    if (window.innerWidth <= 1364) {
      $(".page-container").addClass("sbar_collapsed");
    }
    $(".nav-btn").on("click", function () {
      $(".page-container").toggleClass("sbar_collapsed");
    });

    /*================================
        Start Footer resizer
    ==================================*/
    const handleResize = () => {
      let e = (window.innerHeight > 0 ? window.innerHeight : screen.height) - 5;
      e = e < 1 ? 1 : e;
      if (e > 67) $(".main-content").css("min-height", e + "px");
    };

    $(window).ready(handleResize);
    $(window).on("resize", handleResize);

    /*================================
        sidebar menu
    ==================================*/
    $("#menu").metisMenu();

    /*================================
        slimscroll activation
    ==================================*/
    $(".menu-inner").slimscroll({
      height: "auto",
    });
    $(".nofity-list").slimscroll({
      height: "435px",
    });
    $(".timeline-area").slimscroll({
      height: "500px",
    });
    $(".recent-activity").slimscroll({
      height: "calc(100vh - 114px)",
    });
    $(".settings-list").slimscroll({
      height: "calc(100vh - 158px)",
    });

    /*================================
        stickey Header
    ==================================*/
    $(window).on("scroll", function () {
      const scroll = $(window).scrollTop();
      const mainHeader = $("#sticky-header");
      if (scroll > 1) {
        mainHeader.addClass("sticky-menu");
      } else {
        mainHeader.removeClass("sticky-menu");
      }
    });

    /*================================
        form bootstrap validation
    ==================================*/
    $('[data-toggle="popover"]').popover();

    /*------------- Start form Validation -------------*/
    window.addEventListener(
      "load",
      function () {
        const forms = document.getElementsByClassName("needs-validation");
        Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );

    /*================================
        datatable active
    ==================================*/
    if ($("#dataTable").length) {
      $("#dataTable").DataTable({
        responsive: true,
      });
    }
    if ($("#dataTable2").length) {
      $("#dataTable2").DataTable({
        responsive: true,
      });
    }
    if ($("#dataTable3").length) {
      $("#dataTable3").DataTable({
        responsive: true,
      });
    }

    /*================================
        Slicknav mobile menu
    ==================================*/
    $("ul#nav_menu").slicknav({
      prependTo: "#mobile_menu",
    });

    /*================================
        login form
    ==================================*/
    $(".form-gp input").on("focus", function () {
      $(this).parent(".form-gp").addClass("focused");
    });
    $(".form-gp input").on("focusout", function () {
      if ($(this).val().length === 0) {
        $(this).parent(".form-gp").removeClass("focused");
      }
    });

    /*================================
        slider-area background setting
    ==================================*/
    $(".settings-btn, .offset-close").on("click", function () {
      $(".offset-area").toggleClass("show_hide");
      $(".settings-btn").toggleClass("active");
    });

    /*================================
        Owl Carousel
    ==================================*/
    const slider_area = () => {
      $(".testimonial-carousel").owlCarousel({
        margin: 50,
        loop: true,
        autoplay: false,
        nav: false,
        dots: true,
        responsive: {
          0: { items: 1 },
          450: { items: 1 },
          768: { items: 2 },
          1000: { items: 2 },
          1360: { items: 1 },
          1600: { items: 2 },
        },
      });
    };
    slider_area();

    /*================================
        Fullscreen Page
    ==================================*/
    if ($("#full-view").length) {
      const requestFullscreen = (ele) => {
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.msRequestFullscreen) {
          ele.msRequestFullscreen();
        } else {
          console.log("Fullscreen API is not supported.");
        }
      };

      const exitFullscreen = () => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else {
          console.log("Fullscreen API is not supported.");
        }
      };

      const fsDocButton = document.getElementById("full-view");
      const fsExitDocButton = document.getElementById("full-view-exit");

      fsDocButton.addEventListener("click", (e) => {
        e.preventDefault();
        requestFullscreen(document.documentElement);
        $("body").addClass("expanded");
      });

      fsExitDocButton.addEventListener("click", (e) => {
        e.preventDefault();
        exitFullscreen();
        $("body").removeClass("expanded");
      });
    }

    return () => {
      // Cleanup function
      $(window).off("scroll");
      $(".nav-btn").off("click");
      $(window).off("resize", handleResize);
      $(".settings-btn, .offset-close").off("click");
      $(".form-gp input").off("focus");
      $(".form-gp input").off("focusout");
      if (fsDocButton) fsDocButton.removeEventListener("click");
      if (fsExitDocButton) fsExitDocButton.removeEventListener("click");
    };
  }, []);

  return (
    <div>
      {/* Tambahkan konten HTML yang sesuai di sini */}
      <ul id="menu">
        <li>
          <a href="#">Menu 1</a>
          <ul>
            <li>
              <a href="#">Submenu 1</a>
            </li>
            <li>
              <a href="#">Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Menu 2</a>
        </li>
      </ul>
      <div id="full-view">Full View</div>
      <div id="full-view-exit">Exit Full View</div>
    </div>
  );
};

export default Header;
