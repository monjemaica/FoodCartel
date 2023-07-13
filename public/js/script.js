const navbar = document.querySelector("nav");
const navMenu = document.querySelector("nav ul");
const navMenuLink = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", function () {
  if (this.scrollY > 20) {
    nav.classList.add("active");
  } else {
    if (!navMenu.classList.contains("active")) {
      nav.classList.remove("active");
    }
  }
});

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.style.backgroundPositionY = -window.pageYOffset / 2 + "px";
});

const nav = document.querySelector(".nav"),
  loginBtn = document.querySelector(".login-btn"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  loginBtn.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

//login
$(document).ready(function () {
  $("#login-btn").click(function () {
    $("#login").toggle();
  });

  
  const loginForm_el = $("#login-form");
  const email_el = $(`#email`);
  const password_el = $(`#password`);
  const status_msg = $(`.status-message`);

  const login_btn = $("#login-btn");

  loginForm_el.on("submit", (e) => {
    e.preventDefault();

    let email = email_el.val();
    let password = password_el.val();

    let data = {
      email,
      password,
    };

    $.ajax({
      type: "POST",
      url: "/auth/login",
      data: data,
      success: function (response, textStatus, xhr) {
        setTimeout(() => {
          status_msg.text(response.msg);
          status_msg.removeClass(`text-danger`).addClass(`text-success`);
          console.log(response);

          if (response.data.role.includes("1302")) {
            // 1302 - user
            window.location = response.redirect;
          }
        }, 1000);
      },
      error: function (xhr, textStatus) {
        status_msg.text(xhr.responseText);
        status_msg.removeClass(`text-success`).addClass(`text-danger`);
      },
    });
  });
});
//login end

// logout
$(document).ready(function () {

  $("#logout_list").click(function () {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location= '/foodCartel';
  });

  $("#logout-btn").click(function () {
    $("#logout").toggle();
  });
  
});
// logout


