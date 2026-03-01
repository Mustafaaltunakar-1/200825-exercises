const dateInput = document.getElementById("date");
const selectedDate = document.getElementById("selected-date");
const confirmButton = document.getElementById("confirm");
const timeSlotButtons = document.getElementsByClassName("slot");
const selectedTime = document.getElementById("selected-time");
const bookingForm = document.querySelector("form.booking");
const confirmedDate = document.getElementById("confirmed-date");
const confirmedTime = document.getElementById("confirmed-time");
const confirmationMessage = document.getElementById("confirmation-message");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const selectedName = document.getElementById("selected-name");
const selectedEmail = document.getElementById("selected-email");
const confirmedName = document.getElementById("confirmed-name");
const confirmedEmail = document.getElementById("confirmed-email");

const data = {
  name: null,
  email: null,
  date: null,
  time: null,
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const yyyy = tomorrow.getFullYear();
const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
const dd = String(tomorrow.getDate()).padStart(2, '0');

dateInput.min = `${yyyy}-${mm}-${dd}`;


nameInput.addEventListener('blur', function () {
  selectedName.textContent = nameInput.value.trim() || '-';
  data.name = nameInput.value.trim();
  allowSubmit();
});

emailInput.addEventListener('blur', function () {
  selectedEmail.textContent = emailInput.value.trim() || '-';
  data.email = emailInput.value.trim();
  allowSubmit();
});

dateInput.addEventListener("change", function () {
  selectedDate.textContent = dateInput.value;
  data.date = dateInput.value;
  allowSubmit();
});

[...timeSlotButtons].forEach((button) =>
  button.addEventListener("click", () => showSelectedTime(button)),
);
// Alternative:
// [...timeSlotButtons].forEach((button) =>
//   button.addEventListener('click', function() { showSelectedTime(button)}),
// );

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!data.name || !data.email || !data.date || !data.time) {
  return;
}
  bookingForm.classList.add('hidden');
  confirmedName.textContent = data.name;
  confirmedEmail.textContent = data.email;
  confirmedDate.textContent = data.date;
  confirmedTime.textContent = data.time;
  confirmationMessage.classList.remove("hidden");
});

function showSelectedTime(button) {
  deselectTimeSlots();
  button.classList.add("selected");
  selectedTime.textContent = button.textContent;
  data.time = button.textContent;
  allowSubmit();
}

function deselectTimeSlots() {
  [...timeSlotButtons].forEach((button) => button.classList.remove("selected"));
}

function allowSubmit() {
  confirmButton.disabled = !(data.name && data.email && data.date && data.time);
}
