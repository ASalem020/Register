var uname = document.getElementById("name");
var email = document.getElementById("email");
var confirmPassword = document.getElementById("confirm-password");
var password = document.getElementById("password");
var btn = document.querySelector("button");
var allInputs = document.querySelectorAll("input");

users = JSON.parse(localStorage.getItem("users")) || [];
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
    isValid = false;
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
  if (confirmPassword.value === "") {
    confirmPassword.nextElementSibling.classList.remove("block");
    confirmPassword.nextElementSibling.classList.add("hidden");
    isValid = false;
  } else if (confirmPassword.value === password.value) {
    confirmPassword.nextElementSibling.classList.replace(
      "text-red-700",
      "text-green-700"
    );
    confirmPassword.nextElementSibling.classList.replace("hidden", "block");
    confirmPassword.nextElementSibling.innerHTML = "password is matching";
  } else {
    confirmPassword.nextElementSibling.classList.replace("hidden", "block");
    confirmPassword.nextElementSibling.classList.replace(
      "text-green-700",
      "text-red-700"
    );
    confirmPassword.nextElementSibling.innerHTML = "password is not matching";
    isValid = false;
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
function showDupAlert() {
  Swal.fire({
    title: "Error!",
    text: "This email already exists try another one",
    icon: "error",
    confirmButtonText: "ok !",
  });
}

function login(state) {
  var user = {n:uname.value, e: email.value, p: password.value };
  var users = JSON.parse(localStorage.getItem("users")) || [];
   var found = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].e === user.e) {
      found = true;
    }
  }
  if (state == true && !found) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);

    window.location.href = "../../index.html";
  }else if(state == true && found){
    showDupAlert()
  }
   else {
    showAlert();
  }
}

btn.addEventListener("click", function () {
  login(validateForm());
});
