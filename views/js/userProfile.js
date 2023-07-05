const reserveBtn = document.getElementById("reserve-btn");
const reservationForm = document.querySelector(".reservation-form");

reserveBtn.addEventListener("click", () => {
  reservationForm.classList.toggle("show-reservation-form");
});


