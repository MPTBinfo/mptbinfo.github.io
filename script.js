const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwOkbcksDOHoOIGzJOTsMqTtTm8Yaggjds_UJttqZUdbl23x51Yc6iw3mhcLGt6xM25xA/exec";

function toggleForm(form) {
  document.getElementById("loginBox").style.display = form === "login" ? "block" : "none";
  document.getElementById("registerBox").style.display = form === "register" ? "block" : "none";
}

function LoginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(WEBAPP_URL + "?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password))
    .then(res => res.text())
    .then(output => {
      if (output.trim() === "TRUE") {
        window.location.href = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaHXk-Ilgvc1c10pR487crA7l61jh_fsef7b012cBSDZKq_BN54AhUKaEaI5lfXYpkL1Y4SkpL7txC/pubhtml";
      } else {
        document.getElementById("loginError").textContent = "Incorrect username or password.";
      }
    });
}

function AddRow() {
  const usernamee = document.getElementById("usernamee").value;
  const passwordd = document.getElementById("passwordd").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!/[A-Za-z]/.test(passwordd) || !/\d/.test(passwordd)) {
    alert("Password must contain letters and numbers.");
    return;
  }

  if (!usernamee || !passwordd || !email || !phone) {
    alert("Please fill all fields.");
    return;
  }

  const params = new URLSearchParams({
    action: "register",
    usernamee,
    passwordd,
    email,
    phone
  });

  fetch(WEBAPP_URL + "?" + params.toString())
    .then(res => res.text())
    .then(() => {
      document.getElementById("regSuccess").textContent = "Account created. Please wait for admin approval.";
      toggleForm("login");
    });
}
