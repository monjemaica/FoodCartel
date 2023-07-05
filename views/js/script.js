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
const loginBtnn = document.getElementById("login-btn");
const loginDiv = document.getElementById("login");

function toggleLogin() {
  loginDiv.style.display = loginDiv.style.display === "none" ? "block" : "none";
  console.log("click");
}

loginBtnn.addEventListener("click", toggleLogin);

$(document).ready(function () {
  const loginForm_el = $('#login-form');
  const email_el = $(`#email`);
  const password_el = $(`#password`);
  
  loginForm_el.on("submit", (e) => {
    e.preventDefault();
    
    let email = email_el.val();
    let password = password_el.val();


    let data = {
      email,
      password,
    };

    $.ajax({
      url: '/auth/login',
      type: 'POST',
      dataType: 'application/json',
      data: data,
      success: function(res) {
        res = JSON.parse(response);
        console.log(res);
      }
});
  });
});
//login end