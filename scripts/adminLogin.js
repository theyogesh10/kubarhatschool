// static credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin@123";

const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");

loginForm.addEventListener("submit", function(e){
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD){
    sessionStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "adminDashboard.html";
  } else {
    loginMsg.textContent = "Incorrect username or password!";
    loginMsg.style.color = "red";
  }
});