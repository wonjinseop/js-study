
// 현재 계산기에 그려질 숫자
let currentResult = 0;

// 계산 이력을 모아 둘 배열
const logEntries = [];

let seq = 0; // 로그 번호


// 입력창에 입력한 숫자를 읽는 함수.
const getUserNumberInut = () => parseInt($userInput.value);

// 계산 기능을 담당하는 함수
const calculate = type => {

  // 계산 전 값을 기억
  const originalResult = currentResult;
  const enterdNumber = getUserNumberInut();

  if(!enterdNumber && enterdNumber !== 0) {
    alert('문제 발생!');
    return;
  }

  let mark;
  if(type === 'add') {
    mark = '+';
    currentResult += enterdNumber;
  } else if(type === 'sub') {
    mark = '-';
    currentResult -= enterdNumber;
  } else if(type === 'multi') {
    mark = 'x';
    currentResult *= enterdNumber;
  } else {
    if(enterdNumber === 0) {
      alert('0으로 나눌수 없습니다.');
      return;
    }
    mark = '/';
    currentResult /= enterdNumber;
  }

  // 연산식과 결과값을 두번째 section에 렌더링
  $currentCalculationOutput.textContent = `${originalResult} ${mark} ${enterdNumber}`;
  $currentResultOutput.textContent = currentResult;

  // 로그 이력 쌓기
  writeToLog(mark, originalResult, enterdNumber, currentResult);

};

// 로그 이력을 만드는 함수
const writeToLog = (operation, prevResult, number, result) => {
  // 하나의 로그 객체 (연산타입, 이전결과, 연산숫자, 연산결과)
  const logObject = {
    operation,
    prevResult,
    number,
    result
  };
  logEntries.push(logObject);

  // 화면에 로그를 li로 렌더링하는 함수 호출
  renderToLog(logObject);
  console.log(logEntries);

};

// 로그 이력을 화면에 렌더링하는 함수
// 매개변수로 객체가 전달된다면 매개변수 위치에서 디스트럭쳐링이 가능합니다.
const renderToLog = ({operation: mark, prevResult, number, result}) => {
  // li태그 생성
  const $newLi = document.createElement('li');
  $newLi.classList.add('log-entries-item');
  $newLi.textContent = `#${++seq}. ${prevResult} ${mark} ${number} = ${result}`;
  
  // ul에 추가
  $logEntries.appendChild($newLi);
};




// 더하기 버튼 이벤트 핸들러
const addHandler = () => calculate('add');
const subHandler = () => calculate('sub');
const multiHandler = () => calculate('multi');
const divideHandler = () => calculate('divide');


// ========== 이벤트 핸들러 바인딩 ========== //
$addBtn.addEventListener('click', addHandler);
$subtractBtn.addEventListener('click', subHandler);
$multiplyBtn.addEventListener('click', multiHandler);
$divideBtn.addEventListener('click', divideHandler);
