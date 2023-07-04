const navbar = document.querySelector('nav')
const navMenu = document.querySelector('nav ul')
const navMenuLink = document.querySelectorAll('nav ul li a')

window.addEventListener('scroll', function () {
  if (this.scrollY > 20) {
    nav.classList.add('active')
  } else {
    if (!navMenu.classList.contains('active')) {
      nav.classList.remove('active')
    }
  }
})

//login
const loginBtnn = document.getElementById("login-btn");
const loginDiv = document.getElementById("login");

function toggleLogin() {
  loginDiv.style.display = loginDiv.style.display === "none" ? "block" : "none";
}

loginBtnn.addEventListener("click", toggleLogin);
//login end





window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.style.backgroundPositionY = -window.pageYOffset / 2 + 'px';
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


