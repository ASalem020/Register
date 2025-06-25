var email = document.getElementById("email");
var password = document.getElementById("password");
var btn = document.querySelector("button");
var allInputs = document.querySelectorAll("input");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

for (var i = 0; i < allInputs.length; i++)
  allInputs[i].addEventListener("input", function () {
    validateForm();
  });
function validateForm() {
  isValid = true;
  if (email.value === "") {
    email.nextElementSibling.classList.remove("block");
    email.nextElementSibling.classList.add("hidden");
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    email.nextElementSibling.classList.replace(
      "text-green-700",
      "text-red-700"
    );
    email.nextElementSibling.innerHTML = "please enter valid email";
    email.nextElementSibling.classList.replace("hidden", "block");
    isValid = false;
  } else {
    email.nextElementSibling.classList.replace(
      "text-red-700",
      "text-green-700"
    );
    email.nextElementSibling.innerHTML = "email is valid";
    email.nextElementSibling.classList.replace("hidden", "block");
  }

  if (password.value === "") {
    password.nextElementSibling.classList.remove("block");
    password.nextElementSibling.classList.add("hidden");
  } else if (password.value.length < 4) {
    password.nextElementSibling.classList.replace(
      "text-green-700",
      "text-red-700"
    );
    password.nextElementSibling.innerHTML =
      "password must be atleast 4 characters";
    password.nextElementSibling.classList.replace("hidden", "block");
    isValid = false;
  } else {
    password.nextElementSibling.innerHTML = "password is valid";
    password.nextElementSibling.classList.replace("hidden", "block");
    password.nextElementSibling.classList.replace(
      "text-red-700",
      "text-green-700"
    );
  }

  return isValid;
}
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

function showAlert() {
  Swal.fire({
    title: "Error!",
    text: "valid email and password is required",
    icon: "error",
    confirmButtonText: "ok !",
  });
}
  
function login(state) {
  var user = { e: email.value, p: password.value };
  var users = JSON.parse(localStorage.getItem('users')) || [];
  var found = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].e === user.e && users[i].p === user.p) {
      found = true;
      loggedInUser = users[i];
      
    }
  }

  if (state === true && found) {
   
     localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.location.href = "home.html";
  } else {
    showAlert();
  }
}
btn.addEventListener("click", function () {
    login(validateForm());
  });
