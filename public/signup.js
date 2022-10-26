//sign up password display
function dp() {
  let password = document.querySelectorAll(".password");
  let dpcheck = document.querySelector("#display-password");
  password.forEach((p) => {
    if (dpcheck.checked) {
      p.type = "text";
    } else {
      p.type = "password";
    }
  });
}

//確認註冊密碼是否正確
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const remind = document.querySelector(".remind");
const sign = document.querySelector(".sign");
password2.addEventListener("change", () => {
  if (password.value != password2.value) {
    remind.style = "display:block";
    sign.disabled = true;
  } else {
    remind.style = "";
    sign.disabled = false;
  }
});
