const userIsStudentRadios = document.getElementsByName("user-is-student");
for (let idx = 0; idx < userIsStudentRadios.length; idx++) {
  userIsStudentRadios[idx].addEventListener("change", () => {
    const value = userIsStudentRadios[idx].value;
    const studentInformation = document.getElementById(
      "user-student-information"
    );
    const groupClass = document.getElementsByClassName("group");
    if (value === "1") {
      studentInformation.classList.remove("d-none");
      groupClass[1].classList.remove("mb-5");
      groupClass[2].classList.add("mb-5");
    } else {
      studentInformation.classList.add("d-none");
      groupClass[1].classList.add("mb-5");
      groupClass[2].classList.remove("mb-5");
    }
  });
}

const joinBtn = document.getElementById("join-btn");
joinBtn.onclick = () => {
  const userJoinForm = document.getElementById("join-form");
  userJoinForm.method = "post";
  userJoinForm.action = "/join";
  userJoinForm.submit();
};
