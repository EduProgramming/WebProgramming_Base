const passwordInput = document.getElementById("password");
const password2Input = document.getElementById("password2");

passwordInput.addEventListener("change", () => {
  const regex =
    /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/;
  const passwordComment = document.getElementById("password-comment");
  if (!regex.test(passwordInput.value)) {
    passwordComment.classList.remove("hide");
    passwordComment.classList.add("show");
  } else {
    passwordComment.classList.remove("show");
    passwordComment.classList.add("hide");
  }
});

password2Input.addEventListener("change", () => {
  const password2Comment = document.getElementById("password2-comment");
  if (passwordInput.value == password2Input.value) {
    password2Comment.classList.remove("hide");
    password2Comment.classList.remove("show");
    password2Comment.classList.add("password-agree");
  } else {
    password2Comment.classList.remove("hide");
    password2Comment.classList.remove("password-agree");
    password2Comment.classList.add("show");
  }
});
