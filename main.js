//
const minuteEl = document.querySelector("#minute");
const secondEl = document.querySelector("#second");
const milisecondEl = document.querySelector("#milisecond");

const wrapperEl = document.querySelector(".wrapper");
const startButtonEl = document.querySelector("#button-start");
const stopButtonEl = document.querySelector("#button-stop");
const resetButtonEl = document.querySelector("#button-reset");
const labButtonEl = document.querySelector("#button-lap");

// 기록을 담을 ul Element 생성
const ulEl = document.createElement("ul");
wrapperEl.appendChild(ulEl);
ulEl.classList.add("records");

// 표시되는 변수
let minuteValue = 0;
let secondValue = 0;
let milisecondValue = 0;

let interVal;

// 필요한 함수들
//  starter : 시작하는 함수

const starter = () => {
  if (interVal !== undefined) {
    return;
  } else {
    interVal = setInterval(() => {
      if (milisecondValue < 100) {
        milisecondEl.textContent = convertFormat(++milisecondValue);
      } else {
        milisecondValue = 0;
        if (secondValue < 60) {
          secondEl.textContent = convertFormat(++secondValue);
        } else {
          secondValue = 0;
          if (minuteValue < 60) {
            minuteEl.textContent = convertFormat(++minuteValue);
          } else {
            minuteValue = 0;
          }
        }
      }
    }, 10);
  }
};

//  stopper : 중지하는 함수
const stopper = () => {
  clearInterval(interVal);
  interVal = undefined;
};

//  resetter : 초기화하는 함수
const resetter = () => {
  stopper();

  minuteValue = 0;
  secondValue = 0;
  milisecondValue = 0;

  minuteEl.textContent = convertFormat(minuteValue);
  secondEl.textContent = convertFormat(secondValue);
  milisecondEl.textContent = convertFormat(milisecondValue);

  while (ulEl.hasChildNodes()) {
    ulEl.removeChild(ulEl.firstChild);
  }
};

// recorder : 기록하는 함수
const recorder = () => {
  const liEl = document.createElement("li");
  ulEl.appendChild(liEl);

  minuteEl.textContent = convertFormat(minuteValue);
  secondEl.textContent = convertFormat(secondValue);
  milisecondEl.textContent = convertFormat(milisecondValue);

  liEl.textContent = `${convertFormat(minuteValue)}:${convertFormat(secondValue)}.${convertFormat(milisecondValue)}`;
};

// convertFormat : number 포멧을 형식에 맞춘 string 으로 변환하는 함수
const convertFormat = (number) => {
  return number.toString().padStart(2, 0);
};

// 각각의 버튼을 눌렀을 때, 시작, 중지, 초기화하는 함수를 실행

startButtonEl.addEventListener("click", starter);
stopButtonEl.addEventListener("click", stopper);
resetButtonEl.addEventListener("click", resetter);
labButtonEl.addEventListener("click", recorder);
