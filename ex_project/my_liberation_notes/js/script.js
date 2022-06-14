function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

const currentDay = document.querySelector(".current-day");
currentDay.innerText = getToday();

let calendarBtn = document.getElementById("calendar-btn");
calendarBtn.addEventListener("click", () => {
  const calendar = document.querySelector(".calendar");
  calendar.classList.toggle("hide");
});

const beforeDiaryBtn = document.getElementById("before-diary-btn");
beforeDiaryBtn.addEventListener("click", () => {
  const beforeDiary = document.querySelector(".before-diary");
  beforeDiary.classList.toggle("hide");
});
