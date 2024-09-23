function stringLength (string, maxLength) {
  return string.length <= maxLength;
}

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);
stringLength('проверяемая строка', 10);


function isPalindrome (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  const reversedString = string.split('').reverse().join('');
  if (string === reversedString) {
    return true;
  }
  return false;
}

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');


function getNumber (data) {
  const stringNumber = String(data);
  let result = '';
  for (let i = 0; i < stringNumber.length; i++) {
    const parsedNumber = parseInt(stringNumber[i], 10);
    if (!Number.isNaN(parsedNumber)) {
      result += String(parsedNumber);
    }
  }
  return parseInt(result, 10);
}

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);
