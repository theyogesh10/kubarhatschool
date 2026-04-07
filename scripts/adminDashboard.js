// ========================
// CHECK LOGIN
if(sessionStorage.getItem("isAdminLoggedIn") !== "true"){
  window.location.href = "adminLogin.html";
}

// ========================
// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("isAdminLoggedIn");
  window.location.href = "adminLogin.html";
});

// ========================
// OPEN GOOGLE SHEET IN NEW TAB
function openSheet(type){
  if(type === "contact"){
    window.open("https://docs.google.com/spreadsheets/d/1KCC3AheFMj4tgqnKXTD7-BZ94a7sSFOBwawd2eAjT6g/view", "_blank");
  } 
  else if(type === "admission"){
    window.open("https://docs.google.com/spreadsheets/d/1EJWnGi-rGFBwwjWkDgO1-XC8rbFt-4iQnYTKADOJs-0/view", "_blank");
  }
}

// ========================
// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});