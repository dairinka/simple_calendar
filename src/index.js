const nameDays = document.querySelectorAll(".day-item");
const calendar = document.querySelector(".grid-date-container");
const userChoice = document.querySelector(".user-choice");

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "November",
  "December",
];
nameDays.forEach((el, ind) => {
  el.textContent = days[ind];
});

let firstDateMonth, firstDayMonth, firstDayMonthTraditional, nameFirstDayMonth;
let userMonth, userYear;

function getCurrentDate(){
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate()
  return [currentYear, currentMonth, currentDay];
}

function getDefaultMonth(){
 const[currentYear, currentMonth] = getCurrentDate();
  return `${currentYear}-${currentMonth + 1}`;
}

let defaultDate = getDefaultMonth();
userChoice.value = defaultDate;
changeData(defaultDate);

function changeData(dataStr) {
  let date = new Date(userChoice.value || dataStr);
  userMonth = date.getMonth();
  userYear = date.getFullYear();
  checkYear();
  getData();
  createCalendar();
}

function checkYear() {
  daysMonth[1] = isLeapYear() ? 29 : 28;
}

function isLeapYear() {
  if (
    (userYear % 4 === 0 && userYear % 100 !== 0) ||
    (userYear % 100 === 0 && userYear % 400 === 0)
  ) {
    return true;
  }
  return false;
}

function getData() {
  firstDateMonth = new Date(userYear, userMonth, 1);
  firstDayMonth = firstDateMonth.getDay();
  //firstDayMonth need correct, because getDay give a day of week start Sunday, Sunday - Zero element
  firstDayMonthTraditional = firstDayMonth == 0 ? 6 : firstDayMonth - 1;
  nameFirstDayMonth = days[firstDayMonthTraditional];
}

function createCalendar() {
  if (calendar.children.length > 0) {
    Array.from(calendar.children).forEach((el) => el.remove());
  }
  let fragment = document.createDocumentFragment();
  let daysMonthIndex = userMonth;
  let amountDaysCurrentMonth = daysMonth[daysMonthIndex];
  let amountDaysPreviousMonth =
    daysMonthIndex !== 0 ? daysMonth[daysMonthIndex - 1] : daysMonth[11];
  //Count how much days of current months on first week:
  //let amountDayFirstWeek = 7 - firstDayMonthTraditional + 1;
  //let restPreviousMonth = 7 - amountDayFirstWeek = 7 - ( 7 - firstDayMonthTraditional + 1) = firstDayMonthTraditional - 1
  let restPreviousMonth = firstDayMonthTraditional - 1;
  let startNextMonth = 42 - amountDaysCurrentMonth - restPreviousMonth;
  const [,,currentDate] = getCurrentDate();
  console.log("currentDate",currentDate)
  for (let i = 0; i < 42; i += 1) {
    let li = document.createElement("li");

    if (i < firstDayMonthTraditional && i <= restPreviousMonth) {
      li.textContent = amountDaysPreviousMonth - restPreviousMonth + i;
      li.classList.add("previous");
    }
    if (
      i >= firstDayMonthTraditional &&
      i < amountDaysCurrentMonth + firstDayMonthTraditional
    ) {
      
      li.textContent = String(i + 1 - firstDayMonthTraditional).padStart(2, 0);
      li.classList.add("current");
      if (currentDate + firstDayMonthTraditional - 1 === i) {
        li.classList.add("current", "current-date");
      }
    }
    if (i >= amountDaysCurrentMonth + firstDayMonthTraditional) {
      li.textContent = String(i + startNextMonth - 42).padStart(2, 0);
      li.classList.add("next");
    }
    fragment.appendChild(li);
  }

  calendar.appendChild(fragment);
}

userChoice.addEventListener("change", changeData);
